import { Cart } from "../models/CartSchema.js";
import MongodConnection from "../configuration/MongodConnection.js";
import { Item } from "../models/ItemSchema.js";

export const Tables = async (req, res) => {
  await MongodConnection();
  try {
    const tables = await Cart.find({}).populate("items");
    res.json(tables);
  } catch (error) {
    res.send(error);
  }
};

export const deleting = async (req, resp) => {
  await MongodConnection();
  const { tableNo } = req.body;
  try {
    const data = await Cart.findOneAndDelete({ tableNo });
    resp.send("deleted successfully");
  } catch (error) {
    resp.send(error);
  }
};

export const successfulOrder = async (req, resp) => {
  const { tableNo } = req.body;
  await MongodConnection();
  try {
    await Cart.findOneAndUpdate(
      { tableNo: tableNo },
      { order: "successfull" },
      { new: true }
    );
    Cart.save();
    resp.send("successfull order");
  } catch (error) {
    resp.send(error);
  }
};
