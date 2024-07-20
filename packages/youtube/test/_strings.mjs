import {valid as validUrls, invalid as invalidUrls} from './_urls.mjs';

export const valid = validUrls.map(u => {
  return [
    // Default
    `<p>${u}</p>`,
    // Wrapped a link
    `<p><a href="${u}">${u}</a></p>`,
    // With whitespace
    `<p>
  ${u}
</p>`,
    // With whitespace and link
    `<p>
  <a href="${u}">
    ${u}
  </a>
</p>`,
    // Two paragraphs minified
`<p>${u}</p><p>${u}</p>`,
  ]
}).flat();

// URL is valid, but the string is not. These should be rejected.
const validUrl_invalidString = validUrls.map(u => {
  return [
    // Prepended text
    `<p>Foo ${u}</p>`,
    `<p>Foo <a href="${u}">${u}</a></p>`,
    `<p>
  Foo ${u}
</p>`,
    `<p>
  Foo <a href="${u}">
    ${u}
  </a>
</p>`,
    // Appended text
    `<p>${u} foo</p>`,
    `<p><a href="${u}">${u}</a> foo</p>`,
    `<p>
  ${u} foo
</p>`,
    `<p>
  <a href="${u}">
    ${u} foo
  </a>
</p>`,
  ]
}).flat();

// String is valid, but the URL is not. These should be rejected.
const invalidUrl_validString = invalidUrls.map(u => {
  return [
    // Default
    `<p>${u}</p>`,
    // Wrapped with a link
    `<p><a href="${u}">${u}</a></p>`,
    // With whitespace
    `<p>
  ${u}
</p>`,
    // With whitespace and link
    `<p>
  <a href="${u}">
    ${u}
  </a>
</p>`,
    // Two paragraphs minified
`<p>${u}</p><p>${u}</p>`,
  ]
}).flat();

// Combine the invalid strings before export
export const invalid = [...validUrl_invalidString, ...invalidUrl_validString];
