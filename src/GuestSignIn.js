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

        // These makes the guest users log out if the page is refreshed

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE).then(() => {
                
            // Sign in the user anonimously

            return firebase.auth().signInAnonymously().then((data) => {
                        
                const userId = data.user.uid;
                
                // Getting the current guest number to use it as the nickname

                const guestNumberData = firebase.database().ref("/generalConfig");

                guestNumberData.once("value").then((value) => {
                    this.setState({
                            
                        userId: userId,
                        
                    })               
                        
                    // making the data object to use it later to update the databse of that guest

                    const data = {

                        "chats": false,
                        "settings": {
                            "language": this.state.language,
                            "nickname": `guest${value.val().guestNumber}`,
                            "email": null,
                            "isGuest": true
                        }

                    }

                    // Updating the database

                    firebase.database().ref(`${userId}`).update(data);

                })
            })
        })
            
    }

    // Method to get the selected language from the language selector

    getLanguage = (event) => {
        this.setState({
            language: event.target.value
        })
    }

    // Rendering the component

    render() {
        return (
            <form className="guestSignIn" action="" onSubmit={this.signInGuest}>
                <h2>Sign up as Guest</h2>
                <p>Signing in as a guest means you won't be able to select your nickname and will only be able to  get access to your conversations while logged in. If your refresh the page you will automatically logged out.</p>
                <p>When you log In you will recieve your guest name, use this to connect with other users. </p>
                <LanguageSelector languages={this.props.languages} function={this.getLanguage} />
                <SubmitButton label="Sign in" />
            </form>
        )
    }

}


export default GuestSignUp;