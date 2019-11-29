import React, { Component } from "react";
import SubmitButton from "./SubmitButton";
import firebase from "firebase";
import translate from "./translate"


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
            "time": Date(Date.now().toString()).split(" GMT").splice(0, 1)
        }
        dbRef.push(message);
        
        translate(this.state.text,this.props.sender,this.props.reciever,this.props.nickname);
    }

    handleChange = (event) => {
        this.setState({
            text: event.target.value
        });
    }


    render() {
        return (
            <form className="chatForm" action="" onSubmit={this.handleSubmit}>
                <textarea name="" id="" cols="30" rows="10" value={this.state.text} onChange={this.handleChange} disabled={this.props.reciever?false:true} required></textarea>
                <SubmitButton label="Send"/>
            </form>
        )
        
    }
}

export default ChatForm;