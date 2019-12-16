import React from "react";



function LanguageSelector(props){

    return (
        <div className="language">
            <label htmlFor="language">Select your language:  </label>
            <select name="language" id="language" onChange={props.function} defaultValue="en" required>
                {props.languages.map((language, index) => {
                    return <option key={index} id={language.name} value={language.code} >{language.name} </option>
                })}
            </select>
        </div>
    )

}

export default LanguageSelector;