import React from "react";
import firebase from "firebase";



function AlertMessage(props) {
    
    const close = () => {
        props.functionToClose();
        console.log(props);
    }

    const resendEmail = () => {
        firebase.auth().currentUser.sendEmailVerification();
    }

    return(
        <div className="alert">
            <h2>{props.message}</h2>
            <div>
                <button onClick={close}>Ok</button>
                {props.resend
                    ?
                    <button onClick={resendEmail}>Resend email</button>
                    :
                    ""
                }
            

            </div>
        </div>
    )
}

export default AlertMessage;