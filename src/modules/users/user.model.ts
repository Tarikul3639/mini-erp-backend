import { model } from "mongoose";

import { userSchema, TUserDocument } from "./schemas/user.schema";

export const User = model<TUserDocument>("User", userSchema);
