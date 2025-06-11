import { useMutation } from "@tanstack/react-query";
import { postData } from "../../lib/fetch-utils";

export function useOPTVerifyMutation() {
  return useMutation({
    mutationFn: (data) => postData("api/v1/admin/verifyEmail", data),
  });
}