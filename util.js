
function isDigit (char) {
    return /[0-9.]/.test(char);
}

function isOperator (char) {
    return /[\-+*/()!^]/.test(char);
}

module.exports = {
    isDigit,
    isOperator
}