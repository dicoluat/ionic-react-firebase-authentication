import React from 'react';
import {IonButtons, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from "@ionic/react";

const Landing: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot={'start'}>
          <IonMenuButton />
        </IonButtons>
        <IonTitle>
          Landing
        </IonTitle>
      </IonToolbar>

    </IonHeader>
  </IonPage>
);

export default Landing;
