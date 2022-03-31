import React from "react";

import { Link, Page } from "@/components";
import { DigitalClock } from "../components/DigitalClock/DigitalClock";
import { ButtonExample } from "../components/ButtonExample";

export const HomePage: React.FC = () => {
  return (
    <Page title="Home Page">
      <h1>Hello</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam pariatur quos
        officia esse repellat officiis quia ratione, nihil nisi laborum eligendi beatae
        commodi iste asperiores. Iure accusamus perspiciatis assumenda quo!
      </p>

      <div>
        <DigitalClock />
        <ButtonExample />
        <Link to="/profile">Go to profile</Link>
      </div>
    </Page>
  );
};