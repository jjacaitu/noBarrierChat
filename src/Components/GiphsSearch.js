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

    // When the component gets mounted then make an api call to get 6 random top gifs from GIPHY

    componentDidMount() {
        axios({
            
            url: "//api.giphy.com/v1/gifs/trending",
            responseType: `json`,
            method: `get`,
            params: {
                api_key: "5o3FJkFysfmiqM09a9Z3ifEWL0HqHhLB",
                
            }
        }).then((gifs) => {
            // Get a random number between 0 and 19 because the api call return an array with 25 results and te idea is to get 6 random gifs 
            const randomNumber = Math.floor(Math.random() * 19);
            const resultsToReturn = gifs.data.data.slice(randomNumber, randomNumber + 6);
            
            // set state and re render to show those gifs

            this.setState({
                gifsArray:resultsToReturn
            })

        })
    }

    // Method to search for gifs based on words. It will get the input of the user and make an api call to get 6 gifs related to that word

    search = (e) => {
        e.preventDefault();

        // making api call

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

        })
    }

    // Method to store the gif in the database in the conversation of both users

    sendGif= (e) => {
        const gifUrl = e.currentTarget.value;
        const altTag = e.currentTarget.id;
    
        // Getting the reference for the sender

        let dbRef = firebase.database().ref(`${this.props.sender}/chats/${this.props.reciever}/messages`);

        let message = {
            "message": gifUrl,
            "type": "sent",
            "time": Date(Date.now().toString()).split(" GMT").splice(0, 1),
            "format": "gif",
            "altTag" : altTag
        }

        // Updating the database

        dbRef.push(message);

        // Getting the reference for the reciever

        dbRef = firebase.database().ref(`${this.props.reciever}/chats/${this.props.sender}/messages`);

        message = {
            "message": gifUrl,
            "type": "recieved",
            "time": Date(Date.now().toString()).split(" GMT").splice(0, 1),
            "format": "gif",
            "altTag" : altTag
        }

        // Updating the database

        dbRef.push(message);

        // Run the function to close the container that has the gifs that were found

        this.props.closeGiphy();
    }


    // Render the page

    render() {
        return (
            <div className="gifSearch">
                <form action="" onSubmit={this.search}>
                    <label htmlFor="gifSearchInput">Search in GIPHY: </label>
                    <input type="text" id="gifSearchInput" value={this.state.query} onChange={(e) => {this.setState({query: e.target.value})}}/>
                    <SubmitButton label="Search"/>
                </form>
                <div>

                    {/* Create a button for every gif found */}

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

