import { useMutation } from "@tanstack/react-query";
import { postData } from "../../lib/fetch-utils";

export function useSigninMutation() {
  return useMutation({
    mutationFn: (data) => postData("api/v1/admin/loginAdmin", data),
  });
}
