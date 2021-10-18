import { Request, Response } from "express";

export const home = (req: Request, res: Response) => res.status(200)
    .send({message: "Welcome to REST API"});