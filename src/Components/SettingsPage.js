import React, { Component } from "react";
import LanguageSelector from "./LanguageSelector";
import SubmitButton from "./SubmitButton";
import firebase from "firebase";

class SettingsPage extends Component {

    constructor() {
        super();
        this.state = {
            language: "en",
            currentLanguage: "English"
        }
    }

    componentDidMount() {
        const languages = this.props.languages;

        const userUid = this.props.userUid;
        // Getting the user current language when the settings button is clicked

        firebase.database().ref(`${userUid}/settings/language`).once("value").then((snapshot) => {

            const currentLanguage = languages.filter((languageObject) => {
                
                return languageObject.code === snapshot.val()
            })
            
            this.setState({
                currentLanguage: currentLanguage[0].name
            })
        })
    }

    

    // Event to handle change on the select selection element

    languagesSelection = (event) => {
        this.setState({
            language: event.target.value
            
        })
       
    }

    // Method to apply changes to firebase database when the user saves the change

    applyChange = () => {
        firebase.database().ref(`${this.props.userUid}/settings/`).update({
            language: this.state.language
        });
    }

    // Rendering the component

    render() {
        return (
            <div className="settingsPage">
                <button className="close" onClick={this.props.closeSettings}><i className="fas fa-times-circle" aria-label="Close settings"></i></button>
                <h2>Settings</h2>
                <p>Current language is set to: <span>{ this.state.currentLanguage}</span></p>
                <p>Changing the language won't translate your old messages, only new messages will be recieved in the new selected language.</p>
                <form action="" onSubmit={this.applyChange}>
                    <LanguageSelector function={this.languagesSelection} languages={this.props.languages} />
                    <SubmitButton label="Apply change"/>
                </form>
            </div>
        )
        
    }
}

export default SettingsPage