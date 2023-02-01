const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    createdBy:{
      type: mongoose.Types.ObjectId,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
