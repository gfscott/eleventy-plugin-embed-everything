import test from "ava";
import pattern from "../lib/pattern.js";
import { validUrls, invalidUrls } from "./_validUrls.mjs";

/**
 * Test pattern matching with valid strings
 */
validUrls.forEach((str) => {
  test(`Pattern matches valid string: ${str}`, (t) => {
    // Test basic URL
    const basicMatch = pattern.exec(`<p>${str}</p>`);
    t.truthy(basicMatch, "Basic URL should match");
    
    // Test with link tags
    const linkedMatch = pattern.exec(`<p><a href="${str}">${str}</a></p>`);
    t.truthy(linkedMatch, "URL with link tags should match");
    
    // Test with whitespace
    const spacedMatch = pattern.exec(`<p>  ${str}  </p>`);
    t.truthy(spacedMatch, "URL with whitespace should match");
  });
});

/**
 * Test pattern rejection of invalid strings
 */
invalidUrls.forEach((str) => {
  test(`Pattern rejects invalid string: ${str}`, (t) => {
    // Test basic invalid URL
    const basicMatch = pattern.exec(`<p>${str}</p>`);
    t.falsy(basicMatch, "Invalid URL should not match");
    
    // Test with whitespace
    const spacedMatch = pattern.exec(`<p>  ${str}  </p>`);
    t.falsy(spacedMatch, "Invalid URL with whitespace should not match");
  });
});
