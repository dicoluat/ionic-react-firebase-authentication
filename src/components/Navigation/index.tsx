import React from 'react';
import {Link} from 'react-router-dom';

import {AuthUserContext} from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import {IonRouterLink} from "@ionic/react";

class Navigation extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return <AuthUserContext.Consumer>
      {(authUser: any) =>
        authUser ? (
          <NavigationAuth authUser={authUser}/>
        ) : (
          <NavigationNonAuth/>
        )
      }
    </AuthUserContext.Consumer>;
  }
}

class NavigationAuth extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    console.log('ROUTES', ROUTES);
  }
  render() {
    return <ul>
      <li>
        <IonRouterLink routerLink={ROUTES.LANDING}>Landing</IonRouterLink>
      </li>
      <li>
        <IonRouterLink routerLink={ROUTES.HOME}>Home</IonRouterLink>
      </li>
      <li>
        <IonRouterLink routerLink={ROUTES.ACCOUNT}>Account</IonRouterLink>
      </li>
      {/*{!!this.props.authUser.roles[ROLES.ADMIN] && (
        <li>
          <IonRouterLink to={ROUTES.ADMIN}>Admin</Link>
        </li>
      )}
      <li>
        <SignOutButton/>
      </li>*/}
    </ul>;
  }
}

class NavigationNonAuth extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return <ul>
      <li>
        <IonRouterLink routerLink={ROUTES.LANDING}>Landing</IonRouterLink>
      </li>
      <li>
        <IonRouterLink routerLink={ROUTES.SIGN_IN}>Sign In</IonRouterLink>
      </li>
    </ul>;
  }
}

export default Navigation;
