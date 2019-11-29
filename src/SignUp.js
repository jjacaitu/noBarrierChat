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
        console.log(event.target.value);
        this.setState({
            language: event.target.value,
            
        })
    }

    

    createUser = (event) => {
        event.preventDefault();

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((result) => {

            // make sure the user can not start with guest if using nickname to store chats

            const data = {
                
                    "chats": false,
                    "settings": {
                        "language": this.state.language,
                        "nickname": this.state.name,
                        "email": this.state.email,
                    }
                
            }

            console.log(data,"here");
            console.log("user",result.user.uid);

            firebase.database().ref(`${result.user.uid}`).update(data);

            result.user.sendEmailVerification().then(function () {
                // Email sent.
                
            }).catch(function (error) {
                // An error happened.
                console.log(error);
            });

            

            
            
            // result.user.language = this.state.language;

            result.user.updateProfile({
                displayName: this.state.name,
                language:this.state.language
            })

            // firebase.database().ref(`user.user.uid/`).update(data);
            


        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            // ...
        });
    }

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
                <input type="password" id="password" onChange={this.handleChange} value={this.state.password} required />
                <LanguageSelector function={this.getLanguage} />
                <SubmitButton label="Sign up" />
            </form>
        )
    };

}


export default SignUp;