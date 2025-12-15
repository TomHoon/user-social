import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
 {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  phone: { type: String },
  address: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  // ✨ 소셜 로그인 관련 필드 추가 시작 ✨
  provider: {
   // 가입 경로 (예: 'local', 'google', 'kakao')
   type: String,
   required: true,
   default: "local", // 기본값을 'local'로 설정
   enum: ["local", "google", "kakao"],
  },
  socialId: {
   // 소셜 플랫폼에서 부여한 고유 ID (예: Google ID, Kakao ID)
   type: String,
   sparse: true, // 값이 있을 때만 unique 검사를 수행
  },
 },
 {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
 }
);

userSchema.pre("save", async function (next) {
 if (!this.isModified("password")) return next();
 const salt = await bcrypt.genSalt(10);
 this.password = await bcrypt.hash(this.password, salt);
 next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
 return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.set("toJSON", {
 virtuals: true,
 transform: (_doc, ret) => {
  ret.id = ret._id;
  ret.userId = ret._id;
  delete ret._id;
  delete ret.__v;
  delete ret.password;
 },
});

export const User = mongoose.model("User", userSchema);
export default User;
