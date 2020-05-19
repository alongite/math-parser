
const prefixMap = {};

function commonParser (precedence, parser, token) {
    let right = parser.parseExpression(precedence);
    return {
        type: 'exp',
        operator: token.value,
        right
    }
}

function register (tokenType, parser, precedence) {
    prefixMap[tokenType] = {
        parse: parser,
        precedence
    };
}

register('+', commonParser.bind(null, 1), 1);
register('-', commonParser.bind(null, 1), 1);
register('number', function (parser, token) {
    return {
        type: 'number',
        value: Number(token.value)
    }
});
register('(', function (parser, token) {
    let exp = parser.parseExpression();
    parser.skipOperator(')');
    return exp;
});

module.exports = prefixMap;