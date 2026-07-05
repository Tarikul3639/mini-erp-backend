import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";

export const AuthController = {
    login: catchAsync(
        async (req: Request, res: Response) => {
            const result =
                await AuthService.login(req.body);

            res.status(200).json(result);
        }
    ),
};