import React, { Component } from "react";
import SubmitButton from "./SubmitButton";
import firebase from "firebase";
import LanguageSelector from "./LanguageSelector";
import translate from "./translate";


class GuestSignUp extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            name: "",
            language: "en",
            userId: "",
            isLoading: false
        }
    }

    signInGuest = (event) => {
        event.preventDefault();

        // Starts loading screen

        this.setState({isLoading:true})

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

                        "chats": {
                            "INTERPRETER": {
                                "nickname": "Interpreter",
                                "messages": "",
                            }
                        },
                        "settings": {
                            "language": this.state.language,
                            "nickname": `guest${value.val().guestNumber}`,
                            "email": null,
                            "isGuest": true
                        }

                    }

                    // Updating the database

                    firebase.database().ref(`${userId}`).update(data).then(() => {
                        setTimeout(() => {
                            translate("Hi there!","INTERPRETER",userId,"Interpreter")
                        }, 2000);

                        setTimeout(() => {
                            translate("Welcome! Glad you are here!", "INTERPRETER", userId, "Interpreter")
                        }, 4000);

                        setTimeout(() => {
                            const message = {
                                "message": "https://media3.giphy.com/media/vFKqnCdLPNOKc/giphy.gif?cid=d6364ed3d367323520c3529aa84c5eabeb02b8c6d9206e94&rid=giphy.gif",
                                "type": "recieved",
                                "time": Date(Date.now().toString()).split(" GMT").splice(0, 1),
                                "format": "gif",
                                "altTag": "white cat hello GIF",
                            }
                            firebase.database().ref(`${userId}/chats/INTERPRETER/messages`).push(message);
                        }, 6000);

                        setTimeout(() => {
                            translate("Please add a friend using their nickname to start a conversation and enjoy chatting without worrying about language barriers", "INTERPRETER", userId, "Interpreter")
                        }, 8000);

                    });

                })
            }).then(() => {

                // Removes loading screen

                setTimeout(() => {
                    this.setState({ isLoading: false })
                }, 2000);
                
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
            <div>

                {/* Loading spinner while the anonymous user is getting access */}

                {this.state.isLoading
                    &&
                    <div className="loadingScreen">
                        <div className="lds-hourglass"></div>
                    </div>
                }
            <form className="guestSignIn" action="" onSubmit={this.signInGuest}>
                
                <h2>Sign up as Guest</h2>
                <p>Signing in as a guest means you won't be able to select your nickname and will only be able to  get access to your conversations while logged in. If you refresh the page you will automatically log out.</p>
                <p>When you log In you will recieve your guest name, use this to connect with other users. </p>
                <LanguageSelector languages={this.props.languages} function={this.getLanguage} />
                <SubmitButton label="Sign in" />
            </form>

            </div>
        )
    }

}


export default GuestSignUp;