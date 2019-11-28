import React, { Component } from 'react';
import './App.css';
import firebase from "./firebase";
import ChatPage from "./ChatPage";
import SignInPage from "./SignInPage";
import SignUp from './SignUp';
import GuestSignUp from './GuestSignIn';




class App extends Component {
  constructor() {
    super();
    this.state = {
      signedIn: false,
      userId: null,
      userEmail: null,
      name: null,
      language: null,
      verified: null
    }
  }

  

  componentDidMount() {
    
    firebase.auth().onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        
        this.setState({
          signedIn: true,
          userId: user.uid,
          name: user.displayName,
          email: user.email,
          language: ""
        })
        

        // In case the user sign in as guest
      } else if (user && user.email === null) {
        const guestNumberData = firebase.database().ref("/generalConfig");
        
        guestNumberData.once("value").then((snapshot) => {
          this.setState({
            signedIn: true,
            userId: user.uid,
            email: null,
            name: `guest${snapshot.val().guestNumber}`
          })

          guestNumberData.update({
            guestNumber: snapshot.val().guestNumber + 1
          });           
          
        });
        
      } else {
        // console.log(user);
        this.setState({
          signedIn: false,
          userId: null
        })
      }
    })
  }

  getLanguageFromSignUp = (language) => {
    this.setState({
      language: language
    })
  }

  render() {

    return (
      
      <div>
        {this.state.signedIn
          ?
          
          <ChatPage userId={this.state.userId} name={this.state.name} language={this.state.language}/>
          :
          <div>
            <GuestSignUp/>
            <SignUp function={this.getLanguageFromSignUp} />
            <SignInPage />
          </div>
         }
        
        
      </div>
    )
  }
}

export default App;
