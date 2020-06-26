import React, {Component} from 'react';
import {compose} from 'recompose';

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';
import {withFirebase} from '../Firebase';
import {PasswordForgetForm} from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import {IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from "@ionic/react";

const SIGN_IN_METHODS = [
  {
    id: 'password',
    provider: null,
  },
  {
    id: 'google.com',
    provider: 'googleProvider',
  },
  {
    id: 'facebook.com',
    provider: 'facebookProvider',
  },
  {
    id: 'twitter.com',
    provider: 'twitterProvider',
  },
];

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {(authUser: any) => (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot={'start'}>
              <IonMenuButton />
            </IonButtons>
            <IonTitle>
              Account: {authUser.email}
            </IonTitle>
          </IonToolbar>

        </IonHeader>
        <IonContent>
          <PasswordForgetForm/>
          <PasswordChangeForm/>
          <LoginManagement authUser={authUser}/>
        </IonContent>
      </IonPage>
    )}
  </AuthUserContext.Consumer>
);

class LoginManagementBase extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      activeSignInMethods: [],
      error: null,
    };
  }

  componentDidMount() {
    this.fetchSignInMethods();
  }

  fetchSignInMethods = () => {
    this.props.firebase.auth
      .fetchSignInMethodsForEmail(this.props.authUser.email)
      .then((activeSignInMethods: any) =>
        this.setState({activeSignInMethods, error: null}),
      )
      .catch((error: any) => this.setState({error}));
  };

  onSocialLoginLink = (provider: any) => {
    this.props.firebase.auth.currentUser
      .linkWithPopup(this.props.firebase[provider])
      .then(this.fetchSignInMethods)
      .catch((error: any) => this.setState({error}));
  };

  onDefaultLoginLink = (password: any) => {
    const credential = this.props.firebase.emailAuthProvider.credential(
      this.props.authUser.email,
      password,
    );

    this.props.firebase.auth.currentUser
      .linkAndRetrieveDataWithCredential(credential)
      .then(this.fetchSignInMethods)
      .catch((error: any) => this.setState({error}));
  };

  onUnlink = (providerId: any) => {
    this.props.firebase.auth.currentUser
      .unlink(providerId)
      .then(this.fetchSignInMethods)
      .catch((error: any) => this.setState({error}));
  };

  render() {
    const {activeSignInMethods, error} = this.state;

    return (
      <div>
        Sign In Methods:
        <ul>
          {SIGN_IN_METHODS.map(signInMethod => {
            const onlyOneLeft = activeSignInMethods.length === 1;
            const isEnabled = activeSignInMethods.includes(
              signInMethod.id,
            );

            return (
              <li key={signInMethod.id}>
                {signInMethod.id === 'password' ? (
                  <DefaultLoginToggle
                    onlyOneLeft={onlyOneLeft}
                    isEnabled={isEnabled}
                    signInMethod={signInMethod}
                    onLink={this.onDefaultLoginLink}
                    onUnlink={this.onUnlink}
                  />
                ) : (
                  <SocialLoginToggle
                    onlyOneLeft={onlyOneLeft}
                    isEnabled={isEnabled}
                    signInMethod={signInMethod}
                    onLink={this.onSocialLoginLink}
                    onUnlink={this.onUnlink}
                  />
                )}
              </li>
            );
          })}
        </ul>
        {error && error.message}
      </div>
    );
  }
}

const SocialLoginToggle = ({
                             onlyOneLeft,
                             isEnabled,
                             signInMethod,
                             onLink,
                             onUnlink,
                           }: any) =>
  isEnabled ? (
    <button
      type="button"
      onClick={() => onUnlink(signInMethod.id)}
      disabled={onlyOneLeft}
    >
      Deactivate {signInMethod.id}
    </button>
  ) : (
    <button
      type="button"
      onClick={() => onLink(signInMethod.provider)}
    >
      Link {signInMethod.id}
    </button>
  );

class DefaultLoginToggle extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {passwordOne: '', passwordTwo: ''};
  }

  onSubmit = (event: any) => {
    event.preventDefault();

    this.props.onLink(this.state.passwordOne);
    this.setState({passwordOne: '', passwordTwo: ''});
  };

  onChange = (event: any) => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    const {
      onlyOneLeft,
      isEnabled,
      signInMethod,
      onUnlink,
    } = this.props;

    const {passwordOne, passwordTwo} = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <IonPage>
        <IonContent>
          {
            isEnabled ? (
              <button
                type="button"
                onClick={() => onUnlink(signInMethod.id)}
                disabled={onlyOneLeft}
              >
                Deactivate {signInMethod.id}
              </button>
            ) : (
              <form onSubmit={this.onSubmit}>
                <input
                  name="passwordOne"
                  value={passwordOne}
                  onChange={this.onChange}
                  type="password"
                  placeholder="New Password"
                />
                <input
                  name="passwordTwo"
                  value={passwordTwo}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Confirm New Password"
                />

                <button disabled={isInvalid} type="submit">
                  Link {signInMethod.id}
                </button>
              </form>
            )
          }
        </IonContent>
      </IonPage>


    )
  }
}

const LoginManagement = withFirebase(LoginManagementBase);

const condition = (authUser: any) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AccountPage);
