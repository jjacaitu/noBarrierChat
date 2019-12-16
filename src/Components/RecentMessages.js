import React from "react";
import noImage from "../noImage.png"


function RecentMessages(props) {
    return (
        <div id="recentMessages" className="recentMessagesDiv">
            <div className="chatHeader">

                {/* If the user has an openned chat show the placeholder image */}

                {props.chattingWith && <img src={noImage} alt="Placeholder image of a user" />}

                {/* If the user is chatting with somone or has an opened conversation then show the other users name if not then show a message telling the user to select a conversation */}
                    
                {props.chattingWith ? <h3>{props.chattingWith}</h3> : <h3>Please select a conversation from the list on the left!</h3>}

            </div>
            <ul className="recentMessages">

                {/* Map through all the messages and render them on the page */}

                {   
                    props.messages.map((message, index) => {
                        return (
                            <li key={index} className={message.type} >
                                <p className="time">{message.time}</p>
                                {message.format === "text"
                                    ?
                                    <p className="message">{message.message}</p>
                                    :
                                    <img src={message.message} alt={message.altTag}/>
                                }
                            </li>
                        )
                    })
                }
                
            </ul>
        </div>
    )
}

export default RecentMessages;