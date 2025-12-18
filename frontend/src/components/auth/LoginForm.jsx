import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../api/userClient";
// import "../../styles/components/auth/LoginForm.scss";
import { RiKakaoTalkFill } from "react-icons/ri";
import { RiGoogleFill } from "react-icons/ri";
const LoginForm = () => {
 const [formData, setFormData] = useState({
  email: "",
  password: "",
  rememberMe: false,
 });
 const KAKAO_AUTH_URL =
  import.meta.env.KAKAO_AUTH_URL || `${import.meta.env.VITE_API_BASE_URL}/auth/kakao`;
 const GOOGLE_AUTH_URL =
  import.meta.env.GOOGLE_AUTH_URL || `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
 const [error, setError] = useState("");
 const [isLoading, setIsLoading] = useState(false);
 const { login } = useContext(AuthContext);
 const navigate = useNavigate();

 const handleInputChange = (e) => {
  const { name, value, type, checked } = e.target;
  setFormData((prev) => ({
   ...prev,
   [name]: type === "checkbox" ? checked : value,
  }));
  // 입력 시 에러 메시지 초기화
  setError("");
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  try {
   // 실제 API 호출
   const response = await loginUser({
    email: formData.email,
    password: formData.password,
   });

   // 로그인 성공
   if (response) {
    login(response);
    // 홈으로 이동
    navigate("/");
   }
  } catch (err) {
   // 로그인 실패
   setError(
    err.message || "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요."
   );
  } finally {
   setIsLoading(false);
  }
 };

 const handleSocialLogin = (provider) => {
  // 소셜 로그인 로직 구현 예정
  console.log(`${provider} login`);
 };

 const handleTempLogin = () => {
  // 임시 로그인 - 별도 인증 없이 바로 로그인
  const tempUser = {
   id: 999,
   email: "temp@user.com",
   name: "임시사용자",
   phone: "010-0000-0000",
   profileImage: null,
   createdAt: new Date().toISOString().split("T")[0],
  };

  const tempToken = "temp-token-" + Date.now();

  // 로그인 처리
  login(tempUser);
  localStorage.setItem("accessToken", tempToken);

  // 마이페이지로 이동
  navigate("/mypage");
 };

 return (
  <div className="common-form">
   <div className="form-header">
    <h1 className="form-title">Login</h1>
    <p className="form-subtitle">로그인하세요</p>
   </div>

   <form className="form-content" onSubmit={handleSubmit}>
    {error && <div className="error-message">{error}</div>}
    <div className="form-group">
     <label className="form-label">Email</label>
     <input
      type="email"
      name="email"
      className="form-input"
      placeholder="user@test.com"
      value={formData.email}
      onChange={handleInputChange}
      required
     />
    </div>
    <div className="form-group">
     <label className="form-label">Password</label>
     <div className="password-input-wrapper">
      <input
       type="password"
       name="password"
       className="form-input"
       placeholder="1234"
       value={formData.password}
       onChange={handleInputChange}
       required
      />
      <button type="button" className="password-toggle">
       👁️
      </button>
     </div>
    </div>
    <div className="form-options">
     <label className="checkbox-wrapper">
      <input
       type="checkbox"
       name="rememberMe"
       checked={formData.rememberMe}
       onChange={handleInputChange}
      />
      <span className="checkbox-label">비밀번호 기억하기</span>
     </label>
     <a href="#" className="forgot-password">
      Forgot Password?
     </a>
    </div>
    <button
     type="submit"
     className="btn btn--primary btn--block"
     disabled={isLoading}
    >
     {isLoading ? "로그인 중..." : "Login"}
    </button>{" "}
    <div className="divider">
     <span className="divider-text">회원가입하세요</span>
    </div>
    <button
     type="button"
     onClick={() => navigate("/signup")}
     className="btn btn--accent btn--block"
    >
     Sign Up
    </button>
    <div className="social-login">
     <p className="social-login-text">Or login with</p>
     <div className="social-buttons">
      <a href={GOOGLE_AUTH_URL} className="btn--social google ">
       <RiGoogleFill />
      </a>
      <a className="btn--social apple" href={KAKAO_AUTH_URL}>
       <RiKakaoTalkFill />
      </a>
     </div>
    </div>
   </form>
  </div>
 );
};

export default LoginForm;
