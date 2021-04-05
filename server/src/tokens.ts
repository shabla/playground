import { Response } from "express";
import { sign } from "jsonwebtoken";
import { getConnection, UpdateResult } from "typeorm";
import { User } from "./entity/User";

export interface TokenPayload {
    userId: number;
    refreshTokenVersion: number;
}

export const createAccessToken = (user: User): string => {
    return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "15m" });
};

export const createRefreshToken = (user: User): string => {
    return sign(
        { userId: user.id, refreshTokenVersion: user.refreshTokenVersion },
        process.env.REFRESH_TOKEN_SECRET!,
        { expiresIn: "7d" }
    );
};

export const setRefreshTokenCookie = (res: Response, token: string) => {
    res.cookie("jid", token, {
        httpOnly: true,
    });
};

export const revokeRefreshToken = async (userId: number): Promise<UpdateResult> => {
    return await getConnection()
        .getRepository(User)
        .increment({ id: userId }, "refreshTokenVersion", 1);
};
