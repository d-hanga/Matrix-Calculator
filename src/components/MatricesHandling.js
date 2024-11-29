import "../style/MatricesHandling.css";

import MatrixCreate from "./MatrixCreate";
import MatricesReset from "./MatricesReset";


function MatricesHandling({ handleMatrixReset, handleMatrixCreation }) {
    return (
        <div className="outer-wrapper">
            <div className="container">
                <MatricesReset handleMatrixReset={handleMatrixReset}  />
                <MatrixCreate handleMatrixCreation={handleMatrixCreation} />
            </div>
        </div>
    );
}

export default MatricesHandling;