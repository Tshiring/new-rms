import { useMutation } from "@tanstack/react-query";
import { postData } from "../../lib/fetch-utils";

export function useCreateRestaurantMutation() {
  return useMutation({
    mutationFn: (data) => postData("api/v1/restaurent/retaurentAdmin", data),
  });
}
