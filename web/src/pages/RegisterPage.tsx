import React, { useState } from "react";

import { useRegisterMutation } from "generated/graphql";
import { InputText, Button, Link, Heading, Logo } from "components";

export const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
    const [register] = useRegisterMutation();

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        console.log("register with", email, password, passwordConfirmation);

        const response = await register({
            variables: { email, password },
        });

        console.log(response);
    };

    return (
        <div className="RegisterPage h-full flex flex-col justify-center bg-indigo-50">
            <div className="logo mx-auto mb-16">
                <Logo />
            </div>

            <div className="w-96 mx-auto shadow-md p-7 rounded bg-white">
                <Heading>Register</Heading>

                <form noValidate onSubmit={handleSubmit} autoComplete="new-password">
                    <InputText
                        className="mb-3"
                        placeholder="Email"
                        autoComplete={false}
                        defaultValue={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />

                    <InputText
                        className="mb-3"
                        placeholder="Password"
                        defaultValue={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />

                    <InputText
                        className="mb-3"
                        placeholder="Password Confirmation"
                        defaultValue={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.currentTarget.value)}
                    />

                    <Button className="mb-3" type="submit" fill onClick={handleSubmit}>
                        Register
                    </Button>

                    <div className="text-right">
                        <Link to="/login">Back</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
