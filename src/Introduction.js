import React from "react";


function Introduction(props) {
    return(
        <div className="introduction">
            
            <p>Welcome to <span className="logo">Interpreter!</span> The text messaging system where you don't have to worry about speaking the same language to have a conversation with other people!</p>
                    
            <p>Please create an account or sign in as a guest.</p>
    
            <button className="submitButton" onClick={props.functionToClose}>Start!</button>

        </div>
    )
}

export default Introduction