import React from "react";




function FriendSelector(props) {

    const setName = function(event){
        props.function(event.currentTarget.value, event.currentTarget.id);
    }

    const deleteConversation = (event) => {
       
        props.deleteFunction(event.target.value);
    }

    return (
        <li>
            <button onClick={setName} value={props.name} id={props.uid}>
                <img src={props.imgUrl} alt={`A picture of ${props.name}`} />
                <p>{props.name}</p>
            </button>
            <button onClick={deleteConversation} value={props.index}>-</button>
            
        </li>
    )
}

export default FriendSelector;