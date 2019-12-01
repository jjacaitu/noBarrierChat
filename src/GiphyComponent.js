import React, { Component } from "react";
import GiphSearch from "./GiphsSearch"



class GiphyComponent extends Component {

    constructor() {
        super();
        this.state = {
            giphyOpen: false,
            
        }
    }

    render() {

        return (
            <div className="giphyDiv">
                <button disabled={this.props.chatting?false:true} onClick={() => { this.setState({ giphyOpen: !this.state.giphyOpen }) }}>GIPHY <i className="fas fa-image"></i></button>
                {this.state.giphyOpen
                    ?
                    <GiphSearch sender={this.props.sender} reciever={this.props.reciever}/>
                    :
                    ""
                    
                }
            </div>
        )
        
    }
}

export default GiphyComponent