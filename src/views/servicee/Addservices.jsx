import React, { useState, useRef } from "react";
import { useAddService } from "@/hooks/servicee/useAddService";

const Addservices = () => {
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
   
    logoFile: null,
     price: 0
  });

  const initialFormState = {
    title: "",
    description: "",
   
    logoFile: null,
     price: 0
  };

  const { mutate, isLoading } = useAddService();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    if (form.image) formData.append("logoFile", form.logoFile);

    mutate(formData, {
      onSuccess: () => {setForm(initialFormState)
       fileInputRef.current.value = null;
      }
    });
  };

  return (
//     <div className="add-service-container">
//       <h2 className="add-service-heading">Add New Service</h2>
//       <form onSubmit={handleSubmit} className="add-service-form" method="POST">
//         {/* Name */}
// <div className="space-y-12">
//   <div className="border-b border-gray-900/10 pb-12">
//         <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6" >
//           <div className="sm:col-span-4">
//           <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">Service Name</label>
//           <div className="mt-2">

//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
//           />
        
//         </div>
//         </div>
// </div>
//         {/* Description */}
//                 <div className="form-group" >

//           <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             rows="4"
//             required
//             className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
//           ></textarea>
//         </div>
//  {/* Image Upload */}
//                <div className="form-group" >

//           <label htmlFor="image" className="block text-gray-700 font-medium mb-2">Upload Image</label>
//           <input
//             type="file"
//             id="image"
//             name="image"
//             accept="image/*"
//             ref={fileInputRef}
           
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded-md px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
//           />
//         </div>

//         {/* Price */}
//                <div className="form-group" >

//           <label htmlFor="price" className="block text-gray-700 font-medium mb-2">Price</label>
//           <input
//             type="number"
//             id="price"
//             name="price"
//             value={form.price}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
//           />
//         </div>

       
//         {/* Submit Button */}
     

//         <div className="text-center">
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="bg-red-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-red-600 transition duration-300"
//           >
//             {isLoading ? "Adding..." : "Add Service"}
//           </button>
//         </div>
//         </div>
//         </div>
        
//       </form>
//     </div>
isLoading? (<h2>The page is loading</h2>):(
<div className="w-screen max-w-6xl mx-auto mt-10 bg-white p-12 rounded-2xl shadow-xl border border-gray-200">
  <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Add New Service</h2>

  <form onSubmit={handleSubmit} className="space-y-6" method="POST">
    {/* Service Name */}
    <div>
      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
        Service Name
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
        placeholder="e.g. Home Cleaning"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
      />
    </div>

    {/* Description */}
    <div>
      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        value={form.description}
        onChange={handleChange}
        rows="4"
        placeholder="Describe the service..."
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
      ></textarea>
    </div>

    {/* Image Upload */}
    <div>
      <label htmlFor="logoFile" className="block text-sm font-medium text-gray-700 mb-1">
        Upload Image
      </label>
      <input
        type="file"
        id="logoFile"
        name="logoFile"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 border border-gray-300 rounded-lg"
      />
    </div>

    {/* Price */}
    <div>
      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
        Price (in Rs.)
      </label>
      <input
        type="number"
        id="price"
        name="price"
        value={form.price}
        onChange={handleChange}
        required
        placeholder="e.g. 1000"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
      />
    </div>

    {/* Submit Button */}
    <div className="pt-4">
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Adding..." : "Add Service"}
      </button>
    </div>
  </form>
</div>
)

  );
};

export default Addservices;
