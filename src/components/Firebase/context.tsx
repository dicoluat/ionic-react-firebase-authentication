import React from 'react';
import Firebase from "./../Firebase/firebase";

const FirebaseContext = React.createContext(new Firebase());

export const withFirebase = (Component: React.ComponentType<{ firebase: firebase.app.App }>) => (props: any) => (
  <FirebaseContext.Consumer>
    {(firebase) => <Component {...props} firebase={firebase}/>}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;
