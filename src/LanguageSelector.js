import React from "react";

import axios from "axios";


function LanguageSelector(props){

    return (
        <div>
            <label htmlFor="language">Select your language:  </label>
            <select name="language" id="language" onChange={props.function} required>
                {props.languages.map((language) => {
                    return <option id={language.name} value={language.code} selected={language.name === "English" ? "selected" : ""}>{language.name} </option>
                })}
            </select>
        </div>
    )

}

export default LanguageSelector;