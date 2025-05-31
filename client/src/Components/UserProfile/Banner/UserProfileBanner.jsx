import React from "react";
import Boy from "../../../images/boy.svg";
import EditIcon from "../../../images/edit-3.svg";

const UserProfileBanner = () => {
  return (
    <div className="bg-[#1B1B1B] rounded-[18px] h-[194px] profile-header mb-4">
        <div className="flex flex-col items-center bg-gradient-to-r from-[#FF1B6B] to-[#2472FC] rounded-lg p-6 mb-6 h-[104px]">
          <img
            src={Boy}
            alt="John Smith"
            className="w-20 h-20 rounded-full mb-[18px] mt-[17px]"
          />
          <p className="text-base leading-5 font-normal flex justify-between gap-2">
            <span>John Smith </span> <img src={EditIcon} alt="" />
          </p>
        </div>
      </div>
  );
};

export default UserProfileBanner;
