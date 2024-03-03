import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCategories } from "../api/categoriesAPI";
import {
  saveContact,
  fetchContactById,
  updateContact,
} from "../api/contactsAPI";

const ContactForm = () => {
  const [contact, setContact] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    category: "",
    organization: "",
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // Used for edit mode

  useEffect(() => {
    const init = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
      if (id) {
        const contactData = await fetchContactById(id);
        setContact(contactData);
      }
    };
    init();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateContact(id, contact);
    } else {
      await saveContact(contact);
    }
    navigate("/");
  };

  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Form fields are now wrapped in Bootstrap's grid layout */}
          <div className="col-md-6 mb-3">
            <label htmlFor="firstname" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              name="firstname"
              value={contact.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="lastname" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              name="lastname"
              value={contact.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={contact.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={contact.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className="form-control"
              id="category"
              name="category"
              value={contact.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="organization" className="form-label">
              Organization
            </label>
            <input
              type="text"
              className="form-control"
              id="organization"
              name="organization"
              value={contact.organization}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Save Contact
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
