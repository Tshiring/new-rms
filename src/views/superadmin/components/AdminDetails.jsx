import React from "react";
import { useAdmin, useUpdateAdminStatus } from "../../../hooks/admin/useAdminQuery";


const AdminDetails = ({ selectedId }) => {
  const { data, isLoading } = useAdmin(selectedId);
  const { mutate } = useUpdateAdminStatus();

  if (isLoading || !data) return <p>Loading details...</p>;

  const handleStatusChange = () => {
    const newStatus = data.status === "active" ? "inactive" : "active";
    mutate({ id: selectedId, status: newStatus });
  };

  return (
    <div>
      <h3>{data.name}</h3>
      <p>Email: {data.email}</p>
      <p>Status: {data.status}</p>
      <button onClick={handleStatusChange}>
        Toggle Status
      </button>
    </div>
  );
};

export default AdminDetails;
