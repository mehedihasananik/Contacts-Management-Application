import toast from "react-hot-toast";

const AddContacts = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const address = form.address.value;

    // image upload
    const image = e.target.image.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGDB
    }`;

    const info = {
      name,
      email,
      phone,
      address,
    };

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        const imageUrl = imageData.data.display_url;
        fetch("http://localhost:5000/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ info, imageUrl }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.success === true) {
              toast.success(`You have successfully submitted the form`);
              form.reset();
            } else {
              toast.error("You already have an appoinment");
            }
          });
      });

    console.log(info);
  };

  return (
    // adding contact
    <div className="flex justify-center items-center md:min-h-screen overflow-hidden">
      <div className="flex flex-col  w-[350px] md:w-[500px] p-10 rounded-md md:p-14 bg-gray-100 text-gray-900">
        {/* title & description started */}
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Add Contact</h1>
          <p className="text-sm text-gray-400">
            Welcome to Contacts Management
          </p>
        </div>
        {/* title & description end */}
        {/* form to add contact */}
        <form
          onSubmit={handleSubmit}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Phone Number
              </label>
              <input
                type="number"
                name="phone"
                id="phone"
                placeholder="Enter Your Phone Number"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Enter Your Address Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
                required
              />
            </div>
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Select Image:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-rose-500 w-full rounded-md py-3 text-white"
            >
              Create Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContacts;
