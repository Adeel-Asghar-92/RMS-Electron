import React from "react";
import UserSecurity from "../../../Components/UserProfile/Security/Security";
import UserGeneralInfo from "../../../Components/UserProfile/GeneralInfo/GeneralInfo";
import PaymentInfo from "../../../Components/UserProfile/PaymentInfo/PaymentInfo";
import "./userProfile.css";
import UserProfileBanner from "../../../Components/UserProfile/Banner/UserProfileBanner";

const UserProfile = () => {
  return (
    <div className="flex flex-col text-white  font-[poppins]">
      <h5 className="text-2xl font-semibold mb-4">
        Profile <span className="text-[#FF1B6B]">Information</span>
      </h5>
      <p className="text-[#BBBBBB] text-lg mb-6">Manage your profile details</p>

      {/* Profile Banner */}
      <UserProfileBanner />

      {/* General Information */}
      <UserGeneralInfo />

      {/* Security */}
      <UserSecurity />

      {/* Payment Information */}
      <PaymentInfo />
    </div>
  );
};

export default UserProfile;
