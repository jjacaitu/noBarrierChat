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
import Introduction from "./Introduction";
import GoogleSignIn from "./GoogleSignIn";




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
      optionSelected: "signIn",
      languagesList: ["english"],
      settingsStatus: false,
      signInAlert: false,
      verifyAlert: false,
      introduction: "",
      nicknameAlert: false,
      userIsNew: false
    }
  }

  

  componentDidMount() {
    
    firebase.auth().onAuthStateChanged((user) => {
      // console.log(user.displayName);

      if (user && this.state.userIsNew) {
        
        user.updateProfile({
          displayName: "",
        });

        this.setState({
          name: null,
          signedIn: true,
          email: user.email,
          userId: user.uid,

        })

      }else if (user && user.emailVerified) {
        
        this.setState({
          signedIn: true,
          userId: user.uid,
          name: user.displayName,
          email: user.email,
          language: ""
        })
        
      
        

      
      
      }else if (user && !user.emailVerified && user.email) {
        this.setState({
          verifyAlert: true
        })
        // In case the user sign in as guest
      } else if (user && user.isAnonymous) {
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
        
        this.setState({
          signedIn: false,
          userId: null,
          introduction: true
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

  
  render() {

    return (
      
      <React.Fragment>

        <Header nickname={this.state.name} signedIn={this.state.signedIn} onClickFunction={() => {
          this.setState({ settingsStatus: !this.state.settingsStatus })}} />

        <main>

          <div className="wrapper">

            <div className="mainDiv">

              {this.state.introduction
                ?
                <Introduction functionToClose={() => { this.setState({ introduction: false }) }} />
                :
                ""

              }

              {this.state.nicknameAlert
                ?
                <AlertMessage title="Oops! there was a problem!" functionToClose={() => { this.setState({ nicknameAlert: false }) }} message="The nickname you are trying to register is already in used or is invalid! please try a different nickname" aditionalButton={false} originalLabel="Ok" />
                :
                ""
              }

              {(this.state.userIsNew || this.state.name === null) && this.state.signedIn
                ?
                <GoogleSignIn googleNicknameAlertFunction={() => {
                  this.setState({
                    nicknameAlert: true
                  })}} userUid={this.state.userId} updateNickname={(nickname) => { this.setState({name:nickname})}} userEmail={this.state.userEmail} languages={this.state.languagesList} />
                :
                ""
              }
              
              {this.state.signedIn
                ?
                <ChatPage userId={this.state.userId} name={this.state.name} language={this.state.language} friendsVisible={this.state.friendsVisible}/>
                :
                <div className="options">

                  {this.state.verifyAlert
                    ?
                    <AlertMessage title="An email has been sent to you!" functionToClose={() => { window.location.reload() }}message="Please verify your acount and refresh after! You should have recieved an email with the steps to follow!" originalLabel="Ok" aditionalButton={false} aditionalFunction={()=>{firebase.auth().currentUser.sendEmailVerification()}} aditionallabel="Resend email" />
                    :
                    ""
                  }


                  {this.state.signInAlert
                    ?
                    <AlertMessage title="Oops! there was a problem!" functionToClose={()=>{this.setState({signInAlert:false})}} message="You have entered an incorrect email or password!" aditionalButton={false} originalLabel="Ok" />
                    :
                    ""
                  }

                  <div className="optionsButtons">
                    <button onClick={(e) => this.setState({ optionSelected: e.target.value })} value="signIn" className={this.state.optionSelected === "signIn" ? "" : "inactive"} disabled={this.state.optionSelected === "signIn" ? true : false}>Sign In</button>
                    <button onClick={(e) => this.setState({ optionSelected: e.target.value })} value="signUp" className={this.state.optionSelected === "signUp" ? "" : "inactive"} disabled={this.state.optionSelected === "signUp" ? true : false}>Sign Up</button>
                    <button onClick={(e) => this.setState({ optionSelected: e.target.value })} value="guestSignIn" className={this.state.optionSelected === "guestSignIn" ? "" : "inactive"} disabled={this.state.optionSelected === "guestSignIn" ? true : false}>Guest Sign In</button>
                  </div>

                  {this.state.optionSelected === "signIn"
                    ?
                    <SignInPage userIsNewFunction={(trueOrFalse) => { this.setState({ userIsNew: trueOrFalse }) }}  languages={this.state.languagesList} getLanguage={this.getLanguage} signInAlert={()=>{this.setState({
                      signInAlert:true
                    })}} />
                    :
                    this.state.optionSelected === "signUp"
                      ?
                      <SignUp function={this.getLanguage} languages={this.state.languagesList} signUpAlert={() => {
                        this.setState({
                          nicknameAlert: true
                        })
                      }}/>
                      :
                      <GuestSignUp languages={this.state.languagesList} />

                  }

                </div>
              }
                    
              {this.state.settingsStatus && this.state.signedIn
                ?
                <SettingsPage userUid={this.state.userId} languages={this.state.languagesList} currentLanguage={this.state.language} closeSettings={() => {
                  this.setState({ settingsStatus: !this.state.settingsStatus })
                }}/>
                :
                ""
              }
            </div>

          </div>

        </main>

        <Footer/>
      
      </React.Fragment>
    )
  }
}

export default App;
