import axios from "axios";

const API_URL = "http://api.omeoserve.com/api/v1/admin";

// Get all admins
export const fetchAdmins = async () => {
  const token = localStorage.getItem("access_token");
  const res = await axios.get(`${API_URL}/all`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Get single admin by ID
export const fetchAdminById = async (id) => {
  const token = localStorage.getItem("access_token");
  const res = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Patch admin status
export const updateAdminStatus = async ({ id, status }) => {
  const token = localStorage.getItem("access_token");
  const res = await axios.patch(
    `${API_URL}/status/${id}`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
