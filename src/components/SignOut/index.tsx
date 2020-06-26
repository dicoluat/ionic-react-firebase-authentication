import React from 'react';

import {withFirebase} from '../Firebase';

class SignOutButton extends React.Component<any, any> {
  render() {
    return <button type="button" onClick={this.props.firebase.doSignOut}>
      Sign Out
    </button>;
  }
}

export default withFirebase(SignOutButton);
