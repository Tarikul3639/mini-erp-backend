import { LoginPayload } from "./auth.types";

export const AuthService = {
    async login(payload: LoginPayload) {
        /**
         * Flow
         *
         * Find User
         * ↓
         * Compare Password
         * ↓
         * Generate JWT
         * ↓
         * Update lastLoginAt
         * ↓
         * Return Token + User
         */
    },
};