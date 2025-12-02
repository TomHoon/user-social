import * as userService from "./service.js";
import { successResponse, errorResponse } from "../common/response.js";
import Joi from "joi";

// 프로필 조회
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id || req.user._id;
    const data = await userService.getUserProfile(userId);
    return res.status(200).json(successResponse(data, "USER_PROFILE", 200));
  } catch (err) {
    return res
      .status(err.statusCode || 404)
      .json(errorResponse(err.message, err.statusCode || 404));
  }
};

// 프로필 수정
const updateProfileSchema = Joi.object({
  name: Joi.string().trim(),
  phone: Joi.string().allow("", null),
});

export const updateUserProfile = async (req, res) => {
  try {
    const { error } = updateProfileSchema.validate(req.body);
    if (error) {
      return res.status(400).json(errorResponse(error.details[0].message, 400));
    }

    const userId = req.params.id || req.user._id;
    const data = await userService.updateUserProfile(userId, req.body);
    return res.status(200).json(successResponse(data, "PROFILE_UPDATED", 200));
  } catch (err) {
    return res
      .status(err.statusCode || 400)
      .json(errorResponse(err.message, err.statusCode || 400));
  }
};

// 비밀번호 변경
const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});

export const changePassword = async (req, res) => {
  try {
    const { error } = changePasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json(errorResponse(error.details[0].message, 400));
    }

    const { currentPassword, newPassword } = req.body;
    const data = await userService.changePassword(
      req.user._id,
      currentPassword,
      newPassword
    );
    return res.status(200).json(successResponse(data, "PASSWORD_CHANGED", 200));
  } catch (err) {
    return res
      .status(err.statusCode || 400)
      .json(errorResponse(err.message, err.statusCode || 400));
  }
};

// 사업자 신청
export const applyBusiness = async (req, res) => {
  try {
    const { businessName, businessNumber, bankAccount } = req.body;
    const data = await userService.applyBusiness(req.user._id, {
      businessName,
      businessNumber,
      bankAccount,
    });

    return res
      .status(200)
      .json(successResponse(data, "BUSINESS_APPLY_SUBMITTED", 200));
  } catch (err) {
    return res
      .status(err.statusCode || 400)
      .json(errorResponse(err.message, err.statusCode || 400));
  }
};

// 사업자 신청 상태 조회
export const getBusinessStatus = async (req, res) => {
  try {
    const data = await userService.getBusinessStatus(req.user._id);
    return res.status(200).json(successResponse(data, "BUSINESS_STATUS", 200));
  } catch (err) {
    return res
      .status(err.statusCode || 404)
      .json(errorResponse(err.message, err.statusCode || 404));
  }
};
