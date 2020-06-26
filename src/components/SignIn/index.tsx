import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {SignUpLink} from '../SignUp';
import {PasswordForgetLink} from '../PasswordForget';
import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {
  IonButton,
  IonButtons, IonCol,
  IonContent,
  IonHeader, IonInput,
  IonItem,
  IonList,
  IonMenuButton,
  IonPage, IonRow,
  IonTitle,
  IonToolbar
} from "@ionic/react";

const SignInPage = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot={'start'}>
          <IonMenuButton />
        </IonButtons>
        <IonTitle>
          Sign In
        </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <SignInForm/>
      <IonRow>
        <IonCol>
          <SignInGoogle/>
        </IonCol>
        <IonCol>
          <SignInFacebook/>
        </IonCol>
        <IonCol>
          <SignInTwitter/>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <PasswordForgetLink/>
        </IonCol>
        <IonCol>
          <SignUpLink/>
        </IonCol>
      </IonRow>
    </IonContent>
  </IonPage>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  isValid: false
};

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFormBase extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {...INITIAL_STATE};
  }

  onSubmit = (event: any) => {
    const {email, password} = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({...INITIAL_STATE});
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error: any) => {
        this.setState({error});
      });

    event.preventDefault();
  };

  onChange = (event: any) => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    const {email, password, error, isValid} = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <IonList>
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
              name="password"
              value={password}
              onIonChange={this.onChange}
              type="password"
              placeholder="Password"
            />
          </IonItem>
        </IonList>
        <IonButton disabled={isInvalid} type="submit">
          Sign In
        </IonButton>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class SignInGoogleBase extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {error: null};
  }

  onSubmit = (event: any) => {
    this.props.firebase
      .doSignInWithGoogle()
      .then((socialAuthUser: any) => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({error: null});
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

  render() {
    const {error} = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <IonButton type="submit">Sign In with Google</IonButton>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class SignInFacebookBase extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {error: null};
  }

  onSubmit = (event: any) => {
    this.props.firebase
      .doSignInWithFacebook()
      .then((socialAuthUser: any) => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name || '',
          email: socialAuthUser.additionalUserInfo.profile.email || '',
          roles: {},
        });
      })
      .then(() => {
        this.setState({error: null});
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

  render() {
    const {error} = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <IonButton type="submit">Sign In with Facebook</IonButton>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class SignInTwitterBase extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {error: null};
  }

  onSubmit = (event: any) => {
    this.props.firebase
      .doSignInWithTwitter()
      .then((socialAuthUser: any) => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name || '',
          email: socialAuthUser.additionalUserInfo.profile.email || '',
          roles: {},
        });
      })
      .then(() => {
        this.setState({error: null});
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

  render() {
    const {error} = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <IonButton type="submit">Sign In with Twitter</IonButton>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);

const SignInFacebook = compose(
  withRouter,
  withFirebase,
)(SignInFacebookBase);

const SignInTwitter = compose(
  withRouter,
  withFirebase,
)(SignInTwitterBase);

export default SignInPage;

export {SignInForm, SignInGoogle, SignInFacebook, SignInTwitter};
