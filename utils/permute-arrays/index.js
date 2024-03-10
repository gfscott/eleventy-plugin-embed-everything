/**
 * Permutes the given term by prepending each prefix and appending each suffix.
 *
 * @param {string} term - The term to permute.
 * @param {string[]} prefixes - The prefixes to prepend to the term.
 * @param {string[]} suffixes - The suffixes to append to the term.
 * @returns {string[]} - The permuted array of terms.
 */
export default function(term, prefixes = [], suffixes = []) {
  const termWithPrefixes = prependEach(term, prefixes);
  const termWithSuffixes = appendEach(term, suffixes);
  const termWithPrefixesAndSuffixes = appendEach(termWithPrefixes, suffixes);
  return [...termWithPrefixes, ...termWithSuffixes, ...termWithPrefixesAndSuffixes];
}

/**
 * Prepends each element of the term array with each prefix in the prefixes array.
 * @param {string | string[]} term - The term array.
 * @param {string[]} prefixes - The prefixes array.
 * @returns {string[]} - The resulting array with each element prepended with each prefix.
 */
export const prependEach = (term, prefixes) => {  
  let arr = coerceToArray(term);
  return arr.map(t => prefixes.map(p => p + t)).flat();
}

/**
 * Appends each suffix to every term in the array.
 *
 * @param {string | string[]} term - The term to append suffixes to.
 * @param {string[]} suffixes - The array of suffixes to append.
 * @returns {string[]} - The array of terms with suffixes appended.
 */
export const appendEach = (term, suffixes) => {
  let arr = coerceToArray(term);
  return arr.map(t => suffixes.map(s => t + s)).flat();
}


/**
 * Coerces the given value to an array.
 *
 * @param {any} mysteryObject - The value to be coerced to an array.
 * @returns {string[]} - The coerced array.
 */
export const coerceToArray = (mysteryObject) => {
  if ( Array.isArray(mysteryObject) ) {
    return mysteryObject;
  }
  if ( typeof mysteryObject === 'string' ) {
    return [].concat(mysteryObject);
  }
  return undefined;
}