



import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { useFetchServiceById } from "@/hooks/servicee/useManageService";
import { useUpdateService } from "@/hooks/servicee/useUpdateService";
import { useDeleteService } from "@/hooks/servicee/useDeleteService";
import { toast } from "sonner";

const ServiceById = () => {
  const { id } = useParams();
  console.log("Service ID for update:", id);
  const navigate = useNavigate();

  const { data, isLoading, isError } = useFetchServiceById(id);
  const { mutate: updateService, isPending: updating } = useUpdateService();
  const { mutate: deleteService, isPending: deleting } = useDeleteService();

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
   
    logoFile: null,
     price: 0
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (data?.Data) {
      setForm({
        title: data.Data.title,
        description: data.Data.description,
       
        logoFile: null, 
         price: data.Data.price,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  
  //update logic
 const handleSave = (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", form.title);
  formData.append("description", form.description);
  formData.append("price", form.price);
    formData.append("logoFile", form.logoFile); // ✅ Updated key
 
for (let [key, value] of formData.entries()) {
  console.log(`${key}:`, value);
}

  updateService(
    { id, data: formData },
    {
      onSuccess: () => {
        toast.success("✅ Service updated!");
        setEditMode(false);
        fileInputRef.current.value = null;
      },
      onError: () => toast.error("❌ Failed to update service"),
    }
  );
};



  //delete logic
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this service?")) {
      deleteService(id, {
        onSuccess: () => {
          toast.success("🗑 Service deleted");
          navigate("/manageservices");
        },
        onError: () => toast.error("❌ Failed to delete service"),
      });
    }
  };

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading service</p>;

  const service = data?.Data;

  return (
    <div className="max-w-xl mx-auto p-6 border rounded-md shadow">
      <h2 className="text-2xl font-bold mb-4 text-red-600 text-center">Service Details</h2>

      {editMode ? (
        <>
          <label className="block mb-2 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full mb-4 px-3 py-2 border rounded"
          />

          <label className="block mb-2 font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full mb-4 px-3 py-2 border rounded"
          />

          <label className="block mb-2 font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full mb-4 px-3 py-2 border rounded"
          />

          <label className="block mb-2 font-medium">Upload New Image</label>
          <input
            type="file"
            name="logoFile"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleChange}
            className="mb-4 w-full px-3 py-2 border rounded"
          />

          <div className="flex justify-between">
            <button
              onClick={handleSave}
              disabled={updating}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {updating ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="text-gray-600 px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <img
            src={service.logoUrl}
            alt={service.title}
            className="w-full h-56 object-cover rounded mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
          <p className="text-gray-600 mb-2">{service.description}</p>
          <p className="text-red-600 font-bold mb-4">Rs. {service.price}</p>

          <div className="flex justify-between">
            <button
              onClick={() => setEditMode(true)}
              className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceById;
