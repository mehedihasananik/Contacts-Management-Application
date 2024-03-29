/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import toast from "react-hot-toast";

const ContactCard = ({ _id, info, imageUrl, deleteItem }) => {
  const modalRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const info = {
      name,
      email,
      phone,
      address,
    };

    fetch(`https://server-sigma-olive.vercel.app/contact/${_id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(info),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("Contact updated successfully");
        }
      });
    modalRef.current.close();
  };

  return (
    <div className="card w-96 h-[90%] bg-base-100 shadow-xl pt-14">
      <figure>
        <img className="w-full h-[300px]" src={imageUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <div className="card-title">
          <div>Name: {info?.name}</div>
        </div>
        <div>Email: {info?.email}</div>
        <div>Phone: {info?.phone}</div>
        <div>Address: {info?.address}</div>
        <div className="card-actions justify-end">
          <div className="">
            <button
              onClick={() => modalRef.current.showModal()}
              className="badge  badge-secondary badge-outline font-bold mt-4"
            >
              Update
            </button>
            <dialog
              ref={modalRef}
              id={`my_modal_${info?._id}`}
              className="modal"
            >
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <form onSubmit={(e) => handleSubmit(e)} className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Collage Name</span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Collage Name"
                      className="input input-bordered"
                      required
                      defaultValue={info.name}
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="input input-bordered"
                      defaultValue={info?.email}
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Phone Number</span>
                    </label>
                    <input
                      name="phone"
                      type="number"
                      placeholder="Phone Number"
                      className="input input-bordered"
                      required
                      defaultValue={info.phone}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Your Address </span>
                    </label>
                    <input
                      name="address"
                      type="text"
                      placeholder="Your Address"
                      className="input input-bordered"
                      required
                      defaultValue={info.address}
                    />
                  </div>

                  <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </dialog>
          </div>
          <div className="badge badge-outline font-bold mt-4">
            <button onClick={() => deleteItem(_id)}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
