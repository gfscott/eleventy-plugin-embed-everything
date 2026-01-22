import validUrls from './_valid.mjs';

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
