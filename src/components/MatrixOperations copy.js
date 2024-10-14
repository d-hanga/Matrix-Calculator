import "../style/MatrixOperations.css";

function MatrixOperations({ matrices }) {
    const handleTransposition = (e) => {
        e.preventDefault();
        console.log("Transpose");
    }

    const handleAddition = (e) => {
        e.preventDefault();
        console.log("Add");
    }

    const handleSubtraction = (e) => {
        e.preventDefault();
        console.log("Subtract");
    }

    const handleMultiplication = (e) => {
        e.preventDefault();
        console.log("Multiply");
    }

    const handleDivision = (e) => {
        e.preventDefault();
        console.log("Divide");
    }



    return (
        <div className="matrix-operations">
            <h2>Matrix Operations</h2>
            <div className="matrix-operations__operations">
                <form onSubmit={handleTransposition} className="transposition-field">
                    <button>Transpose</button>
                    <input type="text" placeholder="Matrix 1" />
                </form>

                <form onSubmit={handleAddition} className="addition-field">
                    <button>Add</button>
                    <input type="text" placeholder="Matrix 1" />
                    <input type="text" placeholder="Matrix 2" />
                </form>

                <form onSubmit={handleSubtraction} className="subtraction-field">
                    <button>Subtract</button>
                    <input type="text" placeholder="Matrix 1" />
                    <input type="text" placeholder="Matrix 2" />
                </form>

                <form onSubmit={handleMultiplication} lassName="multiplication-field">
                    <button>Multiply</button>
                    <input type="text" placeholder="Matrix 1" />
                    <input type="text" placeholder="Matrix 2" />
                </form>

                <form onSubmit={handleDivision} className="division-field">
                    <button>Divide</button>
                    <input type="text" placeholder="Matrix 1" />
                    <input type="text" placeholder="Matrix 2" />
                </form>
            </div>
        </div>
    );
}

export default MatrixOperations;