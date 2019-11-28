import React from "react";


function RecentMessages(props) {
    return (
        <div className="recentMessages">
            <ul>
                {   
                    props.messages.map((message, index) => {
                        return (
                            <li key={index}>{message}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default RecentMessages;