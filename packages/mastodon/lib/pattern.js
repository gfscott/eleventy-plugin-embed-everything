const {regex} = require('regex');

module.exports = function(server) {
  return regex`
    <p>
    \s*+
    (<a [^>]*?>)??
    \s*+
    (https?:)??
    (//)??
    (w{3}\.)??
    (?<toot>
      ${server}/
      [^\s<>]+?
    )
    \s*+
    (<\/a>)??
    \s*+
    </p>
  `;
}