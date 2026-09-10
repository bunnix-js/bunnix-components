# Releasing @bunnix/components

Pushes and merges into main install dependencies and run tests on Node.js 24 with npm 11.15.0. The workflow retains setup-node registry authentication through the existing NPM_TOKEN secret. That token must have package write access; no approval credentials or 2FA codes belong in GitHub Actions. The package must already exist on npm.

The workflow queries all published versions and skips only an exact match. Registry failures, staging failures, malformed metadata, and verification mismatches fail the job. It runs `npm stage publish --access public --json`, then `npm stage view <stage-id> --json`, comparing the ID, package name, version, and SHA-1 tarball checksum returned by npm. The verified stage ID appears in the workflow summary. Failed verification may leave a staged item for manual inspection; inspect existing stages before rerunning.

A package maintainer reviews that exact stage in the Staged Packages tab on npmjs.com, checks the package and checksum against the workflow summary, and approves with 2FA only after explicit release authorization. Approval makes the package public. There is no automatic approval or direct publication in CI.

The linked GitHub release is created as a draft at the staging workflow commit. Confirm publication with `npm view @bunnix/components@<version> version dist.shasum --json`, compare the checksum with the verified stage, and obtain explicit authorization before publishing the GitHub draft. A successful staging run is not proof of publication.

For local validation, use Node.js 24 and npm 11.15.0, run `npm ci`, `npm test`, `actionlint`, and `node scripts/stage-package.mjs --dry-run`. The dry run exercises npm staging packaging without an upload; it cannot prove live token permissions or registry stage verification. Regression tests exercise verification with controlled responses.

Reference: https://docs.npmjs.com/staged-publishing/
