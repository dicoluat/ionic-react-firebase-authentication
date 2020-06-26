import React from 'react';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';

import Navigation from '../Navigation';


import * as ROUTES from '../../constants/routes';
import {withAuthentication} from '../Session';
import {IonReactRouter} from "@ionic/react-router";
import {IonApp, IonRouterOutlet, IonSplitPane} from "@ionic/react";
import {AccountPage, AdminPage, ForgotPasswordPage, HomePage, LandingPage, LoginPage, RegisterPage} from "../../pages";

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
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Navigation/>
          <IonRouterOutlet id="main">


            {/*<Route path="/home" component={Home} exact={true}/>*/}
            {/*<Route exact path="/" render={() => <Redirect to="/home"/>}/>*/}

            <Route exact path={ROUTES.LANDING} component={LandingPage}/>
            <Route path={ROUTES.SIGN_UP} component={RegisterPage}/>
            <Route path={ROUTES.SIGN_IN} component={LoginPage}/>
            <Route path={ROUTES.HOME} component={HomePage}/>
            <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
            <Route path={ROUTES.ADMIN} component={AdminPage}/>
            <Route
              path={ROUTES.PASSWORD_FORGET}
              component={ForgotPasswordPage}
            />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  </>
);

export default withAuthentication(App);
