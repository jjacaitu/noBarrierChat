import React from "react";
import noImage from "./noImage.png"


function RecentMessages(props) {
    return (
        <div className="recentMessagesDiv">
            
            <ul className="recentMessages">
                <div className="chatHeader">
                    <img src={noImage} alt=""/>
                    <h2>{props.chattingWith}</h2>
                </div>
                {   
                    props.messages.map((message, index) => {
                        return (
                            <li key={index} className={message.type} >
                                <p className="time">{message.time}</p>
                                <p>{message.message}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default RecentMessages;