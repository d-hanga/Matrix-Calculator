function addition(matrix1, matrix2) {
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        throw new Error('Matrices must have the same dimensions');
    }

    return matrix1.map((row, i) => row.map((cell, j) => cell + matrix2[i][j]));
}