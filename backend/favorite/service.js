import { Favorite } from "./model.js";
import { Hotel } from "../hotel/model.js";

export const listFavorites = async (userId) => {
  return Favorite.find({ userId }).populate(
    "hotelId",
    "_id name city address location images ratingAverage ratingCount basePrice tags"
  );
};

export const addFavorite = async (userId, hotelId) => {
  const hotel = await Hotel.findById(hotelId);
  if (!hotel) {
    const err = new Error("HOTEL_NOT_FOUND");
    err.statusCode = 404;
    throw err;
  }

  const favorite = await Favorite.findOneAndUpdate(
    { userId, hotelId },
    { userId, hotelId },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  return favorite;
};

export const removeFavorite = async (userId, favoriteId) => {
  const deleted = await Favorite.findOneAndDelete({ _id: favoriteId, userId });
  if (!deleted) {
    const err = new Error("FAVORITE_NOT_FOUND");
    err.statusCode = 404;
    throw err;
  }
  return deleted;
};
