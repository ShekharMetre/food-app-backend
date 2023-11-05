import mongoose from "mongoose";

const notAllowedUser = mongoose.Schema(
  {
    email: { type: String },
    phonNo: { type: Number },
    image: { type: String },
    disPlayName: { type: String },
  },
  {
    timestamps: true,
  }
);

export const NotAllowedUser = mongoose.model("NotAllowedUser", notAllowedUser);
