import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useLoginMutation } from "generated/graphql";
import { InputText, Button, Link, Logo } from "components";
import { setAccessToken } from "store";

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [login, { loading, error }] = useLoginMutation();
    const history = useHistory();

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        try {
            const response = await login({ variables: { email, password } });

            setAccessToken(response.data!.login.accessToken);

            history.push("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="LoginPage h-full flex flex-col justify-center bg-indigo-50">
            <div className="mx-auto mb-16">
                <Logo />
            </div>

            <div className="w-96 mx-auto shadow-md p-7 rounded bg-white">
                <form noValidate onSubmit={handleSubmit}>
                    <InputText
                        className="mb-3"
                        placeholder="Email"
                        defaultValue={email}
                        disabled={loading}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />

                    <InputText
                        className="mb-3"
                        placeholder="Password"
                        defaultValue={password}
                        disabled={loading}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />

                    <Button
                        className="mb-3"
                        type="submit"
                        fill
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        Login
                    </Button>

                    <pre>{error && error.message}</pre>

                    <div className="text-right">
                        <Link to="/register">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
