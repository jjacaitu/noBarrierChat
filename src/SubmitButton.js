import React from "react";

function SubmitButton(props) {
    return (
        <button className="submitButton" type="submit">{props.label}</button>
    )
}

export default SubmitButton;