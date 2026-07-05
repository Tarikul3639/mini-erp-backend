import { model } from "mongoose";
import { userSchema, UserDocument } from "./schemas/user.schema";

export const User = model<UserDocument>("User", userSchema);
