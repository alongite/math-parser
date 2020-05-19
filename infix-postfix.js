
const infixMap = {};

function register (tokenType, parser, precedence) {
    infixMap[tokenType] = {
        parse: parser,
        precedence
    };
}

function commonParser (precedence, parser, left, token) {
    let right = parser.parseExpression(precedence);
    return {
        type: 'exp',
        operator: token.value,
        left,
        right
    }
}

register('+', commonParser.bind(null, 1), 1);
register('-', commonParser.bind(null, 1), 1);
register('*', commonParser.bind(null, 2), 2);
register('/', commonParser.bind(null, 2), 2);
register('^', commonParser.bind(null, 3), 3);

// postfix
register('!', function (parser, left, token) {
    return {
        type: 'exp',
        operator: token.value,
        left
    }
}, 4)

module.exports = infixMap;