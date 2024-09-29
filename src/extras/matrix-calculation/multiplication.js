function multiplication(matrix1, matrix2) {
    if (matrix1[0].length !== matrix2.length) {
        throw new Error('The number of columns in the first matrix must be equal to the number of rows in the second matrix');
    }

    return matrix1.map((row, i) => {
        return matrix2[0].map((cell, j) => {
            return matrix2.reduce((acc, _, k) => acc + matrix1[i][k] * matrix2[k][j], 0);
        });
    });
}