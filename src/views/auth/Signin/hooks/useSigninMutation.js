import { postData } from "../../../../lib/fetch-utils";
import { useMutation } from "@tanstack/react-query";

export function useSigninMutation() {
    return useMutation({
        mutationFn: (data) => postData("api/v1/admin/loginAdmin", data),
    })
}