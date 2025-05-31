import React from "react";
import AdminWrapper from "../../Components/AdminWrapper/AdminWrapper";
import UserProfile from "../user/userProfile/userProfile";
const UserAdminprofileView = () => {
  return (
    <>
      <AdminWrapper>
        <div className="admin-body no-scrollbar p-[32px] overflow-y-auto">
          <UserProfile />
        </div>
      </AdminWrapper>
    </>
  );
};

export default UserAdminprofileView;
