import React from "react";
import firebase from "firebase"

const signOut = () => {
    firebase.auth().signOut();
}


function Header(props) {
 

    return (
        <header>
            <div className="wrapper">
                <div className="headerMain">
                    <h1>Interpreter</h1>

                    {/* If the user is signed in then show the sign out and settings buttons */}

                    {props.signedIn
                        &&
                        <nav>
                            <button onClick={signOut}>Sign Out <i className="fas fa-sign-out-alt" aria-hidden={true}></i></button>
                            <button disabled={props.nickname ? false : true} onClick={() => { props.onClickFunction()}}>Settings <i className="fas fa-cogs" aria-hidden={true}></i></button>
                            
                        </nav>
                    }

                </div>

            </div>
            
        </header>
    )
}

export default Header;