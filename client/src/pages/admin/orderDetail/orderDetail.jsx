import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../utils/axios";
import { toastError } from "../../../utils/toasts";
import Loader from "../../../Components/UI/Loaders/loader";
import { amountFormat } from "../../../utils/amountFormat";
import { getFormattedDate } from "../../../utils/date";
import CustomerImage from "../../../images/customerImage.svg";

const OrderDetail = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(`/orders/${orderId}`, {
          headers: {
            Authorization: localStorage.getItem("admin_auth_token"),
          },
        });
        setOrder(data);
      } catch (err) {
        toastError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <Loader />;

  if (!order) return <p>Order not found</p>;

  const orderItems = order.items;

  return (
    <>
      <div className="grid grid-cols-3 md:grid-cols-1 gap-[16px] lg:flex lg:flex-col text-black">
        <div className="col-span-2 bg-white shadow rounded-2xl p-6">
          <p className="text-lg font-semibold text-secondary">
            All <span className="text-rose"> Items</span>
          </p>
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-[#8f939b] border-b border-[#232323]">
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Rate</th>
                <th className="px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item) => (
                <tr key={item._id} className="border-b border-[#232323]">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">{amountFormat(item.price)}</td>
                  <td className="px-4 py-2">
                    {amountFormat(item.quantity * item.price)}
                  </td>
                </tr>
              ))}
              <tr className="bg-secondary text-white">
                <td colSpan={3} className="px-4 py-2 text-left">
                  Total
                </td>
                <td className="px-4 py-2">{amountFormat(order.totalAmount)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* <div className="space-y-6"> */}
        <div className="flex flex-col  md:justify-center md:items-center  gap-[16px]">
          <div className="bg-white shadow rounded-2xl p-6 w-full">
            <p className="text-lg font-semibold mb-8">Summary</p>
            <div className="space-y-2 text-[#8f939b]">
              <div className="flex justify-between">
                <span>Order ID</span>
                <span className="font-medium font-white">{order.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span>Date</span>
                <span className="font-medium font-white">
                  {getFormattedDate(order.updatedAt)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount</span>
                <span className="text-[#FD4960] font-bold">
                  {amountFormat(order.totalAmount)}
                </span>
              </div>
            </div>
          </div>

        

          {/* <div className="bg-white rounded-2xl p-6 w-full">
            <p className="text-lg font-semibold mb-8">Shipping Address</p>
            <p>{order.shippingAddress}</p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
