import { User } from "./model.js";

// 사용자 프로필 조회
export const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    const err = new Error("USER_NOT_FOUND");
    err.statusCode = 404;
    throw err;
  }
  return user;
};

// 사용자 프로필 수정
export const updateUserProfile = async (userId, updateData) => {
  const { name, phone } = updateData;
  const user = await User.findById(userId);

  if (!user) {
    const err = new Error("USER_NOT_FOUND");
    err.statusCode = 404;
    throw err;
  }

  if (name) user.name = name;
  if (phone) user.phone = phone;

  await user.save();

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };
};

// 비밀번호 변경
export const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId);

  if (!user) {
    const err = new Error("USER_NOT_FOUND");
    err.statusCode = 404;
    throw err;
  }

  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) {
    const err = new Error("CURRENT_PASSWORD_INCORRECT");
    err.statusCode = 401;
    throw err;
  }

  user.password = newPassword;
  await user.save();

  return { message: "PASSWORD_CHANGED" };
};

// 사업자 신청
export const applyBusiness = async (userId, businessInfo) => {
  const user = await User.findById(userId);
  if (!user) {
    const err = new Error("USER_NOT_FOUND");
    err.statusCode = 404;
    throw err;
  }

  if (user.role === "owner") {
    const err = new Error("ALREADY_OWNER");
    err.statusCode = 400;
    throw err;
  }

  user.businessInfo = businessInfo;
  user.businessStatus = "pending";
  await user.save();

  return {
    email: user.email,
    businessStatus: user.businessStatus,
  };
};

// 사업자 신청 상태 조회
export const getBusinessStatus = async (userId) => {
  const user = await User.findById(userId).select(
    "businessStatus businessInfo"
  );
  if (!user) {
    const err = new Error("USER_NOT_FOUND");
    err.statusCode = 404;
    throw err;
  }
  return {
    businessStatus: user.businessStatus,
    businessInfo: user.businessInfo,
  };
};
