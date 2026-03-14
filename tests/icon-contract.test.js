import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";

const mediaSource = readFileSync(
  new URL("../src/core/media.mjs", import.meta.url),
  "utf8",
);

const mediaCssSource = readFileSync(
  new URL("../src/core/media.css", import.meta.url),
  "utf8",
);

const iconPageSource = readFileSync(
  new URL("../playgrounds/src/pages/icon-registry.mjs", import.meta.url),
  "utf8",
);

const iconDataSource = readFileSync(
  new URL("../playgrounds/src/data/framework7-icons.mjs", import.meta.url),
  "utf8",
);

const packageSource = readFileSync(
  new URL("../package.json", import.meta.url),
  "utf8",
);

test("Icon uses Framework7 ligatures instead of the generated registry", () => {
  assert.doesNotMatch(mediaSource, /iconRegistry/);
  assert.match(mediaSource, /const \{ span, img, i \} = Bunnix;/);
  assert.match(mediaSource, /class: `icon f7-icons \$\{restProps\.class \|\| ""\}`\.trim\(\)/);
  assert.match(mediaSource, /if \(!style\.fontSize && \(style\.width \|\| style\.height\)\) \{/);
  assert.match(mediaSource, /\}, name\);/);
});

test("Media CSS defines the Framework7 font-face and icon class", () => {
  assert.match(mediaCssSource, /@font-face \{/);
  assert.match(mediaCssSource, /font-family: "Framework7 Icons";/);
  assert.match(mediaCssSource, /Framework7Icons-Regular\.woff2/);
  assert.match(mediaCssSource, /\.f7-icons \{/);
  assert.match(mediaCssSource, /font-size: 28px;/);
  assert.match(mediaCssSource, /line-height: 1;/);
});

test("Icon playground page uses the checked-in official Framework7 package snapshot", () => {
  assert.doesNotMatch(iconPageSource, /iconRegistry/);
  assert.match(iconPageSource, /Heading\(\{ h2: true \}, "Framework7 Icons"\)/);
  assert.match(iconPageSource, /framework7IconNames/);
  assert.match(iconPageSource, /navigator\.clipboard\.writeText/);
  assert.match(iconPageSource, /TextInput\(\{/);
  assert.match(iconPageSource, /type: "search"/);
  assert.match(iconPageSource, /toLowerCase\(\)\.includes\(normalizedQuery\)/);
  assert.doesNotMatch(iconPageSource, /fetch\(/);
  assert.match(iconPageSource, /window\.open\(OFFICIAL_ICONS_URL/);
  assert.match(iconPageSource, /window\.open\(OFFICIAL_RELEASE_URL/);
});

test("Checked-in Framework7 icon snapshot contains official package metadata and a full icon list", () => {
  assert.match(iconDataSource, /export const framework7IconsMirrorUrl = "https:\/\/defuddle\.md\/framework7\.io\/icons\/";/);
  assert.match(iconDataSource, /export const framework7IconsSourceCount = 1253;/);
  assert.match(iconDataSource, /export const framework7IconNames = \[/);
  assert.match(iconDataSource, /"airplane"/);
  assert.match(iconDataSource, /"arrow_2_circlepath"/);
  assert.match(iconDataSource, /"logo_github"/);
  assert.match(iconDataSource, /"wand_stars"/);
  assert.match(iconDataSource, /"xmark"/);
});

test("Package metadata no longer references icon generation scripts or icon exports", () => {
  assert.doesNotMatch(packageSource, /sanitize:icons/);
  assert.doesNotMatch(packageSource, /generateIconRegistry/);
  assert.doesNotMatch(packageSource, /\.\/icons\/\*/);
});

test("Checked-in Framework7 font asset is the full official font payload", () => {
  const fontStat = statSync(
    new URL("../src/font-face/Framework7Icons-Regular.woff2", import.meta.url),
  );
  assert.ok(fontStat.size > 100000);
});
