#!/usr/bin/env node
/**
 * strip-examples.js
 *
 * Removes property-level `example:` fields from large OpenAPI YAML files.
 * Property-level examples are those that appear inside schema `properties:`
 * blocks (i.e. per-field examples). They cause the documentation platform to
 * time out when there are thousands of them in a single file.
 *
 * Operation-level examples (at the media-type / request-body level) are kept.
 *
 * Strategy: line-by-line state machine.
 *  - Track `properties:` blocks by indentation depth.
 *  - Inside a properties block any `example:` line (and its block children if
 *    it is a block mapping/sequence) is dropped.
 *  - Outside properties blocks `example:` lines are preserved.
 */

'use strict';

const fs = require('fs');
const path = require('path');

// Files to process
const targets = [
  'api-reference/Livestreams-Api.yaml',
  'api-reference/Zones-Api.yaml',
  'api-reference/Edge-Rules-API.yaml',
];

function getIndent(line) {
  let i = 0;
  while (i < line.length && line[i] === ' ') i++;
  return i;
}

function stripExamples(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const lines = raw.split('\n');
  const out = [];

  // Stack of indentation levels for active `properties:` blocks.
  // When we enter `properties:`, we push its indent.
  // When we see a line at indent <= props indent, we pop.
  const propsStack = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const indent = getIndent(line);
    const trimmed = line.trim();

    // Empty or whitespace-only lines pass through
    if (trimmed === '') {
      out.push(line);
      i++;
      continue;
    }

    // Pop properties stack when we've moved back out of a properties block
    while (propsStack.length > 0 && indent <= propsStack[propsStack.length - 1]) {
      propsStack.pop();
    }

    // Detect entering a `properties:` block
    if (trimmed === 'properties:') {
      propsStack.push(indent);
      out.push(line);
      i++;
      continue;
    }

    // If we are inside a properties block, check for example: lines
    if (propsStack.length > 0) {
      if (trimmed.startsWith('example:')) {
        // Determine if this is an inline example or a block example
        const afterColon = trimmed.slice('example:'.length).trim();

        if (afterColon !== '') {
          // Inline scalar — drop this single line
          i++;
          continue;
        }

        // Possibly a block example (null or mapping/sequence follows).
        // Look ahead: if the next non-empty line is MORE indented, it is a
        // block child — drop the example: line and all deeper lines.
        let j = i + 1;
        while (j < lines.length && lines[j].trim() === '') j++;

        if (j < lines.length && getIndent(lines[j]) > indent) {
          // Block example with children — skip example: line and children
          i++;
          while (i < lines.length) {
            const childTrimmed = lines[i].trim();
            if (childTrimmed === '') { i++; continue; }
            if (getIndent(lines[i]) > indent) { i++; }
            else break;
          }
          continue;
        }

        // Empty example: (null value, no children) — drop the single line
        i++;
        continue;
      }
    }

    out.push(line);
    i++;
  }

  fs.writeFileSync(filePath, out.join('\n'), 'utf8');

  const removed = lines.length - out.length;
  console.log(
    `${path.basename(filePath)}: ${lines.length} → ${out.length} lines` +
    ` (-${removed} lines, ${(removed / lines.length * 100).toFixed(1)}%)`
  );
}

const root = path.resolve(__dirname, '..');
for (const target of targets) {
  const full = path.join(root, target);
  if (!fs.existsSync(full)) {
    console.warn(`SKIP (not found): ${target}`);
    continue;
  }
  stripExamples(full);
}

console.log('\nDone. Verify with: grep -c "example:" api-reference/*.yaml');
