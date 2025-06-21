import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAdmins, fetchAdminById, updateAdminStatus } from "../../api/adminApi"

export const useAdmins = () =>
  useQuery(["admins"], fetchAdmins);

export const useAdmin = (id) =>
  useQuery(["admin", id], () => fetchAdminById(id), {
    enabled: !!id,
  });

export const useUpdateAdminStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(updateAdminStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(["admins"]);
    }
  });
};
