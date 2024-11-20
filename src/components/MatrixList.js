import "../style/MatrixList.css";


import mapmap from "../extras/map-handling";

import MatrixNormalDisplay from "./MatrixNormalDisplay";

function MatrixList({ activateEditMode, matrices, createHandleDelete }) {
    return (
        <div className="matrix-list">
            {mapmap(matrices, (name, matrix) => (
                    <MatrixNormalDisplay key={name} handleDelete={createHandleDelete(name)} activateEditMode={activateEditMode} name={name} matrix={matrix} />
                ))}
        </div>
    );
}

export default MatrixList;