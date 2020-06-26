import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {
  IonBackButton, IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonInput, IonItem, IonLabel, IonList,
  IonPage,
  IonRouterLink, IonText,
  IonTitle,
  IonToolbar
} from "@ionic/react";

const PasswordForgetPage = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref={'/signin'}/>
        </IonButtons>
        <IonTitle>PasswordForget</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <PasswordForgetForm/>
    </IonContent>
  </IonPage>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {...INITIAL_STATE};
  }

  onSubmit = (event: any) => {
    const {email} = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({...INITIAL_STATE});
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
    const {email, error} = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <IonList>
          <IonItem>
            <IonLabel position={'stacked'}>Email</IonLabel>
            <IonInput
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
          </IonItem>
        </IonList>

        <IonButton
          disabled={isInvalid}
          type="submit">
          Reset My Password
        </IonButton>
        {error && <IonText color="danger">
          <p className="ion-padding-start">
            {error.message}
          </p>
        </IonText>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <IonRouterLink routerLink={ROUTES.PASSWORD_FORGET}>Forgot Password?</IonRouterLink>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export {PasswordForgetForm, PasswordForgetLink};
