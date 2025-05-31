import React from "react";
import AdminWrapper from "../../Components/AdminWrapper/AdminWrapper";
import OrderHistory from "../../Components/OrderHistory/OrderHistory";
const UserAdminOrderHistoryView = () => {
  return (
    <>
      <AdminWrapper>
        <div className="admin-body no-scrollbar p-[32px] overflow-y-auto">
          <OrderHistory />
        </div>
      </AdminWrapper>
    </>
  );
};

export default UserAdminOrderHistoryView;
