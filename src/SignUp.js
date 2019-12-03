import React, { Component } from "react";
import SubmitButton from "./SubmitButton";
import firebase from "firebase";
import LanguageSelector from "./LanguageSelector";


class SignUp extends Component{

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            name: "",
            language: "en",
            signedUp:false
        }
    }

    getLanguage = (event) => {
        
        this.setState({
            language: event.target.value,
            
        })
    }

    // Method to create a new user

    createUser = (event) => {
        event.preventDefault();

        const functionToCallAlert = this.props.signUpAlert;
        const nickname = this.state.name;
        const nicknameFirstFiveLetters = nickname.toLowerCase().substring(0, 5);

        // Checking if the user is trying to use a nickname with the word guest in order to trigger an error

        if (nicknameFirstFiveLetters === "guest") {
            functionToCallAlert();
        } else {
            
            const databaseRef = firebase.database().ref();
    
            databaseRef.once("value").then((snapshot) => {
    
                const databaseData = snapshot.val()
                const arrayPromises = []
                for (let user in databaseData) {
                    if (user !== "generalConfig") {
    
                        
                        const userRef = firebase.database().ref(`${user}/settings/nickname`);
                        arrayPromises.push(userRef.once("value"));
    
                    }
                }
    
                // Using promise.all to make sure to get all values before doing anything
    
                Promise.all(arrayPromises).then((values) => {
                    const existingNicknames = values.map((item) => {
                        return item.val()
                    });

                    // If the nickname the user is trying to use already exists then trigger the Alert
    
                    if (existingNicknames.includes(nickname)) {
    
                        functionToCallAlert();
                        
                    } else {
                        
                        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((result)=>{
                
                            const data = {
                                
                                    "chats": false,
                                    "settings": {
                                        "language": this.state.language,
                                        "nickname": this.state.name,
                                        "email": this.state.email,
                                    }
                                
                            }
                
                            firebase.database().ref(`${result.user.uid}`).update(data);
                
                            result.user.sendEmailVerification().then(function () {
                                // Email sent.
                                
                            })
                
                            // update the profile with the nickname selected
                
                            result.user.updateProfile({
                                displayName: this.state.name,
                            })
                        }).catch(() => {

                            // In case the email has already been used by another user show an alert

                            functionToCallAlert();

                        })
                    }
                })
            })
        }
    }

    // Method to handle changes on the inputs

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() {
        return (
            <form className="signUp" action="" onSubmit={this.createUser}>
                <h2>Sign up</h2>
                <label htmlFor="name">Enter nickname</label>
                <input type="text" id="name" maxLength={10} onChange={this.handleChange} value={this.state.name} required />
                <label htmlFor="email">Enter email</label>
                <input type="email" id="email" onChange={this.handleChange} value={this.state.email} required />
                <label htmlFor="password">Enter password</label>
                <input type="password" id="password" minLength={6} onChange={this.handleChange} value={this.state.password} required />
                <LanguageSelector languages={this.props.languages} function={this.getLanguage} />
                <SubmitButton label="Sign up" />
            </form>
        )
    };

}


export default SignUp;