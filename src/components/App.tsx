import React from "react";
import { Route, Switch } from "react-router-dom";
import classnames from "classnames";

import { Navbar } from "components";
import { LoginPage } from "pages/LoginPage";
import { RegisterPage } from "pages/RegisterPage";

export const App: React.FC = () => {
    const isLoggedIn = false;
    return (
        <div className={classnames("App", "h-full", { "pt-14": isLoggedIn })}>
            {isLoggedIn && <Navbar />}

            <div className="h-full">
                <Switch>
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/register" component={RegisterPage} />
                    <Route path="*" component={LoginPage} />
                </Switch>
            </div>
        </div>
    );
};

export default App;
