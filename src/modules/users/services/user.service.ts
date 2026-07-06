import { StatusCodes } from "http-status-codes";
import cloudinary from "../../../config/cloudinary";
import ApiError from "../../../utils/ApiError";
import { User } from "../user.model";
import bcrypt from "bcrypt";

export const UserService = {
  async getProfile(userId: string) {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }

    return user;
  },

  async updateProfile(
    userId: string,
    payload: {
      name: string;
    },
    file?: Express.Multer.File,
  ) {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }

    user.name = payload.name;

    if (file) {
      const uploadResult = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "mini-erp/users",
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }

            resolve(result);
          },
        );

        stream.end(file.buffer);
      });

      user.avatar = uploadResult.secure_url;
    }

    await user.save();

    return await User.findById(user._id).select("-password");
  },

  async changePassword(
    userId: string,
    payload: {
      currentPassword: string;
      newPassword: string;
    },
  ) {
    const user = await User.findById(userId);

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
