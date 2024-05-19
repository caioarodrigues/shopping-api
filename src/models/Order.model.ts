import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: [
      "pending",
      "accepted",
      "declined",
      "awaiting_delivery",
      "completed",
      "cancelled",
    ],
    default: "pending",
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  payment: {
    total: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      enum: ["card", "cash", "pix"],
      required: true,
    },
    status: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
    cash: {
      amount: {
        type: Number,
        default: 0,
      },
      change: {
        type: Number,
        default: 0,
      },
    },
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", OrderSchema);
