import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

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
            throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
        }

        if (!user.isActive) {
            throw new ApiError(StatusCodes.FORBIDDEN, "User account is inactive");
        }

        const isMatched = await comparePassword(payload.password, user.password);

        if (!isMatched) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
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

    async changePassword(
        userId: string,
        payload: {
            currentPassword: string;
            newPassword: string;
        },
    ) {
        const user = await User.findById(userId).select("+password");

        if (!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
        }

        const isMatched = await bcrypt.compare(
            payload.currentPassword,
            user.password,
        );

        if (!isMatched) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "Current password is incorrect",
            );
        }

        if (payload.currentPassword === payload.newPassword) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "New password must be different",
            );
        }

        user.password = await bcrypt.hash(payload.newPassword, 10);

        await user.save();

        return null;
    },
};
