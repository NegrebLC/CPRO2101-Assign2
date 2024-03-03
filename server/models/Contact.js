const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  organization: { type: String, required: false },
  dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Contact", ContactSchema);
