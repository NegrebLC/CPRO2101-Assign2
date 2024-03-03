import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/contacts";

// Fetch all contacts
export const fetchContacts = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data; // Assuming the server responds with the list of contacts
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

// Fetch a single contact by ID
export const fetchContactById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data; // Assuming the server responds with the requested contact
  } catch (error) {
    console.error(`Error fetching contact with ID ${id}:`, error);
    throw error;
  }
};

// Add a new contact
export const saveContact = async (contactData) => {
  try {
    const response = await axios.post(API_BASE_URL, contactData);
    return response.data; // Assuming the server responds with the created contact
  } catch (error) {
    console.error("Error saving contact:", error);
    throw error;
  }
};

// Update an existing contact
export const updateContact = async (id, contactData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, contactData);
    return response.data; // Assuming the server responds with the updated contact
  } catch (error) {
    console.error(`Error updating contact with ID ${id}:`, error);
    throw error;
  }
};

// Delete a contact
export const deleteContact = async (contactId) => {
  console.log("API contactID: " + contactId);
  try {
    const response = await axios.delete(`${API_BASE_URL}/${contactId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
