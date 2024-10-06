import { useState } from "react";
import "../style/MatrixEditMode.css";

function MatrixEditMode({ deactivateEditMode, matrix, name}) {
    const [changedMatrix, setChangedMatrix] = useState(matrix);


    const [changedDimensions, setChangedDimensions] = useState([matrix.length, matrix[0].length]);


    const handleChange = (value, i, j) => {
        setChangedMatrix(
            changedMatrix.map((row, rowIndex) => 
                rowIndex === i ? 
                row.map((cell, colIndex) => colIndex === j ? value : cell) : 
                row
            )
        );
    }

    const handleSubmit = (event) => {
        extendMatrix(changedDimensions);
        deactivateEditMode(changedMatrix);
    }


    const extendMatrix = () => {
        const dims = [parseInt(changedDimensions[0]), parseInt(changedDimensions[1])];
        const newMatrix = [];
        for (let i = 0; i < dims[0]; i++) {
            newMatrix.push([]);
            for (let j = 0; j < dims[1]; j++) {
                // newMatrix[i].push(changedMatrix[i] != null ? changedMatrix[i][j] || "" : "");
                newMatrix[i].push(changedMatrix[i] != null ? changedMatrix[i][j] || 0 : 0);
            }
        }
        console.log(newMatrix);
        // setChangedDimensions(dims);
        setChangedMatrix(newMatrix);
    }


    return (
        <div className="matrix-edit-mode">
            <form onSubmit={handleSubmit}>
                <div className="dimensions">
                    <input className="left"  value={changedDimensions[0]} onBlur={() => extendMatrix()} onChange={(event => {setChangedDimensions([event.target.value, changedDimensions[1]])})} />
                    <div className="x">x</div>
                    <input className="right" value={changedDimensions[1]} onBlur={() => extendMatrix()} onChange={(event => {setChangedDimensions([changedDimensions[0], event.target.value])})} />
                </div>
                <div className="matrix-header">
                    <div className="matrix-name">{name}</div>
                    <table className="matrix">
                        <tbody>
                        {matrix.map((row, i) => (
                            <tr key={i}>
                            {row.map((cell, j) => (
                                <td key={j}><input value={changedMatrix[i][j]} onChange={(event => {handleChange(event.target.value, i, j)})}/></td>
                            ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <button className="done-button">Done</button>
            </form>
        </div>
    );
}

export default MatrixEditMode;