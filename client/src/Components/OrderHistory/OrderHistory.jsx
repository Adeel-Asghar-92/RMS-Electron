import React, { useEffect, useState } from "react";
import "./OrderHistory.css";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import arrowDown from "../../images/OrderDropDownchevron-down.svg";
import searchIcon from "../../images/OrderSearchIcon.svg";
import OrderCard from "../OrderCard/OrderCard";
import { axiosInstance } from "../../utils/axios";
import { toastError } from "../../utils/toasts";
import Loader from "../UI/Loaders/loader";
const OrderHistory = () => {
  const renderTabContent = () => (
    <div className="mt-4">
      {/* Search and filter */}
      <div className="flex justify-between lg:flex-col lg:gap-[16px]">
        <div className="relative w-[697px] lg:w-[100%] bg-white rounded-100px h-[50px] pl-[16px] pr-[40px] flex  items-center rounded-[100px]">
          <input
            type="text"
            placeholder="Order ID"
            className="w-[100%] focus:outline-none font-[400] font-[Poppins] text-[14px] leading-[24px] text-[#555555FF]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            src={searchIcon}
          />
        </div>

        <div className="w-[175px] lg:w-[100%] h-[50px] bg-white rounded-[100px] flex items-center justify-between px-[18px] cursor-pointer">
          <p className="font-[400] font-[Poppins] text-[14px] leading-[24px] mb-[0px]">
            All/Last year
          </p>
          <img src={arrowDown} alt="" />
        </div>
      </div>

      {/* Orders list */}
    </div>
  );

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all-orders");
  const fetchOrders = () => {
    const token = localStorage.getItem("auth_token");
    setLoading(true);
    axiosInstance
      .get("/orders/byCustomerId", {
        headers: {
          Authorization: `${token}`,
        },
        params: {
          orderId: searchTerm,
          limit: 50,
          page: currentPage,
        },
      })
      .then(({ data }) => {
        setOrders(data.results);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        toastError(err.response?.data?.message || "Something went wrong");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, searchTerm]);

  return (
    <>
      {loading && <Loader />}
      <div className="OrderHistory-main mb-[24px]">
        <p className="WishList-heading font-[Poppins] font-[600] text-[24px] leading-[24px] text-white">
          Order <span className="text-[#e9425f]">History</span>
        </p>

        <div className="Order-History-tabs p-[24px] rounded-[16px] bg-[#1B1B1B]">
          <Tabs defaultActiveKey="all-orders" className="mb-3">
            <Tab
              eventKey="all-orders"
              title="All Orders"
              onSelect={() => setSelectedTab("all-orders")}
            ></Tab>
            <Tab
              eventKey="cancelled-orders"
              title="Cancelled Orders"
              onSelect={() => setSelectedTab("cancelled-orders")}
            ></Tab>
            <Tab
              eventKey="expired-orders"
              title="Expired Orders"
              onSelect={() => setSelectedTab("expired-orders")}
            ></Tab>
            <Tab
              eventKey="completed"
              title="Delivered Orders"
              onSelect={() => setSelectedTab("completed")}
            ></Tab>
            <Tab
              eventKey="pending-orders"
              title="Pending Orders"
              onSelect={() => setSelectedTab("pending-orders")}
            ></Tab>
          </Tabs>
          {renderTabContent()}
        </div>
      </div>
      {orders.length > 0 &&
        (selectedTab === "completed" || selectedTab === "all-orders") && (
          <OrderCard orders={orders} selectedTab={selectedTab} />
        )}
      {orders.length === 0 &&
        (selectedTab === "pending-orders" ||
          selectedTab === "cancelled-orders" ||
          selectedTab === "expired-orders") && (
          <div className="flex justify-center items-center h-full">
            <p className="text-white font-[400] font-[Poppins] text-[18px] leading-[28px]">
              No orders found
            </p>
          </div>
        )}
    </>
  );
};

export default OrderHistory;
