function extendMatrix(matrix, dim1, dim2) {
    const extended = new Array(dim1);
    for (let i = 0; i < dim1; i++) {
        extended[i] = new Array(dim2)
        for (let j = 0; j < dim2; j++) {
            if (i < matrix.length && j < matrix[0].length) {
                extended[i][j] = matrix[i][j];
            } else {
                extended[i][j] = "";
            }
        }
    }
    return extended
}


function cloneMatrix(matrix) {
    return matrix.map(row => [...row]);
}


function equalMatrices(matrix1, matrix2) {
    if (matrix1 === matrix2) {
        return true;
    }
    if (matrix1 === undefined || matrix2 === undefined || matrix1 === null || matrix2 === null || matrix1.length !== matrix2.length) {
        return false;
    }
    for (let i = 0; i < matrix1.length; i++) {
        if (matrix1[i].length !== matrix2[i].length) {
            return false;
        }
        for (let j = 0; j < matrix1[i].length; j++) {
            if (matrix1[i][j] !== matrix2[i][j]) {
                return false;
            }
        }
    }
    return true;
}

export { equalMatrices, extendMatrix, cloneMatrix }