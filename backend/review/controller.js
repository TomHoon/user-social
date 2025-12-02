import * as reviewService from "./service.js";
import { successResponse, errorResponse } from "../common/response.js";

export const createReview = async (req, res) => {
  try {
    const data = await reviewService.createReview(req.user._id, req.body);
    return res.status(201).json(successResponse(data, "REVIEW_CREATED", 201));
  } catch (err) {
    return res
      .status(err.statusCode || 400)
      .json(errorResponse(err.message, err.statusCode || 400));
  }
};

export const getReviews = async (req, res) => {
  try {
    const hotelId = req.params.id || req.query.hotelId;
    const data = await reviewService.getReviews(hotelId);
    return res.status(200).json(successResponse(data, "REVIEW_LIST", 200));
  } catch (err) {
    return res
      .status(err.statusCode || 400)
      .json(errorResponse(err.message, err.statusCode || 400));
  }
};
export const updateReview = async (req, res) => {
  try {
    const data = await reviewService.updateReview(
      req.user._id,
      req.params.reviewId,
      req.body
    );
    return res.status(200).json(successResponse(data, "REVIEW_UPDATED", 200));
  } catch (err) {
    return res
      .status(err.statusCode || 400)
      .json(errorResponse(err.message, err.statusCode || 400));
  }
};

export const deleteReview = async (req, res) => {
  try {
    const data = await reviewService.deleteReview(
      req.user._id,
      req.params.reviewId
    );
    return res.status(200).json(successResponse(data, "REVIEW_DELETED", 200));
  } catch (err) {
    return res
      .status(err.statusCode || 400)
      .json(errorResponse(err.message, err.statusCode || 400));
  }
};
