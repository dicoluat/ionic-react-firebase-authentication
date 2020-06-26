import './styles.scss';
import React from 'react';
import {compose} from 'recompose';

import {withAuthorization, withEmailVerification} from '../../components/Session';
import Messages from '../../components/Messages';
import {IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from "@ionic/react";

const HomePage = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot={'start'}>
          <IonMenuButton/>
        </IonButtons>
        <IonTitle>Home Page</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <p>The Home Page is accessible by every signed in user.</p>
      <Messages/>
    </IonContent>
  </IonPage>
);

const condition = (authUser: any) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
