import { Request, Response, NextFunction } from "express";
import { Start } from "../services/puppeteer.services";

export async function GetInfo(req: Request, res:Response, next: NextFunction):Promise<Response | undefined > {
   console.log("body is "+req.query.usuario)
   const rta = await Start(`${req.query.usuario}`)
    return res.json(rta)
}

