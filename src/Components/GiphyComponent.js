import React, { Component } from "react";
import GiphSearch from "./GiphsSearch"



class GiphyComponent extends Component {

    constructor() {
        super();
        this.state = {
            giphyOpen: false,
            
        }
    }

    // method to make the giphSearch appear and desappear

    toggleGiphySearch = () => {
        this.setState({
            giphyOpen: !this.state.giphyOpen
        })
    }


    render() {

        return (
            <div className="giphyDiv">
                <button disabled={this.props.chatting ? false : true} onClick={this.toggleGiphySearch}>Add Gif <i className="fas fa-image" aria-hidden={true}></i></button>
                
                {/* If the giphyOpen state is true (if the user has opened the gif container) and the user is chatting with someone then render the GiphSearch component */}

                {this.state.giphyOpen && this.props.chatting
                    ?
                    <GiphSearch closeGiphy={this.toggleGiphySearch} sender={this.props.sender} reciever={this.props.reciever}/>
                    :
                    ""
                    
                }
            </div>
        )
        
    }
}

export default GiphyComponent