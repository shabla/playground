import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import classnames from "classnames";

import { LoginPage } from "pages/LoginPage";
import { RegisterPage } from "pages/RegisterPage";
import { HomePage } from "pages/HomePage";
import { ECSPage } from "pages/ECSPage";
import { AtlasPage } from "modules/atlas";
import { DiceRollerPage } from "modules/dice-roller";
import { DialogViewerPage } from "modules/dialog-system/pages/DialogViewerPage";
import { setAccessToken, isLoggedIn } from "store";

export const App: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch("http://localhost:4444/refresh_token", {
            credentials: "include",
            method: "POST",
        })
            .then(async (response) => {
                const json = await response.json();
                if (json.ok) {
                    setAccessToken(json.accessToken);
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={classnames("App", "h-full", { "pt-14": isLoggedIn() })}>
            <Switch>
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
                <Route exact path="/" component={HomePage} />
                <Route exact path="/ecs" component={ECSPage} />
                <Route exact path="/dialog" component={DialogViewerPage} />
                <Route exact path="/atlas" component={AtlasPage} />
                <Route exact path="/dice-roller" component={DiceRollerPage} />
                <Route path="*" render={() => <Redirect to={isLoggedIn() ? "/" : "/login"} />} />
            </Switch>
        </div>
    );
};

export default App;
