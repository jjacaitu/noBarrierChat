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
        
        translate(this.state.text,this.props.sender,this.props.reciever,this.props.nickname);

        this.setState({
            text:""
        })
    }

    handleChange = (event) => {
        this.setState({
            text: event.target.value
        });
    }


    render() {
        return (
            <div className="chatFormDiv">
                <GiphyComponent sender={this.props.sender} reciever={this.props.reciever} chatting={this.props.chatting} />
                <form className="chatForm" action="" onSubmit={this.handleSubmit}>
                    <textarea name="" id="" cols="30" rows="10" value={this.state.text} onChange={this.handleChange} disabled={this.props.reciever ? false : true} placeholder={this.props.reciever ? "Enter text to send" : "Please first select a chat"} required></textarea>
                    <SubmitButton label="Send"/>
                </form>
                

            </div>

        )
        
    }
}

export default ChatForm;