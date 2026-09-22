import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { stagePackage, npmJson } from '../scripts/stage-package.mjs';

const pkg = { name: '@bunnix/components', version: '0.12.0' };
const stageId = '12345678-1234-1234-1234-123456789abc';
const staged = { ...pkg, stageId, shasum: 'a'.repeat(40) };
const viewed = { id: stageId, packageName: pkg.name, version: pkg.version, shasum: staged.shasum };
function mock(responses) {
  const calls = [];
  return { calls, run(args) { calls.push(args); let result = responses.shift(); if (args[0] === 'stage' && args[1] === 'publish' && !(result instanceof Error)) result = { [pkg.name]: result }; if (result instanceof Error) throw result; return result; } };
}
test('stages and verifies a version even when registry latest is newer', () => {
  const runner = mock([['0.11.4', '0.13.0'], staged, viewed]);
  assert.match(stagePackage(pkg, runner), new RegExp(stageId));
  assert.deepEqual(runner.calls, [['view', pkg.name, 'versions', '--json'], ['stage', 'publish', '--access', 'public', '--json'], ['stage', 'view', stageId, '--json']]);
});
test('skips an exact published version even when it is not latest', () => {
  const runner = mock([['0.12.0', '0.13.0']]);
  assert.match(stagePackage(pkg, runner), /Skipped/);
  assert.equal(runner.calls.length, 1);
});
for (const [label, responses] of Object.entries({
  registry: [new Error('registry unavailable')],
  malformedRegistry: [{}],
  staging: [[], new Error('staging denied')],
  missingID: [[], { ...staged, stageId: undefined }],
  invalidID: [[], { ...staged, stageId: '$(false)' }],
  invalidChecksum: [[], { ...staged, shasum: '' }],
  wrongPackage: [[], { ...staged, name: 'other' }],
  wrongVersion: [[], { ...staged, version: '0.11.4' }],
  viewFailure: [[], staged, new Error('view denied')],
  ...Object.fromEntries(['id', 'packageName', 'version', 'shasum'].map(key => [`mismatch ${key}`, [[], staged, { ...viewed, [key]: 'wrong' }]])),
})) test(`fails closed: ${label}`, () => assert.throws(() => stagePackage(pkg, mock([...responses]))));
test('dry run cannot call live staging or view', () => {
  const runner = mock([[], staged]);
  assert.match(stagePackage(pkg, { ...runner, dryRun: true }), /No package uploaded/);
  assert.deepEqual(runner.calls[1], ['stage', 'publish', '--access', 'public', '--json', '--dry-run']);
  assert.equal(runner.calls.length, 2);
});
test('npm execution failures report the command', () => {
  assert.throws(() => npmJson(['not-a-real-npm-command']), /npm not-a-real-npm-command failed/);
});
const validation = readFileSync('.github/workflows/validate-pr-description.yml', 'utf8');
for (const prefix of ['PR', 'ISSUE']) {
  const start = validation.indexOf(`      - name: Validate ${prefix === 'PR' ? 'Pull Request' : 'Issue'}`);
  const section = validation.slice(start).split(/\n      - name:/)[0];
  const script = section.split('        run: |\n')[1].split('\n').map(line => line.replace(/^          /, '')).join('\n');
  test(`${prefix} inputs are environment values, never shell interpolation`, () => {
    assert.match(section, new RegExp(`env:\\n          ${prefix}_TITLE:`));
    assert.doesNotMatch(script, /\$\{\{/);
  });
  for (const [label, title, body, status] of [
    ['valid boundary', '12345', '12345678901234567890', 0],
    ['empty title', '', '12345678901234567890', 1],
    ['short title', '1234', '12345678901234567890', 1],
    ['empty body', '12345', '', 1],
    ['short body', '12345', '1234567890123456789', 1],
    ['Markdown and shell characters', 'Release `exit 99` $(exit 98) "quotes"', '# Description\n```sh\n$(exit 97)\n```\n`exit 96` "; exit 95; # \' $HOME \\text', 0],
  ]) test(`${prefix} validation: ${label}`, () => {
    const result = spawnSync('bash', ['-eu', '-c', script], { encoding: 'utf8', env: { ...process.env, [`${prefix}_TITLE`]: title, [`${prefix}_BODY`]: body } });
    assert.equal(result.status, status, result.stderr);
    if (!status) assert.ok(result.stdout.includes(title));
  });
}
test('PR tests have no target-branch restriction; release automation remains draft-only', () => {
  const main = readFileSync('.github/workflows/main.yml', 'utf8');
  assert.doesNotMatch(main.split('  pull_request:')[1].split('jobs:')[0], /branches/);
  const release = readFileSync('.github/workflows/release-on-npm-pack.yml', 'utf8');
  assert.match(release, /--draft/);
  assert.match(release, /workflow_run.head_sha/);
  const publish = readFileSync('.github/workflows/publish.yml', 'utf8');
  assert.match(publish, /npm@11\.15\.0/);
  assert.match(publish, /node-version: 24/);
  assert.doesNotMatch(publish, /run: npm publish|stage approve/);
});
test('release metadata stays consistent', () => {
  const manifest = JSON.parse(readFileSync('package.json'));
  const lock = JSON.parse(readFileSync('package-lock.json'));
  assert.equal(manifest.version, pkg.version);
  assert.equal(lock.version, manifest.version);
  assert.equal(lock.packages[''].version, manifest.version);
  assert.equal(JSON.parse(readFileSync('playgrounds/package-lock.json')).packages['..'].version, manifest.version);
});
