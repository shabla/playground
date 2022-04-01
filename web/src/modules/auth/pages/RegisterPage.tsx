import React, { useState } from "react";

import { useRegisterMutation } from "@/generated/graphql";
import { Page, TextField, Button, Link, Heading } from "@/components";
import { Logo } from "../components/Logo";
import { AuthFormContainer } from "../components/AuthFormContainer";

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
    <Page className="register-page" align="center center" withContainer={false}>
      <Logo />

      <AuthFormContainer>
        <Heading className="mb-5">Register</Heading>

        <form noValidate onSubmit={handleSubmit} autoComplete="new-password">
          <TextField
            className="mb-3"
            placeholder="Email"
            autoComplete={false}
            defaultValue={email}
            onChange={setEmail}
          />

          <TextField
            type="password"
            className="mb-3"
            placeholder="Password"
            defaultValue={password}
            onChange={setPassword}
          />

          <TextField
            type="password"
            className="mb-3"
            placeholder="Password Confirmation"
            defaultValue={passwordConfirmation}
            onChange={setPasswordConfirmation}
          />

          <Button className="mb-3" type="submit" fill onClick={handleSubmit}>
            Register
          </Button>

          <div className="text-right">
            <Link to="/login">Back</Link>
          </div>
        </form>
      </AuthFormContainer>
    </Page>
  );
};
