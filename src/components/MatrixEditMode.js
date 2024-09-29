import "../style/MatrixEditMode.css";

import MatrixDisplay from "./MatrixDisplay";

function MatrixEditMode({ deactivateEditMode, matrices, name }) {
    return (
        <div className="matrix-edit-mode">
            <MatrixDisplay activateEditMode={deactivateEditMode} name={name} matrix={matrices.get(name)} />
        </div>
    );
}

export default MatrixEditMode;