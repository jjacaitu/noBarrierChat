import React, { Component } from 'react';
import './App.css';
import firebase from "./firebase";
import ChatPage from "./ChatPage";
import SignInPage from "./SignInPage";
import SignUp from './SignUp';
import GuestSignUp from './GuestSignIn';
import AlertMessage from "./AlertMessage";
import Header from "./Header";
import Footer from "./Footer";




class App extends Component {
  constructor() {
    super();
    this.state = {
      signedIn: false,
      userId: null,
      userEmail: null,
      name: null,
      language: null,
      verified: null,
      alert: false,
      optionSelected: "signIn",
      friendsVisible: false
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
        
      }else if(user && !user.emailVerified && user.email){
        this.setState({
          alert: true
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

  closeAlert = () => {
    this.setState({
      alert: false
    })

    console.log(this.state)
  }

  selectOption = (event) => {
    this.setState({
      optionSelected:event.target.value
    })
  }

  seeFriendList = () => {
    console.log(this.state.friendsVisible)
    this.state.friendsVisible
      ?
      this.setState({
        friendsVisible: false
      })
      :
      this.setState({
        friendsVisible: true
      })
  }

  render() {

    return (
      
      <div>
        <Header signedIn={this.state.signedIn} friendListAppear={this.seeFriendList} />
        <main>
          {this.state.signedIn
            ?
            <ChatPage userId={this.state.userId} name={this.state.name} language={this.state.language} friendsVisible={this.state.friendsVisible}/>
            :
            <div className="options">
              {this.state.alert
                ?
                <AlertMessage functionToClose={this.closeAlert} message="Please verify your email and refresh after!" resend={true} />
                :
                ""}
              <div className="optionsButtons">
                <button onClick={this.selectOption} value="signIn" className={this.state.optionSelected === "signIn" ? "" : "inactive"}>Sign In</button>
                <button onClick={this.selectOption} value="signUp" className={this.state.optionSelected === "signUp" ? "" : "inactive"}>Sign Up</button>
                <button onClick={this.selectOption} value="guestSignIn" className={this.state.optionSelected === "guestSignIn" ? "" : "inactive"}>Guest Sign In</button>
              </div>
              {this.state.optionSelected === "signIn"
                ?
                <SignInPage />
                :
                this.state.optionSelected === "signUp"
                  ?
                  <SignUp function={this.getLanguageFromSignUp} />
                  :
                  <GuestSignUp />

            }
              
              
              
            </div>
          }
        </main>
        <Footer/>
        
        
      </div>
    )
  }
}

export default App;
