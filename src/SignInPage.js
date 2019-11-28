import React, { Component } from "react";
import SubmitButton from "./SubmitButton";
import firebase from "firebase";


class SignInPage extends Component{

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
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
            
            
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            // ...
        });
    }
    
    render() {
        
        return (
            
            <form action="" onSubmit={this.signIn}>
                <h2>Sign In</h2>
                <label htmlFor="email">Enter email</label>
                <input type="text" id="email" onChange={this.handleChange} value={this.state.email} required />
                <label htmlFor="password">Enter password</label>
                <input type="text" id="password" onChange={this.handleChange} value={this.state.password} required/>
                <SubmitButton label="Sign in"/>
            </form>
        )
    }
    
}



export default SignInPage;