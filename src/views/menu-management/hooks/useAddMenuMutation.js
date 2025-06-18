import { postData } from "@/lib/fetch-utils";
import { useMutation } from "@tanstack/react-query";

export function useAddMenuMutation() {
    return useMutation({
        mutationFn: (data) => postData("api/v1/menu/addMenu", data),
    })
}