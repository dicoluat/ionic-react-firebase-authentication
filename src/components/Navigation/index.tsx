import React from 'react';
import {Link} from 'react-router-dom';

import {AuthUserContext} from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import {IonContent, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterLink} from "@ionic/react";

class Navigation extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <IonMenu type="overlay" disabled={false} contentId="main">
        <IonContent forceOverscroll={false}>
          <AuthUserContext.Consumer>

            {(authUser: any) =>
              authUser ? (
                <NavigationAuth authUser={authUser}/>
              ) : (
                <NavigationNonAuth/>
              )
            }
          </AuthUserContext.Consumer>
        </IonContent>
      </IonMenu>
    )
  }

}

class NavigationAuth extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    console.log('ROUTES', ROUTES);
  }

  render() {
    return (
      <>
        <IonList>
          <IonMenuToggle auto-hide="false">
            <IonItem routerLink={ROUTES.LANDING}>
              <IonLabel>Landing</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle auto-hide="false">
            <IonItem routerLink={ROUTES.HOME}>
              <IonLabel>Home</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle auto-hide="false">
            <IonItem routerLink={ROUTES.ACCOUNT}>
              <IonLabel>Account</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle auto-hide="false">
            <IonItem>
              <SignOutButton/>
            </IonItem>
          </IonMenuToggle>
        </IonList>
        {/*{!!this.props.authUser.roles[ROLES.ADMIN] && (
          <li>
            <IonRouterLink routerLink={ROUTES.ADMIN}>Admin</IonRouterLink>
          </li>
        )}*/}
      </>
    )
  }
}

class NavigationNonAuth extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return <IonList>
      <IonMenuToggle auto-hide="false">
        <IonItem routerLink={ROUTES.LANDING}>
          <IonLabel>Landing</IonLabel>
        </IonItem>
      </IonMenuToggle>

      <IonMenuToggle auto-hide="false">
        <IonItem routerLink={ROUTES.SIGN_IN}>
          <IonLabel>Sign In</IonLabel>
        </IonItem>
      </IonMenuToggle>
    </IonList>
  }
}

export default Navigation;
