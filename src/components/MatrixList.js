import mapmap from "../extras/map-handling";

import MatrixDisplay from "./MatrixDisplay";

function MatrixList({ activateEditMode, matrices }) {
    return (
        <div>
            {mapmap(matrices, (name, matrix) => (
                <MatrixDisplay activateEditMode={activateEditMode} name={name} matrix={matrix} />
            ))}
        </div>
    );
}

export default MatrixList;