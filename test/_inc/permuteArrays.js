/**
 * 
 * @param {String OR Array} term 
 * @param {Array} prefixes 
 * @param {Array} suffixes
 * @returns An array containing all possible permutations 
 *          of the term for all prefixes and suffixes
 */
 module.exports = function(term, prefixes, suffixes) {
  let out = [].concat(prependEach(term, prefixes));
  out = out.concat(appendEach(out, suffixes));
  return out;
}

/**
 * 
 * @param {Array | String} term 
 * @param {Array} prefixes 
 * @returns An array of each term, prepended with each prefix
 */
const prependEach = (term, prefixes) => {  
  let arr = coerceToArray(term);
  let out = [];
  for (let prefix of prefixes){
    for (let item of arr){
      out.push(prefix + item)
    }
  }
  return out;
}

/**
 * 
 * @param {Array | String} term 
 * @param {Array} suffixes 
 * @returns An array of each term, appended with each prefix
 */
const appendEach = (term, suffixes) => {
  let arr = coerceToArray(term);
  let out = [];
  for (let suffix of suffixes) {
    for (let item of arr){
      out.push(item + suffix)
    }
  }
  return out;
}

/**
 * Coerce a string to a one-item array.
 * @param {*} mysteryObject 
 * @returns Array containing one or more items
 * 
 * Given an object, check its type. If it's an array, return it.
 * If if it’s a string, return an array with that string as its
 * only item.
 */
const coerceToArray = (mysteryObject) => {
  if ( Array.isArray(mysteryObject) ) {
    return mysteryObject;
  }
  if ( typeof mysteryObject === 'string' ) {
    return [].concat(mysteryObject);
  }
}