import { useMutation } from "@tanstack/react-query";
import { postData } from "../../lib/fetch-utils";

export function useBuildProfileMutation() {
  return useMutation({
    mutationFn: (data) => postData("api/v1/restaurenAdminProfile/adminRestaurentProfile", data),
  });
}