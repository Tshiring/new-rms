import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteService } from "@/api/deleteservice";
import { toast } from "sonner";

export const useDeleteService = () => {
 const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id)=> deleteService(id),
    onSuccess: () => {
      toast.success("✅ Service delete successfully");
      queryClient.invalidateQueries(["services"]);
    },
    onError: () => {
      toast.error("❌ Failed to delete service");
    },
  });
};
