import mongoose, { Schema, Document, Model } from "mongoose";

interface ItemDocument extends Document {
  auctionNumber: number;
  catalogNumber: number;
  headerDE: string;
  headerEN: string;
  descriptionDE: string;
  descriptionEN: string;
  catalogPrice: number;
}

const ItemSchema = new Schema<ItemDocument>(
  {
    auctionNumber: { type: Number, required: true },
    catalogNumber: { type: Number, required: true },
    headerDE: { type: String, required: true },
    headerEN: { type: String, required: true },
    descriptionDE: { type: String, required: true },
    descriptionEN: { type: String, required: true },
    catalogPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

const Item: Model<ItemDocument> =
  mongoose.models.Item || mongoose.model<ItemDocument>("Item", ItemSchema);

export default Item;
