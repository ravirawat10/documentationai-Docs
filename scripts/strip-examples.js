// Strips inline `example:` fields from OpenAPI YAML files.
// These bloat file size and cause documentation platform build timeouts.
// Usage: node scripts/strip-examples.js <file.yaml>
const fs = require('fs');
const path = require('path');

function getIndent(line) {
  return line.length - line.trimStart().length;
}

function isArrayItem(line) {
  return /^\s*-(\s|$)/.test(line);
}

function isMappingKey(line) {
  return /^\s*[\w'"$]/.test(line) && /:(\s|$)/.test(line) && !isArrayItem(line);
}

function stripExamples(content) {
  const lines = content.split('\n');
  const result = [];
  let skipFromIndent = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trimStart();
    const indent = getIndent(line);

    if (skipFromIndent >= 0) {
      if (trimmed === '') {
        // Blank lines inside a value block - skip
        continue;
      }
      if (indent > skipFromIndent) {
        // Deeper indent = still inside example value
        continue;
      }
      if (indent === skipFromIndent && isArrayItem(line)) {
        // Array items at same indent are continuation of the example value
        continue;
      }
      // Back to same level with a real key, or outer indent
      skipFromIndent = -1;
    }

    // Detect `example:` at any indentation (but not inside a string)
    if (/^\s+example\s*:/.test(line)) {
      const rest = trimmed.slice('example'.length).replace(/^\s*:\s*/, '').trim();
      if (rest === '' || rest === '|' || rest === '>') {
        // Value is on following lines - skip those too
        skipFromIndent = indent;
      }
      // Skip this example line regardless
      continue;
    }

    result.push(line);
  }

  return result.join('\n');
}

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error('Usage: node strip-examples.js <file.yaml> [file.yaml ...]');
  process.exit(1);
}

for (const file of files) {
  const abs = path.resolve(file);
  const original = fs.readFileSync(abs, 'utf8');
  const cleaned = stripExamples(original);
  fs.writeFileSync(abs, cleaned, 'utf8');
  const before = original.split('\n').length;
  const after = cleaned.split('\n').length;
  const savedKB = Math.round((Buffer.byteLength(original) - Buffer.byteLength(cleaned)) / 1024);
  console.log(`${path.basename(file)}: ${before} → ${after} lines (-${before - after} lines, -${savedKB}KB)`);
}
