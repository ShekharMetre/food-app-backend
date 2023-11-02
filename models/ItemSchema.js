import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    item: { type: String },
    quantity: {
      type: Number,
      required: true,
      default : 1
    },
    name: {
      type: String,
    },
    price : {type : Number,default : 1},
    totalPrice: { type: Number },
  },
  {
    timestamps: true,
  }
);

export const Item = mongoose.model("Item", ItemSchema);
