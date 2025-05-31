import React, { useEffect, useState } from "react";
import SearchIcon from "../../../images/search.svg";
// import ActionIcon from "../../../images/actionIcon.svg";
import ActionIcon from "../../../images/eye.svg";
import Printer from "../../../images/printer.svg";
import LeftIcon from "../../../images/chevron-right.svg";
import RightIcon from "../../../images/chevron-right (1).svg";
import DeleteIcon from "../../../images/delete.svg";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../utils/axios";
import { toastError, toastSuccess } from "../../../utils/toasts";
import Loader from "../../../Components/UI/Loaders/loader";
import { amountFormat } from "../../../utils/amountFormat";
import { getFormattedDateWithTime } from "../../../utils/date";
import { printBill } from "../showCase/actions";
const OrderList = () => {
  const navigate = useNavigate();
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
          limit: 100,
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
    <div className="bg-white shadow rounded-2xl p-6 text-black">
      <div className="flex justify-between items-center mb-6 md:flex-col md:gap-[16px]">
        <h3 className="text-lg font-semibold"></h3>
        <div className="relative md:w-[300px]">
          {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
          <img
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A8AEBF]"
            src={SearchIcon}
            alt=""
            srcset=""
          />
          <input
            type="text"
            placeholder="Search By Order Id"
            className="p-[10px] pl-12 rounded-full border-1 border-[#474C59] bg-transparent  placeholder:text-base placeholder:font-medium placeholder:text-[#474C59] w-[484px] md:w-[300px]"
            // value={searchTerm}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchTerm(e.target.value);
              }
            }}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-6">
          <Loader />
        </div>
      ) : (
        <div className="lg:relative lg:h-[267px]  overflow-y-auto ">
          <table className="w-full lg:absolute lg:top-0 lg:left-0 lg:h-[100%] lg:w-[150%] sm:!w-[427%]">
            <thead>
              <tr className="text-left text-[#A8AEBF]">
                <td className="p-2">Order Id</td>
                <td className="p-2">Date</td>
                <td className="p-2">Total</td>
                <td className="p-2">Payment Status</td>
                {/* <td className="p-2">Items</td> */}
                <td className="p-2">Action</td>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-t border-gray-700"
                    // onClick={() => navigate(`/admin/orderDetail/${order._id}`)}
                  >
                    <td className="p-2">{order.orderId}</td>
                    <td className="p-2">
                      {getFormattedDateWithTime(order.updatedAt)}
                    </td>
                    <td className="p-2">{amountFormat(order.totalAmount)}</td>
                    <td className="p-2">
                      <span
                        className={`px-3 py-2 rounded-full ${
                          order.paymentStatus === "paid"
                            ? "bg-[#20C37529] text-[#20C375]"
                            : "bg-[#F5222D29] text-[#F5222D]"
                        }`}
                      >
                        {order.paymentStatus?.charAt(0).toUpperCase() +
                          order.paymentStatus.slice(1)}
                      </span>
                    </td>
                    {/* <td className="p-2">{order.items.length}</td> */}

                    <td className="p-2 flex gap-2">
                      {/* <button
                        className="px-1.5 py-1 rounded-full bg-secondary text-white"
                        >
                        {" "} */}
                      <img
                        src={DeleteIcon}
                        alt=""
                        width={25}
                        className="cursor-pointer"
                        onClick={() => deleteOrder(order._id)}
                        />{" "}
                      <img
                        src={ActionIcon}
                        alt=""
                        width={25}
                        className="cursor-pointer"
                        onClick={() =>
                          navigate(`/admin/orderDetail/${order._id}`)
                        }
                      />{" "}
                      {/* </button> */}
                      {/* <button className="px-1.5 py-1 rounded-full bg-secondary text-white"> */}{" "}
                      <img
                        src={Printer}
                        alt=""
                        width={25}
                        className="cursor-pointer"
                        onClick={() => printBill(order)}
                      />{" "}
                      {/* </button> */}
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
      <div className="flex justify-between items-center mt-4 md:flex-col md:gap-[16px]">
        <div className="text-[#BBBBBB]">
          {`Showing ${orders.length} entries`}
        </div>
        <div className="flex space-x-2">
          <button
            className="paginationIcons bg-[#262626]"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <img src={LeftIcon} alt="" srcset="" />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i + 1}
              className={`paginationItem ${
                i + 1 === currentPage ? "bg-[#FD4960]" : ""
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="paginationIcons bg-[#262626]"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <img src={RightIcon} alt="" srcset="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
