import React, { useRef, useState } from "react";
import Modal from "../Modal/Modal";

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

    fetch(`http://localhost:5000/contact/${_id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(info),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          alert("updated successfully");
        }
      });
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={imageUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <div className="card-title">
          <div> {info?.name}</div>
        </div>
        <div className="badge badge-secondary">{info?.email}</div>
        <div>{info?.phone}</div>
        <div>{info?.address}</div>
        <div className="card-actions justify-end">
          <div className="">
            <button
              onClick={() => modalRef.current.showModal()}
              className=" info_card text-white bg-red-500 font-semibold py-2 rounded-md"
            >
              Admission Form
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
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Image </span>
                    </label>
                    <input
                      name="image"
                      type="image"
                      placeholder="Your Image"
                      className="input input-bordered"
                      required
                      defaultValue={imageUrl}
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
          <div className="badge badge-outline">
            {" "}
            <button onClick={() => deleteItem(_id)}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
