
const util = require('./util');


class Lexer {
    constructor (txt) {
        this.txt = txt;
        this.pos = 0;

        this.current = null;
    }

    next () {
        let token = this.peek();
        this.current = null;
        return token;
    }

    peek () {
        if (this.current) return this.current;
        if (this.pos >= this.txt.length) return null;
        let char = this.txt.charAt(this.pos);
        if (util.isDigit(char)) {
            this.current = this.readNumber();
            return this.current;
        }
        if (util.isOperator(char)) {
            this.current = this.readOperator();
            return this.current;
        }
        throw new Error(`Unexpecting "${char}"`);
    }

    eof () {
        return this.peek() === null;
    }

    readWhile (predicate) {
        let txt = '';
        let char;
        while ((char = this.txt.charAt(this.pos)) && predicate(char)) {
            txt += char;
            this.pos++;
        }
        return txt;
    }

    readNumber () {
        let num = this.readWhile(util.isDigit);
        return {
            type: 'number',
            value: num
        }
    }

    readOperator () {
        let char = this.txt.charAt(this.pos);
        this.pos++;
        return {
            type: char,
            value: char
        }
    }

}

module.exports = Lexer;