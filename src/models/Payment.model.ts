import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  status: {
    type: ["pending", "completed", "failed"],
    required: true,
    default: "pending",
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: ["brl"],
    default: "brl",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Payment", PaymentSchema);
