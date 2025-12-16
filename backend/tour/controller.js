import * as tourService from "./service.js";
import { successResponse, errorResponse } from "../common/response.js";

export const getTours = async (req, res) => {
 try {
  const filters = req.query;
  const data = await tourService.getAllTours(filters);
  return res.status(200).json(successResponse(data, "TOUR_LIST", 200));
 } catch (err) {
  return res
   .status(err.statusCode || 400)
   .json(errorResponse(err.message, err.statusCode || 400));
 }
};

export const getTourById = async (req, res) => {
 try {
  const { id } = req.params;
  const data = await tourService.getTourById(id);
  if (!data) {
   return res.status(404).json(errorResponse("Tour not found", 404));
  }
  return res.status(200).json(successResponse(data, "TOUR_DETAIL", 200));
 } catch (err) {
  return res
   .status(err.statusCode || 400)
   .json(errorResponse(err.message, err.statusCode || 400));
 }
};

export const createTour = async (req, res) => {
 try {
  const data = await tourService.createTour(req.body);
  return res.status(201).json(successResponse(data, "TOUR_CREATED", 201));
 } catch (err) {
  return res
   .status(err.statusCode || 400)
   .json(errorResponse(err.message, err.statusCode || 400));
 }
};

export const updateTour = async (req, res) => {
 try {
  const { id } = req.params;
  const data = await tourService.updateTour(id, req.body);
  if (!data) {
   return res.status(404).json(errorResponse("Tour not found", 404));
  }
  return res.status(200).json(successResponse(data, "TOUR_UPDATED", 200));
 } catch (err) {
  return res
   .status(err.statusCode || 400)
   .json(errorResponse(err.message, err.statusCode || 400));
 }
};

export const deleteTour = async (req, res) => {
 try {
  const { id } = req.params;
  await tourService.deleteTour(id);
  return res.status(200).json(successResponse(null, "TOUR_DELETED", 200));
 } catch (err) {
  return res
   .status(err.statusCode || 400)
   .json(errorResponse(err.message, err.statusCode || 400));
 }
};

export const getToursByCity = async (req, res) => {
 try {
  const { city } = req.params;
  const data = await tourService.getToursByCity(city);
  return res.status(200).json(successResponse(data, "TOURS_BY_CITY", 200));
 } catch (err) {
  return res
   .status(err.statusCode || 400)
   .json(errorResponse(err.message, err.statusCode || 400));
 }
};

export const getPopularTours = async (req, res) => {
 try {
  const { limit } = req.query;
  const data = await tourService.getPopularTours(limit ? Number(limit) : 10);
  return res.status(200).json(successResponse(data, "POPULAR_TOURS", 200));
 } catch (err) {
  return res
   .status(err.statusCode || 400)
   .json(errorResponse(err.message, err.statusCode || 400));
 }
};
