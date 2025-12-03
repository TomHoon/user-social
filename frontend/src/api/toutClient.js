import axiosInstance from "./axiosConfig";



// tour API



export const getTours=async(params) => {
  try {
    const response = await axiosInstance.get("/tours", { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tours:", error);
    throw error;
  }
};
