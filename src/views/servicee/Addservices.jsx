import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
const Addservices = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });

  const initialFormState = {
    title: "",
    description: "",
    price: "",
    image: null,
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to handle file upload
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
     if (form.image) {
      formData.append("image", form.image);
    }

    formData.append("price", (form.price));
   
    try {
      const token = localStorage.getItem("access_token");
      console.log("token", token) // Get token from localStorage
      const res = await axios.post(
        "http://api.omeoserve.com/api/v1/function/addServices",
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }, 
        }
      );
      toast.success("Service Added Successfully")
    } catch (err) {

      console.log("Failed to add service:", err);
      toast.error("No no")
    }
    finally{
      setForm(initialFormState);
    }
  };

  return (
    <div className="add-service-container">
      <h2 className="add-service-heading">Add New Service</h2>
      <form onSubmit={handleSubmit} className="add-service-form">
        {/* Name */}
        <div className="form-group" >
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Service Name</label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* Description */}
                <div className="form-group" >

          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          ></textarea>
        </div>
 {/* Image Upload */}
               <div className="form-group" >

          <label htmlFor="image" className="block text-gray-700 font-medium mb-2">Upload Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
          />
        </div>

        {/* Price */}
               <div className="form-group" >

          <label htmlFor="price" className="block text-gray-700 font-medium mb-2">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

       
        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-red-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            Add Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addservices;
