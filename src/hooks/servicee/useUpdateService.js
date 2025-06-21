
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateService } from "@/api/updateservice";
import { toast } from "sonner";

export const useUpdateService = () => {
 const queryClient = useQueryClient();

return useMutation({
    mutationFn: ( id, data ) => updateService(id, data),
    onSuccess: () => {
      toast.success("✅ Service modified successfully");
      queryClient.invalidateQueries(["services"]);
    },
    onError: () => {
      toast.error("❌ Failed to update the service");
    },
  });
};
