import React from "react";
import "./AdminSidebar.css";
import { Link, useLocation } from "react-router-dom";
import Icon from "../../images/AdminSidebaricon.svg";
import Logo from "../../images/chamanLogo.png";
// const sidebarItems = [
//   { label: "Profile", path: "/user-profile", icon: Icon },
//   { label: "Wish List", path: "/user-whish-list", icon: Icon },
//   { label: "Order History", path: "/user-order-history", icon: Icon },
//   { label: "Log Out", path: "/", icon: Icon },
// ];

const AdminSidebar = ({ sidebarItems, logo }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="AdminSidebar-otr  h-[100vh] bg-secondary XL:!hidden">
      <div className="AdminSidebar-inr">
        <div className="AdminSidebar-logo-otr h-[94px] flex items-center justify-center">
           <img className="AdminSidebar-logo mt-2" src={Logo} alt="Logo"  width={150}/>
        </div>
        <ul className="AdminSidebar-ul !p-[24px] flex flex-col gap-[24px]">
          {sidebarItems &&
            sidebarItems.map((item, index) => (
              <li key={index} className="AdminSidebar-li">
                <Link
                  to={item.path}
                  className={`AdminSidebar-a py-[10px] px-[16px] rounded-[8px] flex items-center gap-[12px] ${
                    isActive(item.path) ? "bg-accent" : ""
                  }`}
                >
                  <img className="AdminSidebar-icon" src={item.icon} alt="" />
                  <p className={`font-[500] text-[16px] leading-[24px] font-[Poppins] mb-[0px]  text-white`}>
                    {item.label}
                  </p>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
