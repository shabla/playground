import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { AuthenticationError } from "apollo-server-express";

import { QueryContext } from "../QueryContext";

export const isAuth: MiddlewareFn<QueryContext> = ({ context }, next) => {
    const authorization = context.req.headers["authorization"];
    if (!authorization) {
        throw new AuthenticationError("not authenticated");
    }

    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
        context.payload = payload as any;
    } catch (err) {
        console.log(err);
        throw new Error("invalid access token");
    }

    return next();
};
