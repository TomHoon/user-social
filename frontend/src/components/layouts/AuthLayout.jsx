import { Outlet } from "react-router-dom";

const AuthLayout = ({ children }) => {
  return <section className="auth-layout">{children || <Outlet />}</section>;
};

export default AuthLayout;
