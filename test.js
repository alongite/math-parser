
const Lexer = require('./lexer');
const Parser = require('./parser');

let code = '1+2*(3-4)';

let parser = new Parser(new Lexer(code));
let ast = parser.parseExpression();

console.log(JSON.stringify(ast));

let code2 = '-1!+2*(3-4)';

function p (code) {
    let parser = new Parser(new Lexer(code));
    return parser.parseExpression();
}

let code2Ret = p(code2);
console.log(code2Ret);