import { Request, Response } from "express";
import { TokenPayload } from "./jwt";

export interface QueryContext {
    req: Request;
    res: Response;
    payload?: TokenPayload;
}
