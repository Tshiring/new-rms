import React from "react";
import { useAdmins } from "../../../hooks/admin/useAdminQuery";

const AdminList = ({ onSelect }) => {
  const { data, isLoading, error } = useAdmins();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching admins.</p>;

  return (
    <ul>
      {data.map((admin) => (
        <li key={admin._id} onClick={() => onSelect(admin._id)}>
          {admin.name} - {admin.status}
        </li>
      ))}
    </ul>
  );
};

export default AdminList;
