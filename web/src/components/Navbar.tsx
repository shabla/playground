import React from "react";
import { useHistory } from "react-router-dom";

import { Button } from "components";
import { apolloClient } from "apollo-setup";
import { useLogoutMutation } from "generated/graphql";

export const Navbar: React.FC = () => {
    const history = useHistory();
    const [logout] = useLogoutMutation();

    const handleLogout = () => {
        logout();
        apolloClient.clearStore();
        history.push("/login");
    };

    return (
        <div className="Navbar fixed top-0 bg-gray-700 text-white w-screen h-14 flex flex-row justify-between items-center px-5">
            <div className="space-x-2">
                <Button onClick={() => history.push("/")}>Home</Button>
                <Button onClick={() => history.push("/ecs")}>ECS</Button>
            </div>

            <div>
                <Button onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    );
};

export default Navbar;
