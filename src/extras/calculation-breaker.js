// where matrices = { A:<2d-array>, B:<2d-array>, C:<2d-array>, D:<2d-array>, E:<2d-array> }
import { addition } from './matrix-calculation/addition.js';
import { subtraction } from './matrix-calculation/subtraction.js';
import { multiplication } from './matrix-calculation/multiplication.js';
import { division } from './matrix-calculation/division.js';

// "A*B + C - D/E" => , subtraction(addition( multiplication(A, B), C), division(D, E)) )
function calculationBreaker(expression, matrices) {
    let operators = ['+', '-', '*', '/'];
    let expressionArray = expression.split(' ');
    let stack = [];
    for (let i = 0; i < expressionArray.length; i++) {
        if (operators.includes(expressionArray[i])) {
            let operator = expressionArray[i];
            let operand2 = stack.pop();
            let operand1 = stack.pop();
            let result = '';
            switch (operator) {
                case '+':
                    result = addition(operand1, operand2);
                    break;
                case '-':
                    result = subtraction(operand1, operand2);
                    break;
                case '*':
                    result = multiplication(operand1, operand2);
                    break;
                case '/':
                    result = division(operand1, operand2);
                    break;
                default:
                    break;
            }
            stack.push(result);
        } else {
            stack.push(matrices[expressionArray[i]]);
        }
    }
    return stack[0];
}



export default calculationBreaker;