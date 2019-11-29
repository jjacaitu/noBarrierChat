import React, { Component } from "react";
import SubmitButton from "./SubmitButton";
import firebase from "firebase";
import LanguageSelector from "./LanguageSelector"


class GuestSignUp extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            name: "",
            language: "en",
            userId: ""
        }
    }

    signInGuest = (event) => {
        event.preventDefault();

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
            .then(() => {
                // Existing and future Auth states are now persisted in the current
                // session only. Closing the window would clear any existing state even
                // if a user forgets to sign out.
                // ...
                // New sign-in will be persisted with session persistence.
                return firebase.auth().signInAnonymously().then((data) => {
                    
                    const userId = data.user.uid;

                    const guestNumberData = firebase.database().ref("/generalConfig");
                    guestNumberData.once("value").then((value) => {
                        this.setState({
                            
                            userId: userId,
                         
                        })

                        console.log(value.val().guestNumber);
                  
                        
                        const data = {

                            "chats": false,
                            "settings": {
                                "language": this.state.language,
                                "nickname": `guest${value.val().guestNumber}`,
                                "email": null,
                                "isGuest": true
                            }

                        }

                        firebase.database().ref(`${userId}`).update(data);

                        

                    })

                }).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorMessage);
                    // ...
                });
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
            });


        

       
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }


    getLanguage = (event) => {
        console.log(event.target.value);
        this.setState({
            language: event.target.value
        })
    }

    render() {
        return (

            <form className="guestSignIn" action="" onSubmit={this.signInGuest}>
                <h2>Sign up Guest</h2>
                <p>Signing in as a guest means you wont be able to select your nickname and will only be able to  get access to your conversations while logged in. If your refresh the page you will automatically logged out.</p>
                <LanguageSelector function={this.getLanguage} />
                <SubmitButton label="Sign in" />
                
            </form>
        )
    };

}


export default GuestSignUp;