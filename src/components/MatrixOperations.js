import { useState } from "react";
import "../style/MatrixOperations.css";
import operationbreaker from "../extras/str2linalgcalculation";
import { addition, subtraction, multiplication, division } from "../extras/operations";
import MatrixResult from "./MatrixResult";

function MatrixOperations({ matrices, handleMatrixCreation }) {
    const [matrix1, setMatrix1] = useState("");
    const [matrix2, setMatrix2] = useState("");
    const [result, setResult] = useState("");
    const [operation, setOperation] = useState("");
    const [formula, setFormula] = useState("");

    const handleOperation = (e) => {
        e.preventDefault();
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
    };

    const handleSave = () => {
        console.log(result);
        handleMatrixCreation("result", result);
    };

    const deleteResult = () => {
        setResult("");
    }

    let matrixnames = [];
    for (let [key, value] of matrices) {
        matrixnames.push(<option value={key}>{key}</option>);
    }

    return (
        <div className="matrix-operations">
            <div className="all-operations">
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
                <form className="operation-input" onSubmit={e => {e.preventDefault(); const gg = operationbreaker(formula, matrices); console.log(gg); setResult(gg);}}>
                    <input onChange={e => {setFormula(e.target.value)}} value={formula} />
                </form>
            </div>
            {result && 
                (<MatrixResult handleDelete={deleteResult} handleMatrixCreation={handleMatrixCreation} matrix={result} activateEditMode={handleSave} className="matrix-operations__result" />)}
        </div>
    );
}

export default MatrixOperations;