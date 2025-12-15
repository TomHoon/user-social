import * as authService from "./service.js";
import { successResponse, errorResponse } from "../common/response.js";
import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().allow("", null),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json(errorResponse(error.details[0].message, 400));
    }

    const data = await authService.register(req.body);
    return res
      .status(201)
      .json(successResponse(data, "REGISTER_SUCCESS", 201));
  } catch (err) {
    return res
      .status(err.statusCode || 400)
      .json(errorResponse(err.message, err.statusCode || 400));
  }
};

export const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json(errorResponse(error.details[0].message, 400));
    }

    const data = await authService.login(req.body);
    return res.status(200).json(successResponse(data, "LOGIN_SUCCESS", 200));
  } catch (err) {
    return res
      .status(err.statusCode || 401)
      .json(errorResponse(err.message, err.statusCode || 401));
  }
};

export const me = async (req, res) => {
  try {
    const data = authService.getProfile(req.user);
    return res.status(200).json(successResponse(data, "PROFILE", 200));
  } catch (err) {
    return res
      .status(err.statusCode || 400)
      .json(errorResponse(err.message, err.statusCode || 400));
  }
};

export const kakaoRedirect = (_req, res) => {
  const clientId = process.env.KAKAO_CLIENT_ID;
  const redirectUri = process.env.KAKAO_CALLBACK_URI;

  if (!clientId || !redirectUri) {
    return res
      .status(500)
      .json(errorResponse("KAKAO_OAUTH_CONFIG_MISSING", 500));
  }

  const kakaoAuthUrl =
    "https://kauth.kakao.com/oauth/authorize" +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    "&response_type=code";

  return res.redirect(kakaoAuthUrl);
};

export const kakaoCallback = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json(errorResponse("AUTH_CODE_REQUIRED", 400));
    }

    const data = await authService.kakaoLogin({
      code,
      redirectUri: process.env.KAKAO_CALLBACK_URI,
    });

    // 프론트로 리다이렉트 (토큰 전달) or JSON 반환
    const frontendRedirect = process.env.KAKAO_LOGIN_REDIRECT;
    if (frontendRedirect) {
      const url = new URL(frontendRedirect);
      url.hash = `token=${encodeURIComponent(
        data.token
      )}&name=${encodeURIComponent(data.name || "")}&email=${encodeURIComponent(
        data.email || ""
      )}`;
      return res.redirect(url.toString());
    }

    return res.status(200).json(successResponse(data, "LOGIN_SUCCESS", 200));
  } catch (err) {
    return res
      .status(err.statusCode || 400)
      .json(errorResponse(err.message, err.statusCode || 400));
  }
};

// authController.js 파일에 추가

export const googleRedirect = (_req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  // Google Redirect URI는 .env 파일에서 GOOGLE_CALLBACK_URL로 설정하는 것이 일반적입니다.
  const redirectUri = process.env.GOOGLE_CALLBACK_URI; 
  const scope = "profile email"; // 요청할 사용자 정보 범위

  if (!clientId || !redirectUri) {
    return res
      .status(500)
      .json(errorResponse("GOOGLE_OAUTH_CONFIG_MISSING", 500));
  }

  const googleAuthUrl =
    "https://accounts.google.com/o/oauth2/v2/auth" +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent(scope)}` + // 필수: 요청할 scope
    "&response_type=code" +
    "&access_type=offline"; // 선택: Refresh Token을 받으려면 추가

  return res.redirect(googleAuthUrl);
};

// authController.js 파일에 추가

export const googleCallback = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json(errorResponse("AUTH_CODE_REQUIRED", 400));
    }

    // 서비스 레이어의 googleLogin 함수 호출 (토큰 교환, 사용자 정보 획득, DB 처리)
    const data = await authService.googleLogin({
      code,
      redirectUri: process.env.GOOGLE_CALLBACK_URI,
    });

    // Kakao와 동일한 방식으로 프론트로 리다이렉트 (토큰 전달)
    const frontendRedirect = process.env.GOOGLE_LOGIN_REDIRECT;
    if (frontendRedirect) {
      const url = new URL(frontendRedirect);
      url.hash = `token=${encodeURIComponent(
        data.token
      )}&name=${encodeURIComponent(data.name || "")}&email=${encodeURIComponent(
        data.email || ""
      )}`;
      return res.redirect(url.toString());
    }

    return res.status(200).json(successResponse(data, "LOGIN_SUCCESS", 200));
  } catch (err) {
    return res
      .status(err.statusCode || 400)
      .json(errorResponse(err.message, err.statusCode || 400));
  }
};