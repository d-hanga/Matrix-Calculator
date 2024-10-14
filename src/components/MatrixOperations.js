import { useState } from "react";
import "../style/MatrixOperations.css";
import { addition, subtraction, multiplication, inversion, division, transposition } from "../extras/operations";
import MatrixDisplay from "./MatrixDisplay";

function MatrixOperations({ matrices, handleMatrixCreation }) {
    const [matrix1, setMatrix1] = useState("");
    const [matrix2, setMatrix2] = useState("");
    const [result, setResult] = useState(null);

    const handleOperation = (e) => {
        e.preventDefault();
        console.log(matrices);
        console.log(matrix1, matrix2);
        const operation = e.target.querySelector(".matrix-operations-choice").value;
        switch (operation) {
            case "addition":
                setResult(addition(matrices.get(matrix1), matrices.get(matrix2)));
                break;
            case "subtraction":
                setResult(subtraction(matrices.get(matrix1), matrices.get(matrix2)));
                break;
            case "multiplication":
                setResult(multiplication(matrices.get(matrix1), matrices.get(matrix2)));
                break;
            case "division":
                setResult(division(matrices.get(matrix1), matrices.get(matrix2)));
                break;
            default:
                break;
        }
    }


    const handleSave = () => {
        handleMatrixCreation("result", result);
    }



    return (
        <div className="matrix-operations">
            {/* <h2>Matrix Operations</h2> */}
            <form onSubmit={handleOperation} className="matrix-operations__container">
                <select className="matrix-operations-choice">
                    <option value="addition">Add</option>
                    <option value="subtraction">Subtract</option>
                    <option value="multiplication">Multiply</option>
                    <option value="division">Divide</option>
                </select>
                <input value={matrix1} onChange={(e) => setMatrix1(e.target.value)} className="matrix-input-1" placeholder="Matrix 1" />
                <input value={matrix2} onChange={(e) => setMatrix2(e.target.value)} className="matrix-input-2" placeholder="Matrix 2" />
                <button className="matrix-operations__button">Calculate</button>
            </form>
            {result && 
                (<MatrixDisplay name="result" matrix={result} activateEditMode={handleSave} className="matrix-operations__result" />)}
        </div>
    );
}

export default MatrixOperations;