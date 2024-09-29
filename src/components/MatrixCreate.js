import "../style/MatricesHandling.css";
import { useState } from 'react';

function MatrixCreate({ handleMatrixCreation }) {
    const [name, setName] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        handleMatrixCreation(name, [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]);
        setName("");
    }

    const handleChange = (event) => {
        setName(event.target.value);
    }

    return (
        <form className="matrix-create-form" onSubmit={handleSubmit}>
            <input
                className="matrix-create-input"
                value={name}
                onChange={handleChange}
                placeholder="Enter matrix name"
            />
            <button className="matrix-create-button" type="submit">Create Matrix</button>
        </form>
    );
}

export default MatrixCreate;