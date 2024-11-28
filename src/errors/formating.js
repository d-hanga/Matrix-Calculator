class InvalidNumber extends Error {
    constructor(num) {
        super(
            `"${num}" cannot be parsed as a number.`
        );
        this.name = this.constructor.name;
    }
}

module.exports = { InvalidNumber };