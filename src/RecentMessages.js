import React from "react";


function RecentMessages(props) {
    return (
        <div className="recentMessagesDiv">
            <ul className="recentMessages">
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