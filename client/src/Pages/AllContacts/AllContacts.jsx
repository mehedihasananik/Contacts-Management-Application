import axios from "axios";
import React, { useEffect, useState } from "react";
import ContactCard from "../../Components/ContactCard/ContactCard";
import toast from "react-hot-toast";

const AllContacts = () => {
  const [contacts, setContacts] = useState([]);

  // delete a contact
  const deleteItem = (id) => {
    const proceed = confirm("are you sure");
    if (proceed) {
      fetch(`https://server-sigma-olive.vercel.app/contact/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            toast.success("Contact is deleted");
          }
          const newBookings = contacts.filter((item) => item._id !== id);
          setContacts(newBookings);
        });
    }
  };

  // fetching contacts
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://server-sigma-olive.vercel.app/contact"
      );
      setContacts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    // showing contact on ui
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {contacts.map((contact) => {
          return (
            <ContactCard
              key={contact._id}
              {...contact}
              deleteItem={deleteItem}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllContacts;
