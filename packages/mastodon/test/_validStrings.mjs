import validUrls from './_validUrls.mjs';

export default validUrls.flatMap(url => [
  // One line
  `<p>${url}</p>`,
  
  // Whitespace
  `<p>
      ${url}
  </p>`,
  
  // One line, links
  `<p><a href="${url}">${url}</a></p>`,
  
  // Whitespace, links
  `<p>
      <a href="${url}">
        ${url}
      </a>
  </p>`
]);