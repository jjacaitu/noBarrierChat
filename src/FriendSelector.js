import React from "react";
import noImage from "./noImage.png";



function FriendSelector(props) {

    const setName = function(event){
        props.function(event.currentTarget.value, event.currentTarget.id);
    }

    const deleteConversation = (event) => {
       
        props.deleteFunction(event.target.value);
    }

    return (
        <li className="friendButton">
            <button onClick={setName} value={props.name} id={props.uid}>
                {props.imgUrl
                    ?
                    <img src={props.imgUrl} alt={`A picture of ${props.name}`}/>
                    :
                <img src={noImage} alt={`The user has no picture`}/>
            } 
                <p>{props.name}</p>
            </button>
            <button className="deleteButton" onClick={deleteConversation} value={props.index}><i className="fas fa-trash-alt"></i></button>
            
        </li>
    )
}

export default FriendSelector;