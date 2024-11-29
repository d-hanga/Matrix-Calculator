class UnmatchingDimensions extends Error {
    constructor(A, B, operation) {
        super(
            `Matrix A and B must have the same dimensions for this operation (${operation}). (dim(A) = ${A.length}x${A[0].length}); dim(B) = (${B.length}x${B[0].length})`
        );
        this.name = this.constructor.name;
    }
}


class UnmergableDimension extends Error {
    constructor(A, B, operation) {
        super(
            `Matrices A and B must have mergable dimensions ((A) mxn and nxo (B)) for this operation (${operation}). (dim(A) = ${A.length}x${A[0].length}); dim(B) = (${B.length}x${B[0].length})`
        );
        this.name = this.constructor.name;
    }
}


class ZeroDimension extends Error {
    constructor(M, d1, d0) {
        super(
            `Matrix-Dimensions must be greater than 0. (dim(M) = ${d1}x${d0})`
        );
        this.name = this.constructor.name;
    }
}


class NoSquareMatrix extends Error {
    constructor(A, operation) {
        super(
            `Matrix must be square (nxn) for this operation (${operation}). (dim(A) = ${A.length}x${A[0].length})`
        );
        this.name = this.constructor.name;
    }
}





// export { UnmatchingDimensions };
module.exports = { UnmatchingDimensions, UnmergableDimension, NoSquareMatrix, ZeroDimension };