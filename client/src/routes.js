import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { TodoPage } from './components/TodoPage/TodoPage';
import { SignInPage } from './components/SignPage/SignInPage';
import { SignUpPage } from './components/SignPage/SignUpPage';
import { HomePage } from './components/HomePage/HomePage';



export const useRoutes = isSigned => {
    if(isSigned){
        return(
          <div className="container">
            <Switch>
                <Route path="/" exact>
                    <HomePage/>
                </Route>
                <Route path="/todo/:id">
                    <TodoPage/>
                </Route>
                <Redirect to="/"/>
            </Switch>
            </div>
        );
    }
    return(
      <div className="container">
        <Switch >
            <Route path="/signin" exact>
                <SignInPage />
            </Route>
            <Route path="/signup" exact>
                <SignUpPage />
            </Route>
            <Redirect to="/signin"/>
        </Switch>
        </div>
    );
}