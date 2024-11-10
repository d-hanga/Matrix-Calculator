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



// explain what is happening here
// table is a HTML element that is used to display data in a tabular format.
// tbody is a HTML element that is used to group the body content in a table.
// tr is a HTML element that defines a row in a table.
// td is a HTML element that defines a cell in a table.

export default MatrixResult;