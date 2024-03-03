const Contact = require("../models/Contact");

// Get all contacts
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().populate("category", "name -_id");
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Get a single contact by ID
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id).populate(
      "category",
      "name -_id"
    );
    if (!contact) return res.status(404).json({ msg: "Contact not found" });
    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Add new contact
exports.addContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const contact = await newContact.save();
    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Update a contact
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Delete a contact
exports.deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id; // Extract contact ID from request parameters
    console.log("Contact Controller contactID: " + contactId);
    const contact = await Contact.findByIdAndDelete(contactId); // Use extracted contact ID
    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }
    res.json({ msg: "Contact removed" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
