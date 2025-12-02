import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import MyProfile from "../../components/mypage/MyProfile";
import "../../styles/pages/mypage/MyAccountPage.scss";

const MyAccountPage = () => {
 const { user, setUser } = useContext(AuthContext);
 const [isEditing, setIsEditing] = useState({
  name: false,
  email: false,
  password: false,
  phone: false,
  address: false,
  dateOfBirth: false,
 });

 const [formData, setFormData] = useState({
  name: user?.name || "",
  email: user?.email || "",
  password: "************",
  phone: user?.phone || "",
  address: "경기도 화성시 화옹로 도메이아파트 101동 101호",
  dateOfBirth: "1999-99-99",
 });

 const handleChange = (field) => {
  setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
 };

 const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
 };

 const handleSave = (field) => {
  // 저장 로직 (API 호출 등)
  setIsEditing((prev) => ({ ...prev, [field]: false }));

  // user 정보 업데이트
  if (field === "name" || field === "email" || field === "phone") {
   const updatedUser = { ...user, [field]: formData[field] };
   setUser(updatedUser);
   localStorage.setItem("user", JSON.stringify(updatedUser));
  }
 };

 return (
  <div className="account-page">



   <div className="account-content">
    <h2 className="account-title">Account</h2>

    <div className="account-form">
     {/* Name */}
     <div className="form-field">
      <label className="field-label">Name</label>
      <div className="field-input-wrapper">
       <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        disabled={!isEditing.name}
        className="field-input"
       />
       <button
        className="change-button"
        onClick={() =>
         isEditing.name ? handleSave("name") : handleChange("name")
        }
       >
        🔒 {isEditing.name ? "Save" : "Change"}
       </button>
      </div>
     </div>

     {/* Email */}
     <div className="form-field">
      <label className="field-label">Email</label>
      <div className="field-input-wrapper">
       <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        disabled={!isEditing.email}
        className="field-input"
       />
       <button
        className="change-button"
        onClick={() =>
         isEditing.email ? handleSave("email") : handleChange("email")
        }
       >
        🔒 {isEditing.email ? "Save" : "Change"}
       </button>
      </div>
     </div>

     {/* Password */}
     <div className="form-field">
      <label className="field-label">Password</label>
      <div className="field-input-wrapper">
       <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        disabled={!isEditing.password}
        className="field-input"
       />
       <button
        className="change-button"
        onClick={() =>
         isEditing.password ? handleSave("password") : handleChange("password")
        }
       >
        🔒 {isEditing.password ? "Save" : "Change"}
       </button>
      </div>
     </div>

     {/* Phone number */}
     <div className="form-field">
      <label className="field-label">Phone number</label>
      <div className="field-input-wrapper">
       <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        disabled={!isEditing.phone}
        className="field-input"
       />
       <button
        className="change-button"
        onClick={() =>
         isEditing.phone ? handleSave("phone") : handleChange("phone")
        }
       >
        🔒 {isEditing.phone ? "Save" : "Change"}
       </button>
      </div>
     </div>

     {/* Address */}
     <div className="form-field">
      <label className="field-label">Address</label>
      <div className="field-input-wrapper">
       <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        disabled={!isEditing.address}
        className="field-input"
       />
       <button
        className="change-button"
        onClick={() =>
         isEditing.address ? handleSave("address") : handleChange("address")
        }
       >
        🔒 {isEditing.address ? "Save" : "Change"}
       </button>
      </div>
     </div>

     {/* Date of birth */}
     <div className="form-field">
      <label className="field-label">Date of birth</label>
      <div className="field-input-wrapper">
       <input
        type="text"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleInputChange}
        disabled={!isEditing.dateOfBirth}
        className="field-input"
       />
       <button
        className="change-button"
        onClick={() =>
         isEditing.dateOfBirth
          ? handleSave("dateOfBirth")
          : handleChange("dateOfBirth")
        }
       >
        🔒 {isEditing.dateOfBirth ? "Save" : "Change"}
       </button>
      </div>
     </div>
    </div>
   </div>

   <div className="subscription-section">
    <h3 className="subscription-title">구독서비스</h3>
    <p className="subscription-subtitle">신청해보세요</p>
   </div>
  </div>
 );
};

export default MyAccountPage;
