import React from "react";
import firebase from "firebase"

const signOut = () => {
    firebase.auth().signOut();
}


    


function Header(props) {

    const callSettings = () => {
        props.onClickFunction()
    }

    

    return (
        <header>
            <div className="wrapper">
                <div className="headerMain">
                    <h1>Interpreter</h1>
                    {props.signedIn
                        ?
                        <nav>
                            <button onClick={signOut}>Sign Out</button>
                            <button onClick={callSettings}>Settings</button>
                        </nav>
                        :
                        ""
                    }

                </div>

            </div>
            
        </header>
    )
}

export default Header;