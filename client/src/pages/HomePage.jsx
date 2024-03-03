import React, { useEffect, useState } from "react";
import ContactList from "../components/ContactList";
import { fetchContacts } from "../api/contactsAPI";

const HomePage = () => {
  const [contacts, setContacts] = useState([]);

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

  return (
    <div>
      <ContactList contacts={contacts} />
    </div>
  );
};

export default HomePage;
