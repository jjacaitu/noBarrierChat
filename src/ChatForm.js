import React, { Component } from "react";
import SubmitButton from "./SubmitButton";
import firebase from "firebase";
import translate from "./translate"
import GiphyComponent from "./GiphyComponent";


class ChatForm extends Component {
    constructor() {
        super();
        this.state = {
            text:""
        }
    }
    
    // Method that will handle the onSubmit by storing the message in the database and making the api call usign the translate function which will then store the transalted message in the datbase of the chat for the other user in the selected language.

    handleSubmit = (event) => {
        event.preventDefault();

        const dbRef = firebase.database().ref(`${this.props.sender}/chats/${this.props.reciever}/messages`);

        const message = {
            "message": this.state.text,
            "type": "sent",
            "time": Date(Date.now().toString()).split(" GMT").splice(0, 1),
            "format" : "text"
        }
        dbRef.push(message);
        
        // Calling the translate function

        translate(this.state.text,this.props.sender,this.props.reciever,this.props.nickname);

        this.setState({
            text:""
        })
    }


    // Rendering the component

    render() {
        return (
            <div className="chatFormDiv">

                {/* Rendering the GiphyComponent component which lets the user send GIFS */}

                <GiphyComponent sender={this.props.sender} reciever={this.props.reciever} chatting={this.props.chatting} />

                {/* Form for the text messages that the user inputs */}

                <form className="chatForm" action="" onSubmit={this.handleSubmit}>
                    <textarea name="" id="" cols="30" rows="10" value={this.state.text} onChange={(e)=>{this.setState({text:e.target.value})}} disabled={this.props.reciever ? false : true} placeholder={this.props.reciever ? "Enter text to send" : "Please first select a chat"} required></textarea>
                    <SubmitButton disabled={this.props.reciever ? false : true} label="Send"/>
                </form>
                

            </div>

        )
        
    }
}

export default ChatForm;