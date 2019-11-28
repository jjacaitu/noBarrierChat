import React, { Component } from "react";
import SubmitButton from "./SubmitButton";
import firebase from "./firebase";

class AddFriendButton extends Component {
    constructor() {
        super();
        this.state = {
            nickname:null,
            openedChats:[]
        }
    }

    componentDidMount() {

        // Getting the reference of all the opened chats of the user
            const friendsReference = firebase.database().ref(`${this.props.userId}/chats`)

        // Seting up listener in order to get any changes on the database of incoming conversations.

        

            friendsReference.on("value", (snapshot) => {
                const openedChats = [];
                const openedChatsData = snapshot.val();
                
                for (let chat in openedChatsData) {
               
                    openedChats.push(openedChatsData[chat].nickname);
                }
                
                this.setState({
                    openedChats:openedChats
                })

            })

    }
    
    addFriend = (event) => {
        event.preventDefault()
        const userList = [];
        const usersId = []

        // Checking if theres no opened conversations opened with that user and that the user isnt trying to start a conversation with itself
        
        if(this.state.openedChats.includes(this.state.nickname) || (this.state.nickname === this.props.userNickname)){
            console.log("You already have an opened chat with", this.state.nickname);
        }else{

            const databaseRef = firebase.database().ref();
        
            databaseRef.once("value").then((snapshot) => {
                
                const databaseData = snapshot.val()
                const arrayPromises = []
                for (let user in databaseData) {
                    if (user !== "generalConfig") {
                        
                        usersId.push(user);
                        const userRef = firebase.database().ref(`${user}/settings/nickname`);
                        arrayPromises.push(userRef.once("value"));
                        
                    }
                }
        
                // Using promise.all to make sure to get all values before doing anything
    
                Promise.all(arrayPromises).then((values) => {
                    values.filter((value, index) => {
                        if (value.val() === this.state.nickname) {
                            console.log("found");

                            // If found check th other user doesnt have more than 5 conversations

                            firebase.database().ref(`${usersId[index]}/chats`).once("value").then((snapshot)=>{
                                const conversationArray = [];
                                const conversationData = snapshot.val();
                                for(let conversation in conversationData){
                                    conversationArray.push(conversation);
                                }
                                if(conversationArray.length <=5){
                                    firebase.database().ref(`${this.props.userId}/chats`).update({
                                        [usersId[index]]: {
                                            nickname: this.state.nickname,
                                            messages:""
                                        }
                                    })
            
                                    firebase.database().ref(`${usersId[index]}/chats`).update({
                                        [this.props.userId]: {
                                            nickname: this.props.userNickname,
                                            messages: ""
                                        }
                                    })

                                }else{
                                    console.log("friends has already 5 conversations going");
                                }
                            })
                            
                        }
                    })
                })
        
                
            })
        }
    }
    
    openOption = () => {
        console.log("open");
    }
    
    handleChange = (event) => {
        this.setState({
            nickname: event.target.value
        })
    }

    


    render() {
        return (
            <div>
                <button onClick={this.openOption}>+</button>
                <form action="" onSubmit={this.addFriend}>
                    <label htmlFor="nickname">Enter nickname of friend:</label>
                    <input type="text" id="nickname" value={this.state.nickname} onChange={this.handleChange} />
                    <SubmitButton label="Add" />
                </form>
            </div>
        )
    }
}





export default AddFriendButton