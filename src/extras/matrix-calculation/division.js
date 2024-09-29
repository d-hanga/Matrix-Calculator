import { multiply } from './multiply.js';
import { inverse } from './inverse.js';

function division(matrix1, matrix2) {
    return multiply(matrix1, inverse(matrix2));
}