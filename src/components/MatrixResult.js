import "../style/MatrixResult.css";
import MatrixDisplay from "./MatrixDisplay";

function MatrixResult({ matrix, handleMatrixCreation, handleDelete }) {
    const handleClick = (e) => {
        handleMatrixCreation(prompt("Enter the name of the matrix: "), matrix);
    }
    return (
        <MatrixDisplay handleDelete={handleDelete} name="Result" matrix={matrix} buttonFunctioning={handleClick} buttonName="Save" />
    );
}



export default MatrixResult;