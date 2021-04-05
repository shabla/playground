import React from "react";

import { useUsersQuery } from "generated/graphql";
import { Link } from "components";

export const HomePage: React.FC = () => {
    const { data, loading } = useUsersQuery({ fetchPolicy: "network-only" });

    return (
        <div>
            <h1>Hello world</h1>

            <Link to="/test">test</Link>

            {loading && <div>loading...</div>}

            {data &&
                data.users.map((user: any) => (
                    <div key={user.id}>
                        {user.id} - {user.email}
                    </div>
                ))}
        </div>
    );
};

export default HomePage;
