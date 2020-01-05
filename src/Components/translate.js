import axios from "axios";
import firebase from "firebase";

// Function that takes a text, translates it to the selected language and dtore the text on the databse of the reciever user

function translate(text,sender,reciever,nickname) {

    firebase.database().ref(`${reciever}/settings/language`).once("value").then((snapshot)=>{
        
        const language = snapshot.val();       

        axios({
            method:"get",
            url: "https://translate.yandex.net/api/v1.5/tr.json/translate",
            responseType: "json",
            params: {
                key: process.env.REACT_APP_API_KEY,
                text: text,
                format: "plain",
                lang: language,
            }
        }).then((data) => {
            const translation = data.data.text.join("");
            const dbRef = firebase.database().ref(`${reciever}/chats/${sender}/messages`);
            const translatedMessage = {
                "message": translation,
                "type": "recieved",
                "time": Date(Date.now().toString()).split(" GMT").splice(0, 1),
                "format" : "text"
            }
            dbRef.push(translatedMessage);
            

            firebase.database().ref(`${reciever}/chats/${sender}/nickname`).set(nickname);

        })

    })

}

export default translate;