/*
Language: SiriDB
Author: Jeroen van der Heijden <jeroen@transceptor.technology>
Category: common, scripting
Website: https://siridb.net
*/

export default function(hljs) {
    var STRINGS = {
        className: 'string',
        variants: [{
            begin: '"', end: '"',
            illegal: '\\n',
        }, {
            begin: '\'', end: '\'',
            illegal: '\\n',
        }]
    };

    var NUMBERS = {
      className: 'number',
      variants: [
        { begin: /[-+]?0b[01]+/ },
        { begin: /[-+]?0o[0-8]+/ },
        { begin: /([-+]?0x[0-9a-fA-F]+)/ },
        { begin: /[-+]?[0-9]+/ },
        { begin: /[-+]?((inf|nan)([^0-9A-Za-z_]|$)|[0-9]*\.[0-9]+(e[+-][0-9]+)?)/ },
      ],
      relevance: 0
    };

    var COMMENTS = {
        className: 'doc',
        variants: [
            hljs.HASH_COMMENT_MODE,
        ]
    };

    var REGEXP = {
        className: 'regexp',
        begin: new RegExp('(^\/[^\/\\\\\\n]+(?:\\\\.[^\/\\\\]*)*\/i?)'),
        relevance: 0,
    }

    return {
        contains: [
            COMMENTS,
            STRINGS,
            NUMBERS,
            REGEXP,
            {
                className: 'symbol',
                begin: /#[0-9]+/
            },
            {
                className: 'literal',
                beginKeywords: 'true false'
            },
            {
                className: 'function',
                begin: new RegExp(
                    '\\b(' +
                    /* AGGREGATE FUNCTIONS */
                    'limit|count|sum|max|min|mean|median|median_high|' +
                    'median_low|variance|pvariance|stddev|difference|' +
                    'derivative|filter|first|last' +
                    /* end */
                    ')\\s*(?=\\()'
                )
            },
            {
                className: 'attr',
                begin: /\.[A-Za-z_][0-9A-Za-z_]*/
            },
            {
                className: 'variable',
                begin: /[A-Za-z_][0-9A-Za-z_]*/
            },
        ],
    };
  }