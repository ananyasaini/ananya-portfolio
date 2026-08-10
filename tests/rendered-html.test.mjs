import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders Ananya's finished portfolio and unified work library", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Ananya Saini — Visual Communication &amp; UI\/UX Designer<\/title>/i);
  assert.match(html, /Work that moves/);
  assert.match(html, /screens &amp; stories/);
  assert.match(html, /Zest Club/);
  assert.match(html, /Design × Engineering/);
  assert.match(html, /Common Ground/);
  assert.match(html, /Bounceless/);
  assert.doesNotMatch(html, /Five fictional worlds|Twenty-two ways in/i);
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
});
