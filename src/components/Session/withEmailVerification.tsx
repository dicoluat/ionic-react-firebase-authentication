import React from 'react';

import AuthUserContext from './context';
import {withFirebase} from '../Firebase';

const needsEmailVerification = (authUser: any) =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map((provider: any) => provider.providerId)
    .includes('password');

const withEmailVerification = (Component: any) => {
  class WithEmailVerification extends React.Component<any, any> {
    constructor(props: any) {
      super(props);

      this.state = {isSent: false};
    }

    onSendEmailVerification = () => {
      this.props.firebase
        .doSendEmailVerification()
        .then(() => this.setState({isSent: true}));
    };

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            needsEmailVerification(authUser) ? (
              <div>
                {this.state.isSent ? (
                  <p>
                    E-Mail confirmation sent: Check your E-Mails (Spam
                    folder included) for a confirmation E-Mail.
                    Refresh this page once you confirmed your E-Mail.
                  </p>
                ) : (
                  <p>
                    Verify your E-Mail: Check your E-Mails (Spam folder
                    included) for a confirmation E-Mail or send
                    another confirmation E-Mail.
                  </p>
                )}

                <button
                  type="button"
                  onClick={this.onSendEmailVerification}
                  disabled={this.state.isSent}
                >
                  Send confirmation E-Mail
                </button>
              </div>
            ) : (
              <Component {...this.props} />
            )
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return withFirebase(WithEmailVerification);
};

export default withEmailVerification;
