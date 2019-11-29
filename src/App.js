import React, { Component } from 'react';
import './App.css';
import firebase from "./firebase";
import axios from "axios";
import ChatPage from "./ChatPage";
import SignInPage from "./SignInPage";
import SignUp from './SignUp';
import GuestSignUp from './GuestSignIn';
import AlertMessage from "./AlertMessage";
import Header from "./Header";
import Footer from "./Footer";
import SettingsPage from "./SettingsPage";




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
      friendsVisible: false,
      languagesList: ["english"],
      settingsStatus: false
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

    // Making a call to the API to get all the available languages

    axios({
      method: "get",
      url: "https://translate.yandex.net/api/v1.5/tr.json/getLangs",
      responseType: "json",
      params: {
        key: "trnsl.1.1.20191120T174117Z.30abf07a083257c3.606e1a38fc565562205063e541cb970657ab2600",
        ui: "en"
      }
    }).then((data) => {
      
      const languageObject = data.data.langs;
      let languagesList = [];
    

      // Making an array that will store in objecs both the language code and language name

      for (let lang in languageObject) {
        languagesList.push({
          name: languageObject[lang],
          code: lang
        })

      }

      // We sort the lanugauges to order them in alphabetical order
      

      languagesList = languagesList.sort(function (a, b) {
        return ((a.name < b.name) ? -1 : ((a.name === b.name) ? 0 : 1));
      });

      // Storing the list of available lenguages in state and rerendering to show the options to the user
      this.setState({
        languagesList: languagesList,

      })
    })
    
  }

  getLanguage = (language) => {
    this.setState({
      language: language
    })
  }

  closeAlert = () => {
    this.setState({
      alert: false
    })

    
  }

  // selectOption = (event) => {
  //   this.setState({
  //     optionSelected:event.target.value
  //   })
  // }

  // settings = () => {
    
    
  //     this.setState({
  //       settingsStatus: !this.state.settingsStatus
  //     })
      
      
  // }

  render() {

    return (
      
      <div>
        <Header signedIn={this.state.signedIn} onClickFunction={() => {
          this.setState({ settingsStatus: !this.state.settingsStatus })}} />
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
                ""
              }
              <div className="optionsButtons">
                <button onClick={(e) => this.setState({optionSelected: e.target.value})} value="signIn" className={this.state.optionSelected === "signIn" ? "" : "inactive"}>Sign In</button>
                <button onClick={(e) => this.setState({ optionSelected: e.target.value })} value="signUp" className={this.state.optionSelected === "signUp" ? "" : "inactive"}>Sign Up</button>
                <button onClick={(e) => this.setState({ optionSelected: e.target.value })} value="guestSignIn" className={this.state.optionSelected === "guestSignIn" ? "" : "inactive"}>Guest Sign In</button>
              </div>

              {this.state.optionSelected === "signIn"
                ?
                <SignInPage getLanguage={this.getLanguage} />
                :
                this.state.optionSelected === "signUp"
                  ?
                  <SignUp function={this.getLanguage} languages={this.state.languagesList} />
                  :
                  <GuestSignUp languages={this.state.languagesList} />

              }

            </div>
          }
                
          {this.state.settingsStatus && this.state.signedIn
            ?
            <SettingsPage userUid={this.state.userId} languages={this.state.languagesList} currentLanguage={this.state.language}/>
            :
            ""
          }
        </main>

        <Footer/>
      
      </div>
    )
  }
}

export default App;
