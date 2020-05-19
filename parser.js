
const prefixMap = require('./prefix');
const infixMap = require('./infix-postfix');

class Parser {
    constructor (lexer) {
        this.lexer = lexer;
    }

    parseExpression (precedence = 0) {
        let token = this.lexer.next();
        let prefix = prefixMap[token.type];
        if (!prefix) throw new Error(`Can't identify "${token.value}"`);
        let left = prefix.parse(this, token);
        let nextToken = this.lexer.peek();
        if (nextToken && precedence < this.getPrecedence()) {
            this.lexer.next();
            let infix = infixMap[nextToken.type];
            return infix.parse(this, left, nextToken);
        }
        return left;
    }

    getPrecedence () {
        let token = this.lexer.peek();
        let infix = infixMap[token.type];
        if (infix) return infix.precedence;

        return 0;
    }

    skipOperator (char) {
        let token = this.lexer.peek();
        if (token && token.type !== 'number' && token.value === char) {
            this.lexer.next();
        } else {
            throw new Error(`Expecting operator ${char}`);
        }
    }
}

module.exports = Parser;