import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchContactById } from "../api/contactsAPI";

const ContactPage = () => {
  const { id } = useParams(); // Get the contact ID from the URL params
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const data = await fetchContactById(id); // Fetch the contact details by ID
        setContact(data);
      } catch (error) {
        console.error("Failed to fetch contact details:", error);
      }
    };
    fetchContactDetails();
  }, [id]);

  return (
    <div className="container mt-3">
      {contact ? (
        <div className="row">
          <div className="col-12">
            <h2>Contact Details</h2>
            <p>
              <strong>First Name:</strong> {contact.firstname}
            </p>
            <p>
              <strong>Last Name:</strong> {contact.lastname}
            </p>
            <p>
              <strong>Phone:</strong> {contact.phone}
            </p>
            <p>
              <strong>Email:</strong> {contact.email}
            </p>
            <p>
              <strong>Category:</strong> {contact.category.name}
            </p>
            <p>
              <strong>Date Added:</strong>{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }).format(new Date(contact.dateAdded))}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading contact details...</p>
      )}
      <Link to="/" className="btn btn-secondary btn-sm me-2">
        Back
      </Link>
    </div>
  );
};

export default ContactPage;
