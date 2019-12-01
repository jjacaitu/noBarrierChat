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
    
    handleChange = (event) => {
        
        this.setState({
            [event.target.id]:event.target.value
        })
    }

    
    
    signIn = (event) => {

        event.preventDefault();

        const functionToCall = this.props.signInAlert;
        
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((result) => {
            const userUid = result.user.uid;
            firebase.database().ref(`${userUid}/settings/language`).once("value").then((snapshot) => {
                this.props.getLanguage(snapshot.val());
            })
            
            
        }).catch(function (error) {
            // In case of an error we call the function that will change the state in the parent to show the alert.
            
            functionToCall();
            
            
        });
    }

    recoverPassword = (event) => {

        

        event.preventDefault();
        firebase.auth().sendPasswordResetEmail(this.state.emailToRecover).then( () => {
            this.setState({
                emailSent: true
            })
            
        })

    }

    googleSignIn = () => {

        const functionToGetUserIsNew = this.props.userIsNewFunction;
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.

            // The signed-in user info.
            const isUserNew = result.additionalUserInfo.isNewUser;
            

            functionToGetUserIsNew(isUserNew);
            
        })
    }

    
    
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

                <button onClick={this.googleSignIn}>Google sign in <i class="fab fa-google" aria-hidden={true}></i></button>

                <button onClick={() => { this.setState({ forgetPassword: !this.state.forgetPassword }) }}>Forgot your password?</button>

                
                
                {this.state.forgetPassword
                    ?
                    <form className="recoverPassword" action="" onSubmit={this.recoverPassword}>
                        <label htmlFor="emailToRecover">Enter your email:</label>
                        <input type="email" id="emailToRecover" onChange={this.handleChange} required />
                        <SubmitButton label="Recover password" />
                    </form>
                    :
                    ""
                }

                {this.state.emailSent
                    ?
                    <p>An email has been sent with the instructions to recover your password.</p>
                    :
                    ""
                }
                
            </div>
        )
    }
    
}



export default SignInPage;