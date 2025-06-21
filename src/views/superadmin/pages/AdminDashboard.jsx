import React, { useState } from "react";
import AdminDetails from "../components/AdminDetails";
import AdminList from "../components/AdminList";

const AdminDashboard = () => {
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <AdminList onSelect={setSelectedAdmin} />
      {selectedAdmin && <AdminDetails selectedId={selectedAdmin} />}
    </div>
  );
};

export default AdminDashboard;
