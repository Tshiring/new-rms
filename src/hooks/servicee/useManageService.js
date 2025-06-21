
import { useQuery } from "@tanstack/react-query";
import { manageService, manageServiceById } from "@/api/fetchserviceApi";
import { toast } from "sonner";

export const useFetchServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: manageService,
    onError: () => toast.error("❌ Failed to fetch services"),
  });
};

export const useFetchServiceById = (id) => {
  return useQuery({
    queryKey: ["service", id],
    queryFn: () => manageServiceById(id),
    enabled: !!id, 
    onError: () => toast.error("❌ Failed to fetch service by ID"),
  });
}