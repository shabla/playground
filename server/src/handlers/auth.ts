import express from "express";
import { verify } from "jsonwebtoken";

import { User } from "../entity/User";
import {
    createAccessToken,
    createRefreshToken,
    setRefreshTokenCookie,
    TokenPayload,
} from "../tokens";

export const registerAuthHandlers = (app: express.Express) => {
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

        if (user.refreshTokenVersion !== payload.refreshTokenVersion) {
            return res.send({ ok: false, message: "invalid payload", accessToken: "" });
        }

        // refresh the refresh token
        setRefreshTokenCookie(res, createRefreshToken(user));

        return res.send({ ok: true, accessToken: createAccessToken(user) });
    });
};
