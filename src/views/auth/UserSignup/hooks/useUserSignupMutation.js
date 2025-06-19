import { postData } from "@/lib/fetch-utils";
import { useMutation } from "@tanstack/react-query";

export function useUserSignupMutation() {
    return useMutation({
        mutationFn: (data) => postData("api/v1/auth-service/register", data),
    })
}