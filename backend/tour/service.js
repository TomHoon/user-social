import { Tour } from "./model.js";

export const getAllTours = async (filters = {}) => {
 const { city, category, difficulty, minPrice, maxPrice, sortBy } = filters;

 const query = { status: "active" };
 if (city) query.city = city;
 if (category) query.category = category;
 if (difficulty) query.difficulty = difficulty;
 if (minPrice || maxPrice) {
  query.price = {};
  if (minPrice) query.price.$gte = Number(minPrice);
  if (maxPrice) query.price.$lte = Number(maxPrice);
 }

 let sortOption = {};
 switch (sortBy) {
  case "price-asc":
   sortOption = { price: 1 };
   break;
  case "price-desc":
   sortOption = { price: -1 };
   break;
  case "rating":
   sortOption = { ratingAverage: -1 };
   break;
  case "duration":
   sortOption = { duration: 1 };
   break;
  default:
   sortOption = { createdAt: -1 };
 }

 return Tour.find(query)
  .populate("guide", "name email")
  .sort(sortOption)
  .lean();
};

export const getTourById = async (tourId) => {
 return Tour.findById(tourId).populate("guide", "name email phone").lean();
};

export const createTour = async (tourData) => {
 const tour = new Tour(tourData);
 return tour.save();
};

export const updateTour = async (tourId, updateData) => {
 return Tour.findByIdAndUpdate(tourId, updateData, {
  new: true,
  runValidators: true,
 });
};

export const deleteTour = async (tourId) => {
 return Tour.findByIdAndDelete(tourId);
};

export const getToursByCity = async (city) => {
 return Tour.find({ city, status: "active" })
  .sort({ ratingAverage: -1, price: 1 })
  .lean();
};

export const getPopularTours = async (limit = 10) => {
 return Tour.find({ status: "active" })
  .sort({ ratingAverage: -1, ratingCount: -1 })
  .limit(limit)
  .lean();
};
