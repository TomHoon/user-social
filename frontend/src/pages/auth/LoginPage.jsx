import React, { useContext, useEffect } from "react";
import LoginForm from "../../components/auth/LoginForm";
import AuthImageWrap from "../../components/auth/AuthImageWrap";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { isAuthed } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthed) {
      navigate("/", { replace: true }); // 또는 navigate("/")
    }
  }, [isAuthed, navigate]);

  return (
    <div className="auth-layout-page">
      <div className="auth-layout-container">
        <div className="auth-layout-content">
          <div className="auth-layout-form-section">
            <LoginForm />
          </div>
          <div className="auth-layout-image-section">
            <AuthImageWrap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
