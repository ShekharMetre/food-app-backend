import { Cart } from "../models/CartSchema.js";
import MongodConnection from "../configuration/MongodConnection.js";
import { Item } from "../models/ItemSchema.js";
import { NotAllowedUser } from "../models/User.js";

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

export const notAllowedUser = async (req, resp) => {
  await MongodConnection();
  const { email, phonNo, image, disPlayName } = req.body;
  // Check if a chat exists between these two users
  const existingtbaleNumner = await NotAllowedUser.findOne({ email });
  if (existingtbaleNumner) {
    resp.send({
      message: `not allow user alredy exists`,
    });
  } else {
    const CreatingCart = {
      email,
      phonNo,
      image,
      disPlayName,
    };
    try {
      const createdCart = await NotAllowedUser.create(CreatingCart);
      resp.send({ message: "new not allowed user joined" });
    } catch (error) {
      resp.send(error);
    }
  }
};

export const tableDelete = async (req, resp) => {
  await MongodConnection();
  const tableNo = req.params.id
  try {
    const respnose = await Cart.findOneAndDelete({ tableNo });
    resp.send({ message: "table deleted successfully" });
  } catch (error) {
    console.log({ message: "someting  error to deletion" });
  }
};

export const itemDeletion = async (req, resp)=>{
  await MongodConnection();
  const itemId = req.params.id
  try {
    const respnose = await Item.findOneAndDelete({ _id: itemId });
    resp.send({ message: "item deleted successfully" });
  } catch (error) {
    console.log({ message: "someting  error to deletion" });
  }
}
