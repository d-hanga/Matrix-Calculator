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
        handleMatrixCreation("result", result);
    };

    const deleteResult = () => {
        setResult("");
    }

    const submitInputCalculation = (e) => {
        e.preventDefault();
        const r = (
            () => {
                try {
                    return operationbreaker(formula, matrices);
                } catch (err) {
                    return err;
                }
            }
        )();
        if (r instanceof Error) {
            alert(`Invalid input: \n\n${r}`);
            return;
        }
        setResult(r);
    }

    let matrixnames = [];
    for (let [key, ] of matrices) {
        matrixnames.push(<option key={key} className={"possible-choice"} value={key}>{key}</option>);
    }

    return (
        <div className="matrix-operations">
            <div className="all-operations">
                <div className="matrix-operations__container">
                    <select value={operation} onChange={e => {e.preventDefault(); setOperation(e.target.value)}} className={(operation === "") ? "matrix-operations-choice unchosen" : "matrix-operations-choice chosen"}>
                        <option className="impossible-choice" value={""} disabled>Operation</option>
                        <option className="impossible-choice" value="-------" disabled>---------</option>
                        <option className="possible-choice" value="addition">Add</option>
                        <option className="possible-choice" value="subtraction">Subtract</option>
                        <option className="possible-choice" value="multiplication">Multiply</option>
                        <option className="possible-choice" value="division">Divide</option>
                    </select>
                    <select value={matrix1} onChange={(e) => setMatrix1(e.target.value)} className={(matrix1 === "") ? "matrix-input-1 unchosen" : "matrix-input-1 chosen"} >
                        <option className="impossible-choice" value={""} disabled>1st Matrix</option>
                        <option className="impossible-choice" value="-------" disabled>---------</option>
                        {matrixnames}
                    </select>
                    <select value={matrix2} onChange={(e) => setMatrix2(e.target.value)} className={(matrix2 === "") ? "matrix-input-2 unchosen" : "matrix-input-2 chosen"} >
                        <option className="impossible-choice" value={""} disabled>2nd Matrix</option>
                        <option className="impossible-choice" value="-------" disabled>---------</option>
                        {matrixnames}
                    </select>
                    <button onClick={handleOperation} className="matrix-operations__button">Calculate</button>
                </div>
                <form className="operation-input" onSubmit={submitInputCalculation}>
                    <input onChange={e => {setFormula(e.target.value)}} value={formula} />
                    <button className="matrix-operations__button">Submit</button>
                </form>
            </div>
            {result && 
                (<MatrixResult handleDelete={deleteResult} handleMatrixCreation={handleMatrixCreation} matrix={result} activateEditMode={handleSave} className="matrix-operations__result" />)}
        </div>
    );
}

export default MatrixOperations;