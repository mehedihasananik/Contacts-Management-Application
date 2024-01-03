import axios from "axios";
import React, { useEffect, useState } from "react";

const AllContacts = () => {
  const [contacts, setContacts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/contact");
      setContacts(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(contacts);

  useEffect(() => {
    fetchData();
  }, []);

  return <div>AllContacts</div>;
};

export default AllContacts;
