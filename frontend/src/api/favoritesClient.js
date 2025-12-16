import axiosInstance from "./axiosConfig";

export const getFavorites = async () => {
  const response = await axiosInstance.get("/favorites");
  return response.data.data;
}
export const addFavorite = async (hotelId) => {
  const response = await axiosInstance.post("/favorites", { hotelId });
  return response.data.data;
}

export const removeFavorite = async (favoriteId) => {
  const response = await axiosInstance.delete(`/favorites/${favoriteId}`);
  return response.data.data;
}
export default {
  getFavorites,
  addFavorite,
  removeFavorite,
};  
