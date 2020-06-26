import React from 'react';

import {withFirebase} from '../Firebase';
import {IonButton} from "@ionic/react";

class SignOutButton extends React.Component<any, any> {
  render() {
    return <IonButton type="button" onClick={this.props.firebase.doSignOut}>
      Sign Out
    </IonButton>;
  }
}

export default withFirebase(SignOutButton);
