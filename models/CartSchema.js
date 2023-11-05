import mongoose from "mongoose";
const CartSchema = mongoose.Schema({
	userName: { type: String },
	items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }], // Array of references to "Item" documents
	tableNo: { type: Number, required: true },
	order : {type:String,default:"unsuccessfull"},
	admin : {type:Boolean, default:false}

  }, {
	timestamps: true
  })
  
  export const Cart = mongoose.model("Cart", CartSchema);
  