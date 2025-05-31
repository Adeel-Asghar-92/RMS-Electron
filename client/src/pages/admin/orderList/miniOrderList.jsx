import React, { useEffect, useState } from "react";
import SearchIcon from "../../../images/search.svg";
import Printer from "../../../images/printer.svg";
import DeleteIcon from "../../../images/delete.svg";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../utils/axios";
import { toastError, toastSuccess } from "../../../utils/toasts";
import { amountFormat } from "../../../utils/amountFormat";
import { getFormattedDateWithTime } from "../../../utils/date";
import { printBill } from "../showCase/actions";
const MiniOrderList = ({ setOrderToken, refetch }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchOrders = () => {
    setLoading(true);
    axiosInstance
      .get("/orders", {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("admin_auth_token"),
        },
        params: {
          orderId: searchTerm,
          limit: 25,
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
    if (refetch) fetchOrders();
  }, [refetch]);

  const deleteOrder = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setLoading(true);
      axiosInstance
        .delete(`/orders/${orderId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("admin_auth_token"),
          },
        })
        .then(() => {
          fetchOrders();
          toastSuccess("Order deleted successfully");
        })
        .catch((err) => {
          toastError(err.response?.data?.message || "Something went wrong");
          setLoading(false);
        });
    }
  };
  return (
    <div className="text-black">
      {loading ? (
        <div className="flex justify-center py-6">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="h-[267px]  overflow-y-auto ">
          <table className="w-full lg:absolute lg:top-0 lg:left-0 lg:h-[100%] lg:w-[150%] sm:!w-[427%]">
            <thead>
              <tr className="text-left text-[#A8AEBF]">
                <td className="p-2">Order Id</td>
                <td className="p-2">Total</td>
                <td className="p-2">Action</td>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className={`border-t border-gray-700 hover:bg-gray-100 ${
                      order.paymentStatus === "paid"
                        ? ""
                        : "text-rose font-semibold"
                    }`}
                    // onClick={() => navigate(`/admin/orderDetail/${order._id}`)}
                  >
                    <td
                      className="p-2"
                      onClick={
                        order.paymentStatus === "paid"
                          ? () => setOrderToken(order.orderId)
                          : undefined
                      }
                    >
                      {order.orderId}
                    </td>
                    <td
                      className="p-2"
                      onClick={
                        order.paymentStatus === "paid"
                          ? () => setOrderToken(order.orderId)
                          : undefined
                      }
                    >
                      {amountFormat(order.totalAmount)}
                    </td>
                    <td className="p-2 flex gap-2">
                      {order.paymentStatus === "paid" ? (
                        <>
                          <img
                            src={DeleteIcon}
                            alt=""
                            width={25}
                            className="cursor-pointer"
                            onClick={() => deleteOrder(order._id)}
                          />{" "}
                          <img
                            src={Printer}
                            alt=""
                            width={25}
                            className="cursor-pointer"
                            onClick={() => printBill(order)}
                          />{" "}
                        </>
                      ):(
                        "Canceled"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-2 text-center">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MiniOrderList;
