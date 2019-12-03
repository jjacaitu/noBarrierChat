import React, { Component } from "react";
import firebase from "firebase";
import LanguageSelector from "./LanguageSelector";
import SubmitButton from "./SubmitButton";

class GoogleSignIn extends Component {
    constructor() {
        super();
        this.state = {
            nickname: "",
            language: "en",

        }
    }

    setupNicknameAndLanguage = (event) => {
        event.preventDefault();
        
        const functionToCallAlert = this.props.googleNicknameAlertFunction;
        const nickname = this.state.nickname;
        const nicknameFirstFiveLetters = nickname.toLowerCase().substring(0, 5);
        
        const language = this.state.language;

        const user = firebase.auth().currentUser;

        const updateNicknameFunction = this.props.updateNickname;


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

                    if (existingNicknames.includes(nickname)) {

                        functionToCallAlert();

                    } else {

                        
                        const data = {

                            "chats": false,
                            "settings": {
                                "language": language,
                                "nickname": nickname,
                                "email": user.email,
                            }

                        }

                        firebase.database().ref(`${user.uid}`).update(data);

                        user.updateProfile({
                            displayName: nickname,
                        })

                        

                        this.setState({
                            nickname:nickname
                        },() => {
                                updateNicknameFunction(nickname);
                                setTimeout(() => {
                                    window.location.reload();
                                }, 1000);
                             
                            }
                        )
                    }
                })
            })
        }
    }

    render() {
        return (
            <div className="googleSignIn">
                <h3>Google Sign In</h3>
                <form action="" onSubmit={this.setupNicknameAndLanguage}>
                    <p>Please fill the following form in order to continue:</p>
                    <label htmlFor="nickname">Enter a nickname: </label>
                    <input maxLength={10} type="text" id="nickname" value={this.state.nickname} onChange={(e)=>{this.setState({nickname:e.target.value})}} required />
                    <LanguageSelector languages={this.props.languages} function={(e) => { this.setState({ language: e.target.value }) }} />
                    <SubmitButton label="Save settings"/>
                </form>
            </div>
        )
    }
}

export default GoogleSignIn;