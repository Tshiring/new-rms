import { useMutation } from "@tanstack/react-query";
import { postData } from "../lib/fetch-utils";

export default function useImageUploadMutation() {
  return useMutation({
    mutationFn: (formData: FormData) => postData("api/v1/menuItem/upload", formData),
  });
}
