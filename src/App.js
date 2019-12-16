import React, { Component } from 'react';
import './index.css';
import firebase from "./Components/firebase";
import axios from "axios";
import ChatPage from "./Components/ChatPage";
import SignInPage from "./Components/SignInPage";
import SignUp from './Components/SignUp';
import GuestSignUp from './Components/GuestSignIn';
import AlertMessage from "./Components/AlertMessage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import SettingsPage from "./Components/SettingsPage";
import Introduction from "./Components/Introduction";
import GoogleSignIn from "./Components/GoogleSignIn";


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
      userIsNew: false,
      isLoading: true,
    }
  }

  
// When the app starts set a listener to check if the user has logged in.

  componentDidMount() {
    
    firebase.auth().onAuthStateChanged((user) => {

      // If the user has logged in and is a new user (In case the user used google sign in) then get rid of the display name that comes from the google acount. Having no display name will trigger the prompt that asks the user to input a nickname and a language later.

      if (user && this.state.userIsNew) {
        
        user.updateProfile({
          displayName: "",
        });

        this.setState({
          name: null,
          signedIn: true,
          userEmail: user.email,
          userId: user.uid,
          isLoading: false

        })

        // If the user has logged in and has a verified email then rerender the page to let the user use the chat

      } else if (user && user.emailVerified) {
        
        this.setState({
          signedIn: true,
          userId: user.uid,
          name: user.displayName,
          userEmail: user.email,
          language: "",
          isLoading: false
        })

        // If the user has logged in and is anonymous (guest sign in) then give the user a number by checking in the databse de last guest user number and update the database with the guest number.

      } else if (user && user.isAnonymous) {
        const guestNumberData = firebase.database().ref("/generalConfig");
        
        guestNumberData.once("value").then((snapshot) => {
          this.setState({
            signedIn: true,
            userId: user.uid,
            userEmail: null,
            isLoading: false,
            name: `guest${snapshot.val().guestNumber}`
          })

          guestNumberData.update({
            guestNumber: snapshot.val().guestNumber + 1
          });
          
        });

       
      } else if(user && !user.emailVerified){
        this.setState({
          verifyAlert: true,
          isLoading: false
        })

       // If the user is not logged in then set the signedIn property of the state to false in order to show the sign in/log in pages
        
      } else {
        
        this.setState({
          signedIn: false,
          userId: null,
          introduction: true,
          isLoading: false
        })
      }
    })

    // Making an axios call to the API to get all the available languages when the app starts in order to use them in the language selector component

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
    

      // Making an array that will store in objects both the language code and language name.

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

  // create a method that gets the language from the language selector component and updates the state of the selected language in the general App component

  getLanguage = (language) => {
    this.setState({
      language: language
    })
  }

  // rendering

  render() {

    return (
      
      <React.Fragment>

        {this.state.isLoading
          && 
          <div className="loadingScreen">
            <div className="lds-hourglass"></div>
          </div>
        }
        

        {/* Rendering the Header component and passing the nickname and signed in status in order to let the component know if the options should show or not and if the buttons should be disabled or not */}

        <Header nickname={this.state.name} guest={this.state.userEmail !== null ? false : true} signedIn={this.state.signedIn} onClickFunction={() => { this.setState({ settingsStatus: !this.state.settingsStatus })}} />

        <main>

          <div className="wrapper">

            <div className="mainDiv">

              {/* If the state property is true then render the introduction prompt */}

              {this.state.introduction
                &&
                <Introduction functionToClose={() => { this.setState({ introduction: false }) }} />
                
              }

              {/*======================
               ALERTS SECTION
               ======================= */}

              {/* If the nickNameAlert property is true then render the Alert prompt */}

              {this.state.nicknameAlert
                &&
                <AlertMessage
                  title="Oops! there was a problem!"
                  functionToClose={() => { this.setState({ nicknameAlert: false }) }}
                  message="The nickname you are trying to register is already in used or the email you are trying to use has already been used by another user!"
                  aditionalButton={false}
                  originalLabel="Ok"
                />

              }

              {/* If the verifyAlert state property is true then render the Alert component letting the user now that needs to verify the account on the email */}

              {this.state.verifyAlert
                &&
                <AlertMessage
                  title="An email has been sent to you!"
                  functionToClose={() => { this.setState({verifyAlert:false}) }}
                  message="Please verify your acount and refresh after! You should have recieved an email with the steps to follow!"
                  originalLabel="Ok"
                  aditionalButton={true}
                  aditionalFunction={() => { firebase.auth().currentUser.sendEmailVerification() }}
                  aditionalLabel="Resend email"
                />
    
              }

              {/* If the signInAlert is true the render the Alert that lets the user now there has been a problem */}

              {this.state.signInAlert
                &&
                <AlertMessage
                  title="Oops! there was a problem!"
                  functionToClose={() => { this.setState({ signInAlert: false }) }}
                  message="You have entered an incorrect email or password!"
                  aditionalButton={false}
                  originalLabel="Ok"
                />
                
              }

              {/* If the user is new or if the user has no nickname(In the case of using google sign in) and the user has signed in then render the GoogleSignIn component in order to ask the user for a language and a nickname */}

              {(this.state.userIsNew || this.state.name === null) && this.state.signedIn
                &&
                <GoogleSignIn
                  googleNicknameAlertFunction={() => {this.setState({nicknameAlert: true })}}
                  userUid={this.state.userId}
                  updateNickname={(nickname) => { this.setState({ name: nickname }) }}
                  userEmail={this.state.userEmail}
                  languages={this.state.languagesList}
                />
              }

              {/*======================
               ALERTS SECTION ENDS
               ======================= */}
              

              {/* If the user is signed in then render the chatPage component if not then render the sign in/ log in options */}
              
              {this.state.signedIn
                ?

                // Chat page component

                <ChatPage userId={this.state.userId} name={this.state.name} language={this.state.language} friendsVisible={this.state.friendsVisible} />
                
                :

                // Sign in/ log in component

                <div className="options">

                  {/* Buttons to select the log in/ sign in option */}

                  <div className="optionsButtons">

                    <button onClick={(e) => this.setState({ optionSelected: e.target.value })} value="signIn" className={this.state.optionSelected === "signIn" ? "" : "inactive"} disabled={this.state.optionSelected === "signIn" ? true : false}>Sign In</button>

                    <button onClick={(e) => this.setState({ optionSelected: e.target.value })} value="signUp" className={this.state.optionSelected === "signUp" ? "" : "inactive"} disabled={this.state.optionSelected === "signUp" ? true : false}>Sign Up</button>

                    <button onClick={(e) => this.setState({ optionSelected: e.target.value })} value="guestSignIn" className={this.state.optionSelected === "guestSignIn" ? "" : "inactive"} disabled={this.state.optionSelected === "guestSignIn" ? true : false}>Guest Sign In</button>

                  </div>

                  {/* Render the component depending on the log in/ sign in option selected by the user */}

                  {this.state.optionSelected === "signIn"
                    
                    ?

                    <SignInPage userIsNewFunction={(trueOrFalse) => { this.setState({ userIsNew: trueOrFalse }) }}  languages={this.state.languagesList} getLanguage={this.getLanguage} signInAlert={()=>{this.setState({signInAlert:true})}} emailVerificationAlert ={()=>{this.setState({verifyAlert:true})}} />
                    
                    :

                    this.state.optionSelected === "signUp"
                      
                      ?

                      <SignUp function={this.getLanguage} languages={this.state.languagesList} signUpAlert={() => {
                        this.setState({ nicknameAlert: true })
                      }} emailVerificationAlert={()=>{this.setState({verifyAlert: true})}}/>
                        
                      :

                      <GuestSignUp languages={this.state.languagesList} />
                  }

                </div>
              }

              {/* If the settingsStatus is true and the user is signed in then show the settings */}
                    
              {this.state.settingsStatus
                
                &&

                <SettingsPage
                  userUid={this.state.userId}
                  languages={this.state.languagesList}
                  currentLanguage={this.state.language}
                  closeSettings={() => { this.setState({ settingsStatus: !this.state.settingsStatus })}}
                />
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
