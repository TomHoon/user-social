import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/userClient";
import { RiKakaoTalkFill } from "react-icons/ri";
import { RiGoogleFill } from "react-icons/ri";
const SignupForm = () => {
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
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

    // 기본 검증
    if (!formData.nickname || !formData.email || !formData.password) {
      setError("모든 필수 필드를 입력해주세요.");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      setIsLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError("약관에 동의해주세요.");
      setIsLoading(false);
      return;
    }

    try {
      // 실제 API 호출
      await registerUser({
        name: formData.nickname,
        email: formData.email,
        password: formData.password,
        phone: formData.phoneNumber,
      });

      // 회원가입 성공 - 로그인 페이지로 이동
      alert("회원가입이 완료되었습니다. 로그인해주세요.");
      navigate("/login");
    } catch (err) {
      setError(err.message || "회원가입에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    // 소셜 회원가입 로직 구현 예정
    console.log(`${provider} signup`);
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setPasswordVisible(!passwordVisible);
    } else if (field === "confirmPassword") {
      setConfirmPasswordVisible(!confirmPasswordVisible);
    }
  };

  return (
    <div className="common-form signup-form">
      <div className="form-header">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/login")}
        >
          ← Back to login
        </button>
        <h1 className="form-title">Sign up</h1>
        <p className="form-subtitle">회원가입</p>
      </div>

      <form className="form-content" onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">닉네임</label>
            <input
              type="text"
              name="nickname"
              className="form-input"
              placeholder="john.doe"
              value={formData.nickname}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="john.doe@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              className="form-input"
              placeholder="010-1234-5678"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <div className="password-input-wrapper">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              className="form-input"
              placeholder="••••••••••••"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => togglePasswordVisibility("password")}
            >
              {passwordVisible ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <div className="password-input-wrapper">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              className="form-input"
              placeholder="••••••••••••"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => togglePasswordVisibility("confirmPassword")}
            >
              {confirmPasswordVisible ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <div className="form-options">
          <label className="checkbox-wrapper">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              required
            />
            <span className="checkbox-label">약관에 동의</span>
          </label>
        </div>

        <button
          type="submit"
          className="btn btn--primary btn--block"
          disabled={isLoading}
        >
          {isLoading ? "가입 중..." : "회원 가입"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/add-payment")}
          className="btn  btn--block btn--outline"
        >
          결제 수단 등록하기
        </button>

        <div className="divider">
          <span className="divider-text">회원가입</span>
        </div>

        <div className="social-login">
          <p className="social-signup-text">Or Sign up with</p>
          <div className="social-buttons">

            <button
              type="button"
              className="btn--social google "
              onClick={() => handleSocialSignup("google")}
            >
             <RiGoogleFill />
            </button>
            <button
              type="button"
              className="btn--social apple"
              onClick={() => handleSocialSignup("apple")}
            >
          <RiKakaoTalkFill />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
