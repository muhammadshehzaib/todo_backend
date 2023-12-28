import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar/Navbar";

export default function Signup() {
  const navigate = useNavigate(); // Get the navigate function

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    company: "",
    phoneNo: "",
    email: "",
    password: "",
    age: "",
    image: null, // Store the image file in state
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    // Read the selected image file and set it in the state
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: e.target.files[0],
        imagePreview: URL.createObjectURL(file), // Use URL.createObjectURL to display image preview
      });
    };
    reader.readAsDataURL(file);
  };
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const forms = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        company: formData.company,
        phoneNo: formData.phoneNo,
        email: formData.email,
        password: formData.password,
        image: formData.image,
      };
      const _formData = new FormData();
      Object.keys(forms).map((item) => {
        _formData.append(item, forms[item]);
      });

      const response = await fetch(
        "https://dictionary-application-with-image-uploader-axw8u8mmp.vercel.app/users",
        {
          method: "POST",
          body: _formData,
        }
      );

      // console.log(forms);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Signup Failed:", errorData);
        return;
      }

      const responseData = await response.json();
      navigate("/signin");
      console.log("Signup Successful:", responseData);
    } catch (error) {
      console.error("Signup Failed:", error.message);
      // Handle network errors, etc.
    }
  };
  return (
    <div>
      <Navbar SignIn="SignIn" />

      <form
        className="max-w-[60%] mx-auto mt-10"
        onSubmit={handleSignup}
        encType="multipart/form-data"
      >
        <div class="flex flex-col gap-5">
          <div className="flex gap-8">
            <div>
              <label
                for="first_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                First name
              </label>
              <input
                type="text"
                id="first_name"
                name="firstname"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                for="last_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Last name
              </label>
              <input
                type="text"
                id="last_name"
                name="lastname"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Doe"
                required
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex gap-8 mb-3">
            <div>
              <label
                for="company"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Netixsol"
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                for="phone"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Phone number
              </label>
              <input
                type="tel"
                id="phone"
                name="phoneNo"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="123-45-678"
                required
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[60%] p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
            required
            onChange={handleInputChange}
          />
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Password
          </label>
          <input
            name="password"
            type="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[60%] p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[60%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={handleImageChange}
          />

          {/* Display the image preview */}
          {formData.imagePreview && (
            <img
              src={formData.imagePreview}
              alt="Preview"
              className="mt-2 max-h-40"
            />
          )}
        </div>
        <div class="flex items-start mb-6">
          <div class="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
            />
          </div>
          <label
            for="remember"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree with the
            <a
              href="#"
              class="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
            .
          </label>
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[60%] sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
