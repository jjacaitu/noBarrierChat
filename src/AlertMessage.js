import React from "react";




function AlertMessage(props) {
    


    return(
        <div className="alert">
            <h4>{props.title}</h4>
            <p>{props.message}</p>
            <div>
    <button onClick={()=>{props.functionToClose()}}>{props.originalLabel}</button>
                {props.aditionalButton
                    ?
                <button onClick={props.aditionalFunction}>{props.aditionalLabel}</button>
                    :
                    ""
                }
            

            </div>
        </div>
    )
}

export default AlertMessage;