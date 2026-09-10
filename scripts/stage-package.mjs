import { execFileSync } from 'node:child_process';
import { readFileSync, appendFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export function npmJson(args) {
  try {
    return JSON.parse(execFileSync('npm', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }));
  } catch (error) {
    throw new Error(`npm ${args.join(' ')} failed: ${error.stderr || error.message}`);
  }
}

export function stagePackage({ name, version }, { run = npmJson, dryRun = false } = {}) {
  // Query the full version list: missing packages and registry errors must fail closed.
  const versions = run(['view', name, 'versions', '--json']);
  if (!Array.isArray(versions) || !versions.every(v => typeof v === 'string')) {
    throw new Error('Registry returned an invalid version list');
  }
  if (versions.includes(version)) return `Skipped ${name}@${version}: exact version already published.`;
  const args = ['stage', 'publish', '--access', 'public', '--json'];
  if (dryRun) args.push('--dry-run');
  const published = run(args);
  const staged = published?.[name];
  if (!staged) throw new Error("Staging returned no metadata for the current package");
  if (staged.name !== name || staged.version !== version || !/^[a-f0-9]{40}$/.test(staged.shasum || '')) {
    throw new Error('Staging returned invalid package metadata or checksum');
  }
  if (dryRun) return `Dry run passed for ${name}@${version}; checksum ${staged.shasum}. No package uploaded.`;
  if (!uuid.test(staged.stageId || '')) throw new Error('Staging returned an invalid stage ID');
  const viewed = run(['stage', 'view', staged.stageId, '--json']);
  if (viewed.id !== staged.stageId || viewed.packageName !== name || viewed.version !== version || viewed.shasum !== staged.shasum) {
    throw new Error('Stage verification failed: ID, name, version, or checksum mismatch');
  }
  return `Verified stage ID: ${viewed.id}\nPackage: ${name}@${version}\nChecksum: ${viewed.shasum}\nAwaiting manual maintainer approval on npmjs.com with 2FA. Keep the GitHub release draft until publication is confirmed.`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const result = stagePackage(JSON.parse(readFileSync('package.json', 'utf8')), { dryRun: process.argv.includes('--dry-run') });
    console.log(result);
    if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${result}\n`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
