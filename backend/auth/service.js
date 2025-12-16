import jwt from "jsonwebtoken";
import axios from "axios";
import { User } from "../user/model.js";

const signToken = (id) => {
  const secret = process.env.JWT_SECRET || process.env.JWT_SECRET_KEY;
  return jwt.sign({ id }, secret, { expiresIn: "30d" });
};

const generateSocialPassword = (providerId) =>
  `social_${providerId}_${Date.now()}`;

const ensureEmail = (email, providerId) =>
  email || `kakao_${providerId}@kakao.local`;

export const register = async ({ name, email, password, phone }) => {
  const exists = await User.findOne({ email });
  if (exists) {
    const err = new Error("USER_ALREADY_EXISTS");
    err.statusCode = 400;
    throw err;
  }

  const user = await User.create({ name, email, password, phone });
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: signToken(user._id),
  };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: signToken(user._id),
    };
  }
  const err = new Error("INVALID_CREDENTIALS");
  err.statusCode = 401;
  throw err;
};

export const getProfile = (user) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    businessStatus: user.businessStatus,
  };
};

export const kakaoLogin = async ({ code, redirectUri }) => {
  const clientId = process.env.KAKAO_CLIENT_ID;
  const clientSecret = process.env.KAKAO_CLIENT_SECRET;
  const finalRedirectUri =
    redirectUri || process.env.KAKAO_CALLBACK_URI || "";

  if (!clientId || !finalRedirectUri) {
    const err = new Error("KAKAO_OAUTH_CONFIG_MISSING");
    err.statusCode = 500;
    throw err;
  }

  // 1) 토큰 발급
  const tokenParams = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: clientId,
    redirect_uri: finalRedirectUri,
    code,
  });
  if (clientSecret) tokenParams.append("client_secret", clientSecret);

  const tokenRes = await axios.post(
    "https://kauth.kakao.com/oauth/token",
    tokenParams,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

  const { access_token: accessToken } = tokenRes.data;
  if (!accessToken) {
    const err = new Error("KAKAO_TOKEN_FAILED");
    err.statusCode = 400;
    throw err;
  }

  // 2) 사용자 정보 조회
  const profileRes = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const kakaoProfile = profileRes.data;
  const kakaoId = kakaoProfile.id;
  const account = kakaoProfile.kakao_account || {};

  const email = ensureEmail(account.email, kakaoId);
  const name =
    account.profile?.nickname ||
    account.name ||
    `kakao_user_${String(kakaoId).slice(-4)}`;

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({
      name,
      email,
      password: generateSocialPassword(kakaoId),
      phone: account.phone_number || undefined,
    });
  }

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: signToken(user._id),
    provider: "kakao",
  };
};
// authService.js 파일에 추가

export const googleLogin = async ({ code, redirectUri }) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const finalRedirectUri =
    redirectUri || process.env.GOOGLE_CALLBACK_URI || "";

  if (!clientId || !clientSecret || !finalRedirectUri) {
    const err = new Error("GOOGLE_OAUTH_CONFIG_MISSING");
    err.statusCode = 500;
    throw err;
  }

  // 1) 토큰 발급 (Access Token, ID Token 획득)
  const tokenParams = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: clientId,
    client_secret: clientSecret, // Google은 Client Secret이 필수입니다.
    redirect_uri: finalRedirectUri,
    code,
  });

  const tokenRes = await axios.post(
    "https://oauth2.googleapis.com/token", // Google 토큰 엔드포인트
    tokenParams,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

  const { access_token: accessToken } = tokenRes.data;
  if (!accessToken) {
    const err = new Error("GOOGLE_TOKEN_FAILED");
    err.statusCode = 400;
    throw err;
  }

  // 2) 사용자 정보 조회
  // Google은 사용자 정보(profile)를 가져오는 별도의 엔드포인트를 사용합니다.
  const profileRes = await axios.get(
    "https://www.googleapis.com/oauth2/v2/userinfo", 
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  const googleProfile = profileRes.data;
  const googleId = googleProfile.id;
  const email = googleProfile.email; // Google은 이메일을 명확히 제공하는 편입니다.
  const name = googleProfile.name || `google_user_${String(googleId).slice(-4)}`;

  // 3) DB 처리: 사용자 찾기 또는 생성
  let user = await User.findOne({ email });

  // DB에 사용자가 없으면 신규 생성
  if (!user) {
    user = await User.create({
      name,
      email,
      password: generateSocialPassword(googleId),
      // Google Profile에서 전화번호를 직접 가져오려면 별도 API 스코프가 필요할 수 있습니다.
    });
  }

  // 4) JWT 반환 및 로그인 처리
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: signToken(user._id),
    provider: "google",
  };
};