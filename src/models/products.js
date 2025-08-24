import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    URL: {
      type: String,
      required: false,
    },
    img: {
      type: String,
      required: false,
    },
    Type: {
      type: String,
      required: true,
    },
    Rating: {
      type: Number,
      min: 0,
      max: 10,
    },
    RuntimeMins: {
      type: Number,
    },
    Year: {
      type: Number,
    },
    Genres: {
      type: String,
      required: true,
    },
    Votes: {
      type: Number,
    },
    ReleaseDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const product =
  mongoose.models.product || mongoose.model("product", productSchema);

export default product;
