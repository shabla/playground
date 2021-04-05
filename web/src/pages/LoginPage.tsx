import React, { useState } from "react";

import { InputText, Button, Link } from "components";

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();

        console.log("login with", email, password);
    };

    return (
        <div className="LoginPage h-full flex items-center bg-indigo-50">
            <div className="w-96 mx-auto shadow-md p-7 rounded bg-white">
                <form noValidate onSubmit={handleSubmit}>
                    <InputText
                        className="mb-3"
                        placeholder="Email"
                        defaultValue={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />

                    <InputText
                        className="mb-3"
                        placeholder="Password"
                        defaultValue={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />

                    <Button className="mb-3" type="submit" fill onClick={handleSubmit}>
                        Login
                    </Button>

                    <div className="text-right">
                        <Link to="/register">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
