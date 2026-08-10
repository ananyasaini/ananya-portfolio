import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("keeps Ananya's finished portfolio and unified work library in the production route", async () => {
  const [page, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /Ananya Saini — Visual Communication & UI\/UX Designer/i);
  assert.match(page, /Work that moves/);
  assert.match(page, /screens &amp; stories/);
  assert.match(page, /Zest Club/);
  assert.match(page, /Design × Engineering/);
  assert.match(page, /Common Ground/);
  assert.match(page, /Bounceless/);
  assert.doesNotMatch(page, /Five fictional worlds|Twenty-two ways in/i);
});

test("keeps the approved campaign assets inside the single project viewer", async () => {
  const [page, css, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /images\/work\/cg-flyer\.png/);
  assert.match(page, /images\/work\/zest-standee\.png/);
  assert.match(page, /images\/work\/sheet-zest\.png/);
  assert.match(page, /images\/work\/phase-01-cover\.png/);
  assert.match(page, /images\/work\/citrus-social\.png/);
  assert.match(page, /images\/work\/sheet-phase\.png/);
  assert.match(page, /function WorkLibrary/);
  assert.doesNotMatch(page, /import VisualArchive|<VisualArchive/);
  assert.match(css, /\.work-gallery__media/);
  assert.doesNotMatch(css, /@import "\.\/visual-archive\.css"/);
  assert.match(layout, /Ananya Saini/);

  await Promise.all([
    "cg-flyer.png",
    "zest-standee.png",
    "sheet-zest.png",
    "phase-01-cover.png",
    "citrus-social.png",
    "sheet-phase.png",
  ].map((asset) => access(new URL(`../public/images/work/${asset}`, import.meta.url))));
});
