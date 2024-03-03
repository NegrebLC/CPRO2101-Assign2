import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchContacts, deleteContact } from "../api/contactsAPI";
import DeleteConfirmation from "./DeleteConfirmation";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const data = await fetchContacts();
        setContacts(data);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      }
    };
    getContacts();
  }, []);

  const openDeleteConfirmation = (contact) => {
    setSelectedContact(contact);
    setShowDeleteConfirmation(true);
  };

  const handleDelete = async (contactId) => {
    console.log("Deleting contact with ID:", contactId);
    await deleteContact(contactId);

    // Close the confirmation modal
    setShowDeleteConfirmation(false);
    const updatedContacts = await fetchContacts();
    setContacts(updatedContacts);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="container mt-3">
      <Link to="/add" className="btn btn-primary mb-3">
        Add Contact
      </Link>
      {/* Table view for larger screens */}
      <div className="d-none d-md-block">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">Category</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.firstname}</td>
                <td>{contact.lastname}</td>
                <td>{contact.phone}</td>
                <td>{contact.email}</td>
                <td>{contact.category.name}</td>
                <td>
                  <Link
                    to={`/details/${contact._id}`}
                    className="btn btn-info btn-sm me-2"
                  >
                    Details
                  </Link>
                  <Link
                    to={`/edit/${contact._id}`}
                    className="btn btn-secondary btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => openDeleteConfirmation(contact)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Card view for smaller screens */}
      <div className="d-md-none">
        {contacts.map((contact) => (
          <div className="card mb-3" key={contact._id}>
            <div className="card-body">
              <h5 className="card-title">
                {contact.firstname} {contact.lastname}
              </h5>
              <p className="card-text">{contact.phone}</p>
              <p className="card-text">{contact.email}</p>
              <p className="card-text">{contact.category.name}</p>
              <div>
                <Link
                  to={`/details/${contact._id}`}
                  className="btn btn-info btn-sm me-2"
                >
                  Details
                </Link>
                <Link
                  to={`/edit/${contact._id}`}
                  className="btn btn-secondary btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => openDeleteConfirmation(contact)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showDeleteConfirmation && (
        <DeleteConfirmation
          contact={selectedContact}
          onDelete={handleDelete}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
};

export default ContactList;
