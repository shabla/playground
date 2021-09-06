import "dotenv/config";
import "reflect-metadata";

import express from "express";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./UserResolver";
import cookieParser from "cookie-parser";

import cors from "cors";
import http from "http";


import { initWebSocket } from "./websocket";
import { registerAuthHandlers } from "./handlers/auth";

(async () => {
    const app = express();

    app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
    app.use(cookieParser());

    registerAuthHandlers(app);

    const server = http.createServer(app);

    initWebSocket(server);

    try {
        await createConnection();
    } catch (e) {
        console.error(e);
    }

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver],
        }),
        context: ({ req, res }) => ({
            req,
            res,
        }),
    });

    apolloServer.applyMiddleware({ app, cors: false });

    server.listen(4444, () => {
        console.log("express server started", 4444);
    });
})();
