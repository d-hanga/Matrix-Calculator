import { useState } from "react";
import "../style/MatrixEditMode.css";

import {cloneMatrix, extendMatrix} from "../extras/matrix-handling"

function MatrixEditMode({ deactivateEditMode, matrix, name}) {
    const [changed, setChanged] = useState(cloneMatrix(matrix)); // changed isn't the result, because it only changes, when a value is changed, if only a dimension is changed, it remains the same, only when displaying the array, it shows the corect dimension, because if you wanted to change the dimension from 3 to 12, you would do this normally:
    // [1,2,3] => [1] => [1,0,0,...]
    // with this method this happens:
    // displayed: [1,2,3] => [1] => [1,2,3,0,0,...]
    // iternally: [1,2,3] => [1,2,3] => [1,2,3,0,0,...]
    // changed only changes when: a value is modified or the array is made LONGER, NOT SHORTER
    const [dimensions, setDimensions] = useState([matrix.length, matrix[0].length]);


    const handleChange = (value, i, j) => {
        setChanged(
            changed.map((row, rowIndex) => 
                rowIndex === i ? 
                row.map((cell, colIndex) => colIndex === j ? value : cell) : 
                row
            )
        );
    }

    const handleSubmit = (event) => {
        deactivateEditMode(changed);
    }

    const onChangeDimensions = (event) => {
        setChanged(extendMatrix(changed, ...dimensions));
    }

    // if this doesn't work, use the change (set) and parameter, which means you dont wait for statechange to put it as param
    // set(bla)
    // f(bla)
    if (dimensions[0] !== changed.length || dimensions[1] !== changed[0].length) {
        onChangeDimensions();
    }

    console.log(changed.length, changed[0].length, dimensions[0], dimensions[1]);

    return (
        <form className="matrix-edit-mode" onSubmit={handleSubmit}>
            <div className="matrix-edit-header">
                <div className="matrix-edit-name">{name}</div>
                <div className="matrix-edit-w-dim">
                    <div className="matrix-edit-dimension">
                        <input onBlur={e=>{setDimensions([parseInt(e.target.value), dimensions[1]])}} onChange={e=>{setDimensions([parseInt(e.target.value), dimensions[1]])}} value={dimensions[0]}/>
                        x
                        <input onChange={e=>{setDimensions([dimensions[0], parseInt(e.target.value)])}} value={dimensions[1]}/>
                    </div>
                    {console.log("FWAEH:\n_______")}
                    {console.log(dimensions)}
                    {console.log([changed.length, changed[0].length])}
                    {console.log("")}
                    <table className="matrix-edit">
                        <tbody>
                        {changed.map((row, i) => (
                            <tr key={i}>
                            {row.map((cell, j) => (
                                <td key={j}><input value={changed[i][j]} onChange={(event => {handleChange(event.target.value, i, j)})}/></td>
                            ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <button className="done-button">Done</button>
        </form>
    );
}

export default MatrixEditMode;