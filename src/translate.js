import axios from "axios";
import firebase from "firebase";

const translatorApiKey = "trnsl.1.1.20191120T174117Z.30abf07a083257c3.606e1a38fc565562205063e541cb970657ab2600";

function translate(text,sender,reciever,nickname) {

    console.log("starts");
    console.log(text);
    console.log(sender);
    console.log(reciever);
    console.log(nickname);
    console.log("ends");

    firebase.database().ref(`${reciever}/settings/language`).once("value").then((snapshot)=>{
        
        

        const language = snapshot.val();
        axios({
            method:"get",
            url: "https://translate.yandex.net/api/v1.5/tr.json/translate",
            responseType: "json",
            params: {
                key: translatorApiKey,
                text: text,
                format: "plain",
                lang: language,
            }
        }).then((data) => {
            const translation = data.data.text.join("");
            const dbRef = firebase.database().ref(`${reciever}/chats/${sender}/messages`);
            console.log(`${reciever}/chats/${sender}/messages`)
            dbRef.push(translation);

            firebase.database().ref(`${reciever}/chats/${sender}/nickname`).set(nickname);
        }).catch((error)=>{
            console.log(error);
        })

    })

}

export default translate;