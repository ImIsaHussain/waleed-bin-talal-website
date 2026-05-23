#!/usr/bin/env node

/**
 * Translation parity validation script.
 *
 * Compares en.json and ar.json to ensure both files have the same set of
 * nested key paths. Reports mismatches and exits with code 1 if any are found.
 *
 * Usage: node scripts/validate-translations.mjs
 */

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const messagesDir = resolve(__dirname, '..', 'src', 'messages');

function collectKeys(obj, prefix = '') {
  const keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      keys.push(...collectKeys(value, path));
    } else {
      keys.push(path);
    }
  }
  return keys;
}

function loadJson(filename) {
  const filepath = resolve(messagesDir, filename);
  return JSON.parse(readFileSync(filepath, 'utf-8'));
}

const en = loadJson('en.json');
const ar = loadJson('ar.json');

const enKeys = new Set(collectKeys(en));
const arKeys = new Set(collectKeys(ar));

const missingInAr = [...enKeys].filter((k) => !arKeys.has(k)).sort();
const missingInEn = [...arKeys].filter((k) => !enKeys.has(k)).sort();

let hasErrors = false;

if (missingInAr.length > 0) {
  hasErrors = true;
  console.error(`\nKeys present in en.json but missing from ar.json (${missingInAr.length}):`);
  for (const key of missingInAr) {
    console.error(`  - ${key}`);
  }
}

if (missingInEn.length > 0) {
  hasErrors = true;
  console.error(`\nKeys present in ar.json but missing from en.json (${missingInEn.length}):`);
  for (const key of missingInEn) {
    console.error(`  - ${key}`);
  }
}

if (hasErrors) {
  console.error(`\nTranslation parity check failed.`);
  process.exit(1);
} else {
  console.log(`Translation parity check passed. ${enKeys.size} keys match across en.json and ar.json.`);
}
