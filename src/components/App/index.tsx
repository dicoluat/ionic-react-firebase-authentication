import React from 'react';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';
import {withAuthentication} from '../Session';
import {IonReactRouter} from "@ionic/react-router";
import {IonApp, IonRouterOutlet} from "@ionic/react";
import Home from "../../pages/Home";

const App = () => (
  <>
   {/* <Router>
      <div>
        <Navigation/>

        <hr/>

        <Route exact path={ROUTES.LANDING} component={LandingPage}/>
        <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
        <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
        <Route
          path={ROUTES.PASSWORD_FORGET}
          component={PasswordForgetPage}
        />
        <Route path={ROUTES.HOME} component={HomePage}/>
        <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
        <Route path={ROUTES.ADMIN} component={AdminPage}/>
      </div>
    </Router>
    */}

    <IonApp>


      <hr/>
      <IonReactRouter>
        <Navigation/>
        <IonRouterOutlet>

          {/*<Route path="/home" component={Home} exact={true}/>*/}
          {/*<Route exact path="/" render={() => <Redirect to="/home"/>}/>*/}

          <Route exact path={ROUTES.LANDING} component={LandingPage}/>
          <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
          <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
          <Route path={ROUTES.HOME} component={HomePage}/>
          <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
          <Route path={ROUTES.ADMIN} component={AdminPage}/>
          <Route
            path={ROUTES.PASSWORD_FORGET}
            component={PasswordForgetPage}
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </>
);

export default withAuthentication(App);
