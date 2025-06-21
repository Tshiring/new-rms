import { deleteData} from "@/lib/fetch-utils";


export const deleteService = async (id) => {
  try {
    const response = await deleteData(`api/v1/function/deleteService/${id}`, null);
    return response;
  } catch (error) {
    console.log("Error deleting service:", error);
    throw error;
  }
}