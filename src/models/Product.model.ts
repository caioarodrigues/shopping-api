import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["drinkable", "eatable", "wearable"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  photoURL: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Product", ProductSchema);
