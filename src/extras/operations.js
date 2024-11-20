// require { UnmatchingDimensions } from "../errors/matrix.js";
const { UnmatchingDimensions, UnmergableDimension, NoSquareMatrix } = require("../errors/matrix.js");



// EXTEND OPERATIONS FOR VARIABLE AND THEN FOR ...


function addition(A, B) {
    if (A.length !== B.length || A[0].length !== B[0].length) {
        throw new UnmatchingDimensions(A, B, "addition/+");
    }
    return A.map((row, i) => row.map((el, j) => el + B[i][j]));
}


function subtraction(A, B) {
    if (A.length !== B.length || A[0].length !== B[0].length) {
        throw new UnmatchingDimensions(A, B, "subtraction/-");
    }
    return A.map((row, i) => row.map((el, j) => el - B[i][j]));
}


function multiplication(A, B) {
    if (A[0].length !== B.length) {
        throw new UnmergableDimension(A, B, "multiplication/*");
    }
    const result = new Array(A.length).fill(0).map(() => new Array(B[0].length).fill(0));
    return result.map((row, i) => row.map((el, j) => A[i].reduce((acc, cur, k) => acc + cur * B[k][j], 0)));
}

// understand and remake it more efficiently
function inversion(_A) {
    const A = _A.map(row => [...row]);
    if (A.length !== A[0].length) {
        throw new NoSquareMatrix("Matrix must be square for inversion");
    }
    const len = A.length;
    const I = new Array(len).fill(0).map((row, i) => new Array(len).fill(0).map((el, j) => i === j ? 1 : 0));
    for (let i = 0; i < len; i++) {
        const pivot = A[i][i];
        if (pivot === 0) {
            throw new Error("Matrix must be invertible");
        }
        for (let j = 0; j < len; j++) {
            A[i][j] /= pivot;
            I[i][j] /= pivot;
        }
        for (let k = 0; k < len; k++) {
            if (k === i) {
                continue;
            }
            let factor = A[k][i];
            for (let j = 0; j < len; j++) {
                A[k][j] -= factor * A[i][j];
                I[k][j] -= factor * I[i][j];
            }
        }
    }
    return I;
}


function division(A, B) {
    return multiplication(A, inversion(B));
}


function transposition(A) {
    return A[0].map((_, i) => A.map(row => row[i]));
}


// export { add, subtract, multiply, inverse, division, transpose };
module.exports = { addition, subtraction, multiplication, inversion, division, transposition };



