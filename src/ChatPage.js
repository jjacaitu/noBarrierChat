import React, { Component } from "react";

import firebase from "./firebase";
import ChatForm from "./ChatForm";
import RecentMessages from "./RecentMessages";
import FriendSelector from "./FriendSelector";
import AddFriendButton from "./AddFriendButton";
import AlertMessage from "./AlertMessage";



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
            userImg: null,
            deleteConfirmation:false,
            messageToDelete: null
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
                    
                    openedChats.push({ uid: chat, name: openedChatsData[chat].nickname, });
                }

                

                // Rendering information on page
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
        
        const dbRef = firebase.database().ref(`${this.state.userId}/chats/${uid}/messages`);
        dbRef.off("value", handle);
        dbRef.on("value", handle);

    }

    deleteConversation = () => {
        const chattingWithUid = this.state.friends[this.state.messageToDelete].uid;
        
        // Delete thecnversation from both users

        firebase.database().ref(`${this.state.userId}/chats/${chattingWithUid}`).remove().then(()=>{
            
            
        });

        firebase.database().ref(`${chattingWithUid}/chats/${this.state.userId}`).remove().then(()=>{
            
        });

        // We make sure that f the user deleted the conversation that was selected then the "no chat has been selected message shows" by changing the state.

        if (chattingWithUid === this.state.chattingWithUid) {
            this.setState({
                chattingWithName: null,
                chattingWithUid: null,
                deleteConfirmation: false
            })

        }else{
            this.setState({
                deleteConfirmation: false
            })
        }
    }
    
        
    render() {
        return (
            <div className="wrapper">
                
                
                <div className="chatPageContainer">
                    {
                        this.state.deleteConfirmation
                            ?
                            
                            <AlertMessage title="Please confirm before proceeding!" functionToClose={()=>{this.setState({
                                deleteConfirmation:false
                            })
                            }} message="Are you sure you want to delete your conversation?" originalLabel={<i className="fas fa-times-circle iconButton deny" aria-label="Deny delete option"></i>} aditionalButton={true} aditionalFunction={this.deleteConversation} aditionalLabel={<i className="fas fa-check-circle accept" aria-label="Confirm delete option"></i>} />
                            
                            :

                            ""
                    
                    }           
                    
                    
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
                                    <FriendSelector key={friend.uid} uid={friend.uid} name={friend.name} imgUrl={friend.imgUrl ? friend.imgUrl : null} userNickname={this.state.userNickname} function={this.select} index={index} deleteFunction={(e)=>{this.setState({
                                        messageToDelete:e.currentTarget.value,
                                        deleteConfirmation:true
                                    })}}/>
                                )
                            })}

                        </ul>
                    </div>
                    <div className="messagesAndTextContainer">
                        
                        <p>{`Welcome`} <span>{this.props.name}</span>{`!`}</p>
                        <p>This is <span className="logo">interpreter!</span> Text messaging without language barrier!</p>
                            
                        
                        <RecentMessages messages={this.state.messages} chattingWith={this.state.chattingWithName} userImg={this.state.userImg} />
                        <ChatForm language={this.state.language} sender={this.state.userId} reciever={this.state.chattingWithUid} nickname={this.state.userNickname} chatting={this.state.chattingWithName?true:false}/>
                    </div>

                </div>
            </div>
        )
    }
}

export default ChatPage;