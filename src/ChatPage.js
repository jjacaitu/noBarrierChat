import React, { Component } from "react";

import firebase from "./firebase";
import ChatForm from "./ChatForm";
import RecentMessages from "./RecentMessages";
import FriendSelector from "./FriendSelector";
import AddFriendButton from "./AddFriendButton";



class ChatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.userId,
            userNickname: props.name,
            userEmail: null,
            chattingWithName: null,
            chattingWithUid:null,
            languageToTransalte: null,
            friends: [],
            messages: [],
            language: "",
            userImg: null
        }
    }

  

    componentDidMount() {
        
        if (this.state.chattingWithUid !== null) {

            const languageReference = firebase.database().ref(`${this.state.chattingWithUid}/settings`);
            languageReference.once("value").then((result) => {
                this.setState({
                    language: result.val().language
                })
            })
        }

        // Getting the reference of all the opened chats of the user
            const friendsReference = firebase.database().ref(`${this.state.userId}/chats`)

        // Seting up listener in order to get any changes on the database of incoming conversations.

            friendsReference.on("value", (snapshot) => {
                
                const openedChatsData = snapshot.val();
                const openedChats = [];
                
                for (let chat in openedChatsData) {
                    console.log(openedChatsData[chat])
                    openedChats.push({ uid: chat, name: openedChatsData[chat].nickname, });
                }

                

                // Rendering informaion on page
                this.setState({
                    friends: openedChats
                })

            })

        // }

    }

    
    
    // Getting the messages between the user and the selected other user.
    select = (name,uid) => {

        const handle = snapshot => {
            
            const messages = [];
            const messagesData = snapshot.val();
            if(messagesData != null){
                if (!messagesData.length) {
                    for (let message in messagesData) {
                    
                        messages.push(messagesData[message]);
                    } 
                } else {
                    messages.push(messagesData);
                }

                console.log(messages);

            }
            

            this.setState({
                userId: this.props.userId,
                userEmail: this.props.userEmail,
                messages: messages,
                chattingWithName: name,
                chattingWithUid: uid,
                language:"",
            })
        }
        console.log(`${this.state.userId}/${uid}`);
        const dbRef = firebase.database().ref(`${this.state.userId}/chats/${uid}/messages`);
        dbRef.off("value", handle);
        dbRef.on("value", handle);

    }

    deleteConversation = (indexToDelete) => {
        
        firebase.database().ref(`${this.state.userId}/chats/${this.state.friends[indexToDelete].uid}`).remove().then(()=>{
            console.log("deleted");
        });

        firebase.database().ref(`${this.state.friends[indexToDelete].uid}/chats/${this.state.userId}`).remove().then(()=>{
            console.log("deleted");
        });
    }
    
        
    render() {
        return (
            <div>
                
                
                <div className="chatPageContainer">

                    
                    
                    <div className="listOfFriends">
                        {/* Only show the add conversation(friend) button if there are less than 5 active conversations */}
                    {this.state.friends.length <= 5
                        ?
                        <AddFriendButton userId={this.state.userId} userNickname={this.state.userNickname} />
                        :
                        null
                        }
                        <ul>
                            {this.state.friends.map((friend, index) => {
                                return (
                                    <FriendSelector key={index} uid={friend.uid} name={friend.name} imgUrl={friend.imgUrl ? friend.imgUrl : null} userNickname={this.state.userNickname} function={this.select} index={index} deleteFunction={this.deleteConversation}/>
                                )
                            })}

                        </ul>
                    </div>
                    <div className="messagesAndTextContainer">
                        <h2>{`Hi ${this.props.name}! Start chatting without worrying about language barrier! `}</h2>
                        <RecentMessages messages={this.state.messages} chattingWith={this.state.chattingWithName} userImg={this.state.userImg} />
                        <ChatForm  language={this.state.language} sender={this.state.userId} reciever={this.state.chattingWithUid} nickname={this.state.userNickname}/>
                    </div>

                </div>
            </div>
        )
    }
}

export default ChatPage;