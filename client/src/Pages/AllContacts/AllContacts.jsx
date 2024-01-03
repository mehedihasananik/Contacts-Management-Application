import axios from "axios";
import React, { useEffect, useState } from "react";
import ContactCard from "../../Components/ContactCard/ContactCard";

const AllContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [fliterContact, SetFilterContact] = useState([]);

  const deleteItem = (id) => {
    console.log(id);
    const procced = confirm("are you sure");
    if (procced) {
      fetch(`http://localhost:5000/contact/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert("item is deleted");
          }
          const newBookings = contacts.filter((item) => item._id !== id);
          setContacts(newBookings);
        });
    }
  };

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {contacts.map((contact) => {
        return (
          <ContactCard key={contact._id} {...contact} deleteItem={deleteItem} />
        );
      })}
    </div>
  );
};

export default AllContacts;
