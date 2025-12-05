import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../api/favoritesClient";

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const data = await getFavorites();
      setFavorites(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
      setLoading(false);
    }
  };

  const addFavoriteItem = async (hotelId) => {
    try {
      await addFavorite(hotelId);
      await fetchFavorites();
    } catch (error) {
      console.error("Failed to add favorite:", error);
      throw error;
    }
  };

  const removeFavoriteItem = async (favoriteId) => {
    try {
      await removeFavorite(favoriteId);
      await fetchFavorites();
    } catch (error) {
      console.error("Failed to remove favorite:", error);
      throw error;
    }
  };

  const isFavorite = (hotelId) => {
    return favorites.some(
      (fav) => (fav.hotelId?._id || fav.hotelId) === hotelId
    );
  };

  const getFavoriteByHotelId = (hotelId) => {
    return favorites.find(
      (fav) => (fav.hotelId?._id || fav.hotelId) === hotelId
    );
  };

  const toggleFavorite = async (hotelId) => {
    const favorite = getFavoriteByHotelId(hotelId);
    if (favorite) {
      await removeFavoriteItem(favorite.id || favorite._id);
    } else {
      await addFavoriteItem(hotelId);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const value = {
    favorites,
    loading,
    fetchFavorites,
    addFavoriteItem,
    removeFavoriteItem,
    isFavorite,
    getFavoriteByHotelId,
    toggleFavorite,
    favoriteHotelIds: favorites.map((fav) => fav.hotelId?._id || fav.hotelId),
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
