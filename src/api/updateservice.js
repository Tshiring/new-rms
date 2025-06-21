import { patchData } from "@/lib/fetch-utils";

export const updateService = async ({id, data}) => {
  try {
    console.log(id);
    const response = await patchData(`api/v1/function/updateService/${id}`, data);
    return response;
  } catch (error) {
    console.log("Error updating service:", error);
    throw error;
  }
}