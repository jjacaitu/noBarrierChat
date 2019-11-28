import React, { Component } from "react";

import axios from "axios";









class LanguageSelector extends Component {

    constructor() {
        super();
        this.state = {
            languages: [],
            
        }
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "https://translate.yandex.net/api/v1.5/tr.json/getLangs",
            responseType: "json",
            params: {
                key: "trnsl.1.1.20191120T174117Z.30abf07a083257c3.606e1a38fc565562205063e541cb970657ab2600",
                ui: "en"
                // text: text,
                // format: "plain",
                // lang: language,
            }
        }).then((data) => {
            // const translation = data.data.text.join("");
            // const dbRef = firebase.database().ref(`Carlos/${user}`);
            // dbRef.push(translation);
            
            const languageObject = data.data.langs;
            let languages = [];
            let codeLangs = [];
            for (let lang in languageObject) {
                languages.push({
                    name: languageObject[lang],
                    code: lang
                })
                
            }
            languages = languages.sort();
            codeLangs = codeLangs.sort();

            languages = languages.sort(function (a, b) {
                return ((a.name < b.name) ? -1 : ((a.name == b.name) ? 0 : 1));
            });
            this.setState({
                languages: languages,
                
            })
        })
    }


    render() {
        return (
            <div>

            <label htmlFor="language">Select your language</label>
                <select name="language" id="language" onChange={this.props.function} required>
                {this.state.languages.map((language) => {
                    return <option id={language.name} value={language.code}>{language.name}</option>
                })}
            </select>
            </div>
        )
        
    }
}

export default LanguageSelector;