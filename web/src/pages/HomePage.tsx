import React from "react";

import { Link, PageWithNavbar, DigitalClock } from "components";

export const HomePage: React.FC = () => {
    return (
        <PageWithNavbar title="Home Page">
            <h1>Hello</h1>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam pariatur quos
                officia esse repellat officiis quia ratione, nihil nisi laborum eligendi beatae
                commodi iste asperiores. Iure accusamus perspiciatis assumenda quo!
            </p>

            <div>
                <DigitalClock />
                <Link to="/profile">Go to profile</Link>
            </div>
        </PageWithNavbar>
    );
};

export default HomePage;
