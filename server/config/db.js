const mongoose = require("mongoose");
require("dotenv").config();

const Category = require("../models/Category");
const Contact = require("../models/Contact");

const categoriesData = [
  { name: "Family" },
  { name: "Friends" },
  { name: "Work" },
  { name: "Other" },
];

const contactsData = [
  {
    firstname: "Bergen",
    lastname: "Cunningham",
    phone: "587-876-7305",
    email: "BergCu2001@gmail.com",
    organization: "RDP",
    category: "65e3cc00af89b6f734694cc4",
  },
  {
    firstname: "John",
    lastname: "Doe",
    phone: "555-555-5555",
    email: "john@example.com",
    organization: "U of A",
    category: "65e3cc00af89b6f734694cc5",
  },
  {
    firstname: "Kim",
    lastname: "Kardashian",
    phone: "555-555-5555",
    email: "kim@example.com",
    organization: "Hollywood Inc.",
    category: "65e3cc00af89b6f734694cc6",
  },
];

// Async function to connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DBCONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await seedDataIfNeeded();
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

// Seed data if needed
const seedDataIfNeeded = async () => {
  const categoryCount = await Category.countDocuments();
  if (categoryCount === 0) {
    await Category.insertMany(categoriesData);
    console.log("Categories seeded successfully!");
  } else {
    console.log("Existing categories found. Skipping category seeding.");
  }

  const contactCount = await Contact.countDocuments();
  if (contactCount === 0) {
    // If seeding contacts, ensure categories are assigned
    const seededCategories = await Category.find();
    const updatedContactsData = contactsData.map((contact, index) => ({
      ...contact,
      category: seededCategories[index % seededCategories.length]._id,
    }));
    await Contact.insertMany(updatedContactsData);
    console.log("Contacts seeded successfully!");
  } else {
    console.log("Existing contacts found. Skipping contact seeding.");
  }
};

module.exports = connectDB;
