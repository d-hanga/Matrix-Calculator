import MatrixDisplay from "./MatrixDisplay";

function MatrixNormalDisplay({ name, matrix, activateEditMode, handleDelete }) {
    const handleClick = (event) => {
        activateEditMode(name);
    }
    return (
        <MatrixDisplay handleDelete={handleDelete} name={name} matrix={matrix} buttonFunctioning={handleClick} buttonName="Edit" />
    );
}



// explain what is happening here
// table is a HTML element that is used to display data in a tabular format.
// tbody is a HTML element that is used to group the body content in a table.
// tr is a HTML element that defines a row in a table.
// td is a HTML element that defines a cell in a table.

export default MatrixNormalDisplay;