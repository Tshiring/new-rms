// src/api/serviceApi.js (or wherever appropriate)
import { fetchData } from "@/lib/fetch-utils";

export const manageService = async () => {
  try {
    const response = await fetchData("api/v1/function/services");
    return Array.isArray(response.ListData) ? response.ListData : [];
  } catch (error) {
    console.error("Error fetching service:", error);
    throw error;
  }
};



export const manageServiceById = async (id) => {
  try {
    const response = await fetchData(`api/v1/function/service/${id}`);
     console.log(response)
    return response;
   
  } catch (error) {
    console.error("Error fetching service by ID:", error);
    throw error;
  }
}