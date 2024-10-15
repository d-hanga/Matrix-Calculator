import { useState } from "react";
import "../style/MatrixOperations.css";
import { addition, subtraction, multiplication, inversion, division, transposition } from "../extras/operations";
import MatrixDisplay from "./MatrixDisplay";
import MatrixResult from "./MatrixResult";

function MatrixOperations({ matrices, handleMatrixCreation, saveMatrix }) {
    const [matrix1, setMatrix1] = useState("");
    const [matrix2, setMatrix2] = useState("");
    const [result, setResult] = useState("");
    // const [operation, setOperation] = useState("<first operation>");
    const [operation, setOperation] = useState("");

    const handleOperation = (e) => {
        e.preventDefault();
        console.log("m1:");
        console.log(matrix1);
        console.log("m2:");
        console.log(matrix2);
        if (matrix1 !== "" && matrix2 !== "" && operation !== "") {
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
        console.log(" ");
    }


    const handleSave = () => {
        handleMatrixCreation("result", result);
    }


    let matrixnames = [];
    for (let [key, value] of matrices) {
        // matrixnames.push(<option key={key} value={key}>{key}</option>);
        matrixnames.push(<option value={key}>{key}</option>);
    }


    console.log("result:");
    console.log(result);
    console.log(" ");

    return (
        <div className="matrix-operations">
            {/* <h2>Matrix Operations</h2> */}
            {/* remove form, bc form happens even if only choice!!!!! */}
            <div className="matrix-operations__container">
                <select value={operation} onChange={e => {e.preventDefault(); setOperation(e.target.value)}} className="matrix-operations-choice">
                    <option value={""} disabled>Operation</option>
                    <option value="-------" disabled>---------</option>
                    <option value="addition">Add</option>
                    <option value="subtraction">Subtract</option>
                    <option value="multiplication">Multiply</option>
                    <option value="division">Divide</option>
                </select>
                <select value={matrix1} onChange={(e) => setMatrix1(e.target.value)} className="matrix-input-1" >
                    <option value={""} disabled>1st Matrix</option>
                    <option value="-------" disabled>---------</option>
                    {matrixnames}
                </select>
                <select value={matrix2} onChange={(e) => setMatrix2(e.target.value)} className="matrix-input-2" >
                    <option value={""} disabled>2nd Matrix</option>
                    <option value="-------" disabled>---------</option>
                    {matrixnames}
                </select>
                <button onClick={handleOperation} className="matrix-operations__button">Calculate</button>
            </div>
            {result && 
                (<MatrixResult saveMatrix={saveMatrix} matrix={result} activateEditMode={handleSave} className="matrix-operations__result" />)}
        </div>
    );
}

export default MatrixOperations;