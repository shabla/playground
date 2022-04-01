import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "@/generated/graphql";
import { Page, TextField, Button, Link } from "@/components";
import { setAccessToken } from "@/store";
import { Logo } from "../components/Logo";
import { AuthFormContainer } from "../components/AuthFormContainer";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [login, { loading, error, reset }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const response = await login({ variables: { email, password } });

      setAccessToken(response.data!.login.accessToken);
      navigate("/");
    } catch (err) {
      console.error(err);
      // TODO: save error message or do something with it before reset?
    } finally {
      reset();
    }
  };

  return (
    <Page className="login-page" withContainer={false} align="center center">
      <Logo />

      <AuthFormContainer>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            placeholder="Email"
            defaultValue={email}
            disabled={loading}
            onChange={setEmail}
          />

          <TextField
            placeholder="Password"
            type="password"
            defaultValue={password}
            disabled={loading}
            onChange={setPassword}
          />

          <Button
            type="submit"
            intent="primary"
            fill
            onClick={handleSubmit}
            loading={loading}
          >
            Login
          </Button>

          <pre>{error && error.message}</pre>

          <div className="text-right">
            <Link to="/register">Register</Link>
          </div>
        </form>
      </AuthFormContainer>
    </Page>
  );
};
