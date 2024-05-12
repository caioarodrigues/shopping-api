import mongoose from "mongoose";
import ProductModel from "./Product.model";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  itemsBought: [
    {
      type: {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: ProductModel,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
      default: null,
    },
  ],
});

export default mongoose.model("User", UserSchema);
