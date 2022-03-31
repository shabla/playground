import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "@/generated/graphql";
import { Page, InputText, Button, Link } from "@/components";
import { setAccessToken } from "@/store";
import { Logo } from "../../components/Logo";

import "./LoginPage.scss"

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [login, { loading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const response = await login({ variables: { email, password } });

      setAccessToken(response.data!.login.accessToken);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Page className="login-page" navbar={false} withContainer={false}>
      <Logo />

      <div className="form-container">
        <form noValidate onSubmit={handleSubmit}>
          <InputText
            placeholder="Email"
            defaultValue={email}
            disabled={loading}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />

          <InputText
            placeholder="Password"
            defaultValue={password}
            disabled={loading}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />

          <Button
            type="submit"
            fill
            intent="primary"
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
      </div>
    </Page>
  );
};
