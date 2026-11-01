const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const sitePath = path.join(__dirname, '..', 'site', 'index.html');
const html = fs.readFileSync(sitePath, 'utf8');

test('release candidate contains the expected customer portal', () => {
  assert.match(html, /Northstar Customer Portal/);
});

test('release candidate includes the release-gate marker', () => {
  assert.match(html, /data-release-gate="true"/);
});

test('environment label is replaced by the deployment job', () => {
  assert.match(html, /__ENVIRONMENT__/);
});
