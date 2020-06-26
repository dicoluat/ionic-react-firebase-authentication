import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import {
  IonBackButton, IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonInput, IonItem, IonLabel, IonList,
  IonPage,
  IonRouterLink,
  IonTitle, IonToggle,
  IonToolbar
} from "@ionic/react";

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm/>
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {...INITIAL_STATE};
  }

  onSubmit = (event: any) => {
    const {username, email, passwordOne, isAdmin} = this.state;
    const roles = {};

    if (isAdmin) {
      // @ts-ignore
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser: any) => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          roles,
        });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({...INITIAL_STATE});
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error: any) => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({error});
      });

    event.preventDefault();
  };

  onChange = (event: any) => {
    this.setState({[event.target.name]: event.target.value});
  };

  onChangeCheckbox = (event: any) => {
    this.setState({[event.target.name]: event.target.checked});
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref={'/signin'} />
            </IonButtons>
            <IonTitle>
              Sign Up
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <form onSubmit={this.onSubmit}>
            <IonList>
              <IonItem>
                <IonInput
                  name="username"
                  value={username}
                  onIonChange={this.onChange}
                  type="text"
                  placeholder="Full Name"
                />
              </IonItem>
              <IonItem>
                <IonInput
                  name="email"
                  value={email}
                  onIonChange={this.onChange}
                  type="text"
                  placeholder="Email Address"
                />
              </IonItem>
              <IonItem>
                <IonInput
                  name="passwordOne"
                  value={passwordOne}
                  onIonChange={this.onChange}
                  type="password"
                  placeholder="Password"
                />
              </IonItem>
              <IonItem>
                <IonInput
                  name="passwordTwo"
                  value={passwordTwo}
                  onIonChange={this.onChange}
                  type="password"
                  placeholder="Confirm Password"
                />
              </IonItem>
              <IonItem>
                <IonLabel>
                  Admin:
                </IonLabel>
                  <IonToggle
                    name="isAdmin"
                    checked={isAdmin}
                    onIonChange={this.onChangeCheckbox}
                  />
              </IonItem>
            </IonList>

            <IonButton disabled={isInvalid} type="submit">
              Sign Up
            </IonButton>

            {error && <p>{error.message}</p>}
          </form>
        </IonContent>
      </IonPage>

    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <IonRouterLink routerLink={ROUTES.SIGN_UP}>Sign Up</IonRouterLink>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export {SignUpForm, SignUpLink};
