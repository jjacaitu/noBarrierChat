import React from "react";
import noImage from "./noImage.png";



function FriendSelector(props) {

    // Function passed by props to get the selected conversation and then display it on the page

    const setName = function(event){
        props.function(event.currentTarget.value, event.currentTarget.id);
    }


    // Rendering the component

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
            <button className="deleteButton" onClick={props.deleteFunction} value={props.index}><i className="fas fa-trash-alt"></i></button>
            
        </li>
    )
}

export default FriendSelector;