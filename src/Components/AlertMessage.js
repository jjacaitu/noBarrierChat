import React from "react";

function AlertMessage(props) {
    
    return(
        <div className="alert">
            <h3>{props.title}</h3>
            <p>{props.message}</p>
            <div>
                <button onClick={() => { props.functionToClose() }}>{props.originalLabel}</button>
                
                {/* If the props of aditionalButton is true then show the extra button */}
                
                {props.aditionalButton ? <button onClick={props.aditionalFunction}>{props.aditionalLabel}</button> : ""}
            </div>
        </div>
    )
}

export default AlertMessage;