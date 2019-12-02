import React from "react";
import noImage from "./noImage.png"


function RecentMessages(props) {
    return (
        <div className="recentMessagesDiv">
            <div className="chatHeader">
                {props.userImg
                    ?
                    <img src={props.userImg} alt="" />
                    :
                    <img src={noImage} alt="" />
                }
                    
                {props.chattingWith
                    ?
                    
                    <h2>{props.chattingWith}</h2>
                
                :
                <h2>No chat has been selected!</h2>

                }
            </div>
            <ul className="recentMessages clearfix">
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