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
            emailSent:false
        }
    }
    
    handleChange = (event) => {
        
        this.setState({
            [event.target.id]:event.target.value
        })
    }

    
    
    signIn = (event) => {
        event.preventDefault();
        
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((result) => {
            const userUid = result.user.uid;
            firebase.database().ref(`${userUid}/settings/language`).once("value").then((snapshot) => {
                this.props.getLanguage(snapshot.val());
            })
            
            
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            // ...
        });
    }

    recoverPassword = (event) => {
        event.preventDefault();
        firebase.auth().sendPasswordResetEmail(this.state.emailToRecover).then(function () {
            this.setState({
                emilSent: true
            })
        }).catch(function (error) {
            // An error happened.
        });

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
                <button onClick={() => { this.setState({ forgetPassword: !this.state.forgetPassword }) }}>Forgot your password?</button>
                
                {
                    this.state.forgetPassword
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