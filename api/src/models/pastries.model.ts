import { Schema, model } from "mongoose";

export const PastrySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  quantityWon: {
    type: Number,
    default: 0,
  },
});

const PastryModel = model("Pastry", PastrySchema);

export default PastryModel;
