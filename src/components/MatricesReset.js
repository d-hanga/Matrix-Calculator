import "../style/MatricesReset.css";

function MatricesReset({ handleMatrixReset }) {
    return (
        <div className="matrix-reset-container">
            <button className="matrix-reset-button" onClick={handleMatrixReset}>Reset</button>
        </div>
    );
}

export default MatricesReset;