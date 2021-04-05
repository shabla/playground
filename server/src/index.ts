import "dotenv/config";
import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./UserResolver";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { User } from "./entity/User";
import { createAccessToken, createRefreshToken, setRefreshTokenCookie, TokenPayload } from "./tokens";

(async () => {
    const app = express();
    app.use(cookieParser());

    app.post("/refresh_token", async (req, res) => {
        const token = req.cookies.jid;
        if (!token) {
            return res.send({ ok: false, message: "missing refresh token", accessToken: "" });
        }

        let payload: TokenPayload;
        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!) as TokenPayload;
        } catch (err) {
            console.log(err);
            return res.send({ ok: false, message: "invalid refresh token", accessToken: "" });
        }

        // token is valid and we can send back an access
        const user = await User.findOne({ where: { id: payload.userId } });
        if (!user) {
            return res.send({ ok: false, message: "invalid payload", accessToken: "" });
        }
        
        if(user.refreshTokenVersion !== payload.refreshTokenVersion) {
            return res.send({ ok: false, message: "invalid payload", accessToken: "" });
        }

        // refresh the refresh token
        setRefreshTokenCookie(res, createRefreshToken(user));

        return res.send({ ok: true, accessToken: createAccessToken(user) });
    });

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

    apolloServer.applyMiddleware({ app });

    app.listen(4444, () => {
        console.log("express server started");
    });
})();
