import MatrixDisplay from "./MatrixDisplay";

function MatrixNormalDisplay({ name, matrix, activateEditMode, handleDelete }) {
    const handleClick = (event) => {
        activateEditMode(name);
    }
    return (
        <MatrixDisplay handleDelete={handleDelete} name={name} matrix={matrix} buttonFunctioning={handleClick} buttonName="Edit" />
    );
}




export default MatrixNormalDisplay;