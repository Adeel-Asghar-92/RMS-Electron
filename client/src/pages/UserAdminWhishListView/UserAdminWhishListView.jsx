import React from "react";
import AdminWrapper from "../../Components/AdminWrapper/AdminWrapper";
import WishList from "../../Components/WishList/WishList";
const UserAdminWhishListView = () => {
  return (
    <>
      <AdminWrapper>
        <div className="admin-body no-scrollbar p-[32px] overflow-y-auto">
          <WishList />
        </div>
      </AdminWrapper>
    </>
  );
};

export default UserAdminWhishListView;
