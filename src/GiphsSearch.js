import React, { Component } from "react";
import axios from "axios";
import SubmitButton from "./SubmitButton";
import firebase from "firebase";



class GiphSearch extends Component{
    constructor() {
        super();
        this.state = {
            gifsArray: [],
            query:"",
        }
    }


    componentDidMount() {
        axios({
            
            url: "//api.giphy.com/v1/gifs/trending",
            responseType: `json`,
            method: `get`,
            params: {
                api_key: "5o3FJkFysfmiqM09a9Z3ifEWL0HqHhLB",
                
            }
        }).then((gifs) => {
            const randomNumber = Math.floor(Math.random() * 19);
            const resultsToReturn = gifs.data.data.slice(randomNumber,randomNumber + 6);
            this.setState({
                gifsArray:resultsToReturn
            })

        }).catch((e) => {
            console.log("error")
        })
    }

    search = (e) => {
        e.preventDefault();

        axios({
            url: `//api.giphy.com/v1/gifs/search`,
            responseType: `json`,
            method: `get`,
            params: {
                api_key: "5o3FJkFysfmiqM09a9Z3ifEWL0HqHhLB",
                q: this.state.query
            }
        }).then((gifs) => {
            const randomNumber = Math.floor(Math.random() * 19);
            const resultsToReturn = gifs.data.data.slice(randomNumber, randomNumber + 6);
            this.setState({
                gifsArray: resultsToReturn
            })

        }).catch((e) => {
            console.log("error")
        })
    }

    sendGif= (e) => {
        const gifUrl = e.currentTarget.value;
        const altTag = e.currentTarget.id;
    
        let dbRef = firebase.database().ref(`${this.props.sender}/chats/${this.props.reciever}/messages`);

        let message = {
            "message": gifUrl,
            "type": "sent",
            "time": Date(Date.now().toString()).split(" GMT").splice(0, 1),
            "format": "gif",
            "altTag" : altTag
        }
        dbRef.push(message);

        dbRef = firebase.database().ref(`${this.props.reciever}/chats/${this.props.sender}/messages`);

        message = {
            "message": gifUrl,
            "type": "recieved",
            "time": Date(Date.now().toString()).split(" GMT").splice(0, 1),
            "format": "gif",
            "altTag" : altTag
        }
        dbRef.push(message);

        this.props.closeGiphy();
    }


    render() {
        return (
            <div className="gifSearch">
                <form action="" onSubmit={this.search}>
                    <label htmlFor="gifSearchInput">Search in GIPHY: </label>
                    <input type="text" id="gifSearchInput" value={this.state.query} onChange={(e) => {
                        this.setState({
                            query: e.target.value
                        })
                    }}
                     />
                    <SubmitButton label="Search"/>
                    

                </form>
                <div>
                    {this.state.gifsArray.map((gif, index) => {
                        return (
                            <button key={index} className="gif" value={gif.images.downsized.url} id={gif.title} onClick={this.sendGif}>
                                <img src={gif.images.downsized.url} alt={gif.title}/>
                            </button>
                        )
                    })}

                </div>
                

            </div>
        )
    }
}

export default GiphSearch

