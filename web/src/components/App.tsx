import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import classnames from "classnames";

import { Navbar, Link } from "components";
import { LoginPage } from "pages/LoginPage";
import { RegisterPage } from "pages/RegisterPage";
import { HomePage } from "pages/HomePage";
import { setAccessToken } from "store";

export const App: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);

    const isLoggedIn = false;

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
        <div className={classnames("App", "h-full", { "pt-14": isLoggedIn })}>
            {isLoggedIn && <Navbar />}

            <div className="h-full">
                <Switch>
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/register" component={RegisterPage} />
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/test" render={({history}) => {
                        return <Link to="/">home</Link>
                    }} />
                    <Route path="*" component={LoginPage} />
                </Switch>
            </div>
        </div>
    );
};

export default App;
