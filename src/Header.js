import React from "react";
import firebase from "firebase"

const signOut = () => {
    firebase.auth().signOut();
    }

function Header(props) {
    return (
        <header>
            <h1>No Barriers Chat!</h1>
            {props.signedIn
                ?
                <nav>
                    <button onClick={signOut}>Sign Out</button>
                    <button>Settings</button>
                </nav>
                :
                ""
            }
            
        </header>
    )
}

export default Header;