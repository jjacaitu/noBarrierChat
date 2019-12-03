import React, { Component } from "react";
import SubmitButton from "./SubmitButton";
import firebase from "firebase";



class SignInPage extends Component{

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            forgetPassword: false,
            emailToRecover: "",
            emailSent: false,
            google: false,
        }
    }

    // Method that will handle all the changes in the inputs
    
    handleChange = (event) => {
        
        this.setState({
            [event.target.id]:event.target.value
        })
    }

    // Method when the user submits theform with the sign in information
    
    signIn = (event) => {

        event.preventDefault();

        // Storing the function from the props that will trigger the alert in case of an error

        const functionToCall = this.props.signInAlert;

        // Firebase method to sign in

        const email = this.state.email;

        const password = this.state.password;
        
        firebase.auth().signInWithEmailAndPassword(email,password ).then((result) => {
            const userUid = result.user.uid;

            // Getting the language of the user that is signed in from the database

            firebase.database().ref(`${userUid}/settings/language`).once("value").then((snapshot) => {
                this.props.getLanguage(snapshot.val());
            })
            
            
        }).catch(function (error) {

            // In case of an error we call the function that will change the state in the parent to show the alert.
            
            functionToCall();
            
            
        });
    }

    // Method to send an email to the user in case the user forgets the password

    recoverPassword = (event) => {

        event.preventDefault();
        firebase.auth().sendPasswordResetEmail(this.state.emailToRecover).then( () => {
            this.setState({
                emailSent: true
            })
            
        })

    }

    // Method to sign in with google account

    googleSignIn = () => {

        const functionToGetUserIsNew = this.props.userIsNewFunction;
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function (result) {
            
            // The signed-in user info so that the app can know if the user is new and ask for the rest of the settings later.

            const isUserNew = result.additionalUserInfo.isNewUser;
            
            functionToGetUserIsNew(isUserNew);
            
        })
    }

    
    // Render the component

    render() {
        
        return (
            <div className="signIn">
                <form  action="" onSubmit={this.signIn}>
                    <h2>Sign In</h2>
                    <label htmlFor="email">Enter email</label>
                    <input type="email" id="email" onChange={this.handleChange} value={this.state.email} required />
                    <label htmlFor="password">Enter password</label>
                    <input type="password" id="password" onChange={this.handleChange} value={this.state.password} required/>
                    <SubmitButton label="Sign in" />
                    
                </form>

                <button onClick={this.googleSignIn}>Google sign in <i className="fab fa-google" aria-hidden={true}></i></button>

                <button onClick={() => { this.setState({ forgetPassword: !this.state.forgetPassword }) }}>Forgot your password?</button>

                {this.state.forgetPassword
                    &&
                    <form className="recoverPassword" action="" onSubmit={this.recoverPassword}>
                        {this.state.emailSent
                            &&
                            <p>An email has been sent with the instructions to recover your password.</p>
                        }
                        <label htmlFor="emailToRecover">Enter your email:</label>
                        <input type="email" id="emailToRecover" onChange={this.handleChange} required />
                        <SubmitButton label="Recover password" />
                    </form>
                }

                
                
            </div>
        )
    }
    
}



export default SignInPage;