import React, { Component } from "react";
import SubmitButton from "./SubmitButton";
import firebase from "./firebase";
import AlertMessage from "./AlertMessage";
import { isGenericTypeAnnotation } from "@babel/types";

class AddFriendButton extends Component {
    constructor() {
        super();
        this.state = {
            nickname:null,
            openedChats: [],
            error: false,
            errorMessage:""
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
            
            
            this.setState({
                errorMessage: `You already have an opened chat with ${this.state.nickname}`,
                error: true
            });
            
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
                    let found = false;
                    values.forEach((value, index) => {
                        
                        if (value.val() === this.state.nickname) {
                            found = true;
                            
                            

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
                                    this.setState({
                                        errorMessage: "The user you are trying to reach has already 5 conversations opened.",
                                        error: true
                                    });
                                }
                            })
                            
                        } else if (index === (values.length - 1) && !found) {
                           console.log(found)
                            this.setState({
                                errorMessage: `${this.state.nickname} doesn't have an account!`,
                                error: true
                            });
                        }
                    })

                    
                })
        
                
            })
        }
    }
    
    
    
    handleChange = (event) => {
        this.setState({
            nickname: event.target.value
        })
    }

    closeAlert = () => {
        this.setState({
            error:false
        })
    }

    


    render() {
        return (
            <div>
                {this.state.error
                    ?
                    <AlertMessage message={this.state.errorMessage} functionToClose={this.closeAlert} resend={false}/>
                    :
                    ""
                }
                
                <form className="addFriendBar" action="" onSubmit={this.addFriend}>
                    <label htmlFor="nickname">Enter nickname of a friend to start a conversation:</label>
                    <input type="text" id="nickname" placeholder="Enter nickname" value={this.state.nickname} onChange={this.handleChange} required/>
                    <SubmitButton label="Add" />
                </form>
            </div>
        )
    }
}





export default AddFriendButton