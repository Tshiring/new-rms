
import React from "react";
import { useFetchServices } from "@/hooks/servicee/useManageService";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";
const Manageservices = () => {
const navigate = useNavigate();
  const { data:services, isLoading, isError, error } = useFetchServices();
console.log("Services data:", services);
  if (isLoading) return <p className="text-center mt-8 text-gray-600">Loading...</p>;
  if (isError) return <p className="text-center mt-8 text-red-500">Error: {error.message}</p>;



  return (
    <div className="px-6 py-8">
      <h2 className="text-2xl font-bold text-center text-red-600 mb-8">All Available Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
       {services?.map(service => (
        console.log("Service item:", service),
  <div
    key={service.id}
    className="p-4 border rounded shadow w-full max-w-sm"
   onClick={() => navigate(`/manageservices/${service.id}`)}
  >
    {service.logoUrl ? (
      <img
        src={service.logoUrl}
        alt={service.title}
        className="w-full h-48 object-cover rounded-md mb-2"
        loading="eager"
      />
    ) : (
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 rounded-md mb-2">
        No Image
      </div>
    )}

    <h3 className="font-bold text-lg">{service.title}</h3>
    <p className="text-gray-600">{service.description}</p>
    <p className="text-red-600 font-semibold mt-2">Rs. {service.price}</p>
  </div>
))}


      </div>
      <Outlet />
    </div>
  );
};

export default Manageservices;

