import * as React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {LoginView} from './modules/user/LoginView';
import {RegisterView} from './modules/user/RegisterView';
import {Account} from './modules/account/Account';
import {PaidUsers} from "./modules/account/PaidUsers";
import {Header} from "./modules/shared/Header";

export class Routes extends React.PureComponent {
    render() {
        return (
            <BrowserRouter>
                <Switch>

                    /* Without Header */
                    <Route path="/login" component={LoginView}/>

                    /* With Header */
                    <Route
                        path="/"
                        render={() => (
                            <React.Fragment>
                                <Header/>
                                <div>
                                    <Route path="/register" component={RegisterView}/>
                                    <Route path="/account" component={Account}/>
                                    <Route path="/paid-users" component={PaidUsers}/>
                                    <Route exact={true} path="/" component={() => <div>Homepage</div>}/>
                                </div>
                            </React.Fragment>
                        )}/>

                </Switch>
            </BrowserRouter>
        );
    }
}
