import { postData } from "@/lib/fetch-utils";


export const addService = async (data) => {
  try {
    const response = await postData("api/v1/function/addServices", data);
    return response;
  } catch (error) {
    console.error("Error adding service:", error);
    throw error;
  }
}