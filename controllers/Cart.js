import { Cart } from "../models/CartSchema.js";
import MongodConnection from "../configuration/MongodConnection.js";
import { Item } from "../models/ItemSchema.js";

export const creatCart = async (req, resp) => {
  await MongodConnection();
  const { tableNo, userName } = req.body;
  if (!tableNo) {
    console.log("Please Provide Table no.");
    return resp.send("Please Provide Table no.");
  }

  // Check if a chat exists between these two users
  const existingtbaleNumner = await Cart.findOne({ tableNo });
  if (existingtbaleNumner) {
    resp.send({message:`table No ${existingtbaleNumner.tableNo} already exists`});
  } else {
    const CreatingCart = {
      userName,
      tableNo,
    };
    try {
      const createdCart = await Cart.create(CreatingCart);
      resp.json(createdCart);
    } catch (error) {
      resp.send(error);
    }
  }
};

export const addItemonTable = async (req, resp) => {
  await MongodConnection();
  const { tableNo, quantity, name, item ,price} = req.body;
  try {
    const data = await Cart.findOne({ tableNo }).populate("items");
    if (data) {
      const find = data.items.find((item) => item.name === name);
      if (find) {
        resp.send("exists");
      } else {
        const createItem = {
          item,
          quantity,
          name,
          price
        };
        const newItem = await Item.create(createItem);

        // Use findOneAndUpdate to update the cart and add the new item
        await Cart.findOneAndUpdate(
          { tableNo },
          { $push: { items: newItem } },
          { new: true, upsert: true }
        );

        console.log("New item created successfully");
        resp.send("New item added to the table");
      }
    } else {
      resp.send("tablenotexists");
    }
  } catch (error) {
    resp.send(error);
  }
};

export const fetchingItemList = async (req, resp) => {
  const { tableNo } = req.body;
  await MongodConnection();
  try {
    const cart = await Cart.findOne({ tableNo }).populate("items");
    resp.json(cart);
  } catch (error) {
    resp.send(error);
  }
};


export const quantityChanging = async (req, resp) => {
  const { tableNo, itemId, quantity } = req.body;
  await MongodConnection();
  try {
    const cart = await Cart.findOne({ tableNo }).populate("items");
    if (cart) {
      const findingItems = cart.items.find(
        (item) => item._id.toString() === itemId
      );
      if (findingItems) {
        try {
          await Item.findOneAndUpdate(
            { _id: itemId },
            { quantity: quantity },
            { new: true }
          );
          resp.send("item updated successfylly");
        } catch (error) {
          resp.send("error on updating value");
        }
      } else {
        resp.send("you has to add item on table");
      }
    } else {
      resp.send("table not founded");
    }
  } catch (error) {
    resp.send("everything error");
  }
};


