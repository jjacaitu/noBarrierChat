import React from "react";

function SubmitButton(props) {
    return (
        <button disabled={props.disabled} className="submitButton" type="submit">{props.label}</button>
    )
}

export default SubmitButton;