import { StatusCodes } from "http-status-codes";

import { User } from "../users/user.model";
import { LoginPayload } from "./auth.types";

import ApiError from "../../utils/ApiError";
import { comparePassword } from "../../utils/bcrypt";
import { generateAccessToken } from "../../utils/jwt";

export const AuthService = {
    async login(payload: LoginPayload) {
        const user = await User.findOne({
            email: payload.email.toLowerCase(),
        }).select("+password");

        if (!user) {
            throw new ApiError(
                StatusCodes.UNAUTHORIZED,
                "Invalid email or password"
            );
        }

        if (!user.isActive) {
            throw new ApiError(
                StatusCodes.FORBIDDEN,
                "User account is inactive"
            );
        }

        const isMatched = await comparePassword(
            payload.password,
            user.password
        );

        if (!isMatched) {
            throw new ApiError(
                StatusCodes.UNAUTHORIZED,
                "Invalid email or password"
            );
        }

        const accessToken = generateAccessToken({
            userId: user.id,
            role: user.role,
        });

        user.lastLoginAt = new Date();

        await user.save();

        return {
            accessToken,

            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    },
};