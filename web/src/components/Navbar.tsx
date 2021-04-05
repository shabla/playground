import React from "react";

import { Button } from "components";

export const Navbar: React.FC = () => {
    return (
        <div className="Navbar fixed top-0 bg-gray-700 text-white w-screen h-14 flex flex-row px-5 items-center">
            <Button>Home</Button>
        </div>
    );
};

export default Navbar;
