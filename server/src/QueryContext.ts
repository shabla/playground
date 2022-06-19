import { Request, Response } from "express";
import { TokenPayload } from "./tokens";

export interface QueryContext {
  req: Request;
  res: Response;
  payload?: TokenPayload;
}
