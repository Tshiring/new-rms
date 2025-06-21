
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addService } from "@/api/serviceApi";
import { toast } from "sonner";

export const useAddService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addService,
    onSuccess: () => {
      toast.success("✅ Service added successfully");
      queryClient.invalidateQueries(["services"]); // optional
    },
    onError: () => {
      toast.error("❌ Failed to add service");
    },
  });
};
