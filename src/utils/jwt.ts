import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

export interface JwtPayload {
    userId: string;
    role: string;
}

export const generateAccessToken = (
    payload: JwtPayload
): string => {
    const secret: Secret = env.JWT_SECRET;

    const options: SignOptions = {
        expiresIn: "7d",
    };

    return jwt.sign(payload, secret, options);
};

export const verifyAccessToken = (
    token: string
): JwtPayload => {
    return jwt.verify(
        token,
        env.JWT_SECRET as Secret
    ) as JwtPayload;
};