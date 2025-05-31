import React from "react";
import "./OrderCard.css";
import wishCardImg from "../../images/WishListImg.svg";
import orderCardIcon from "../../images/orderCardIcon.svg";
import carticon from "../../images/whiteshopping-cart-01.svg";
import delIcon from "../../images/DelIcon.svg";
const OrderCard = ({ orders, selectedTab }) => {
  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleString("default", { month: "long" })} ${String(
      date.getDate()
    ).padStart(2, "0")}, ${date.getFullYear()}`;
  };

  return (
    <>
      <div className="OrderCard-main flex flex-col gap-[16px]">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              className="bg-[#1B1B1B]  px-[24px] pt-[24px] pb-[27px] rounded-[16px]"
              key={order._id}
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-[21px] mb-[24px] border-b  border-[#262626] lg:flex-col lg:flex-wrap">
                <h2 className="text-white font-[600] font-[Poppins] text-[18px] leading-[28px]">
                  {/* {selectedTab
                    .split("-")
                    .map((word) => word[0].toUpperCase() + word.slice(1))
                    .join(" ")} */}
                    Delivered
                </h2>
                <div className="flex items-center gap-6 text-gray-400 text-sm md:flex-wrap">
                  <span className="font-[400] font-[Poppins] text-[18px] leading-[28px] text-[#A8AEBFFF]">
                    Order Date: {getFormattedDate(order.orderDate)}
                  </span>
                  <span className="font-[400] font-[Poppins] text-[18px] leading-[28px] text-[#A8AEBFFF]">
                    Order ID: {order.orderId}
                  </span>
                  <button className="flex items-center gap-1 font-[400] font-[Poppins] text-[18px] leading-[28px] text-[#A8AEBFFF]" >
                    Order Detail
                    <img
                      className="w-[20px] h-[20px]"
                      src={orderCardIcon}
                      alt=""
                    />
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="flex items-center justify-between md:flex-col gap-[16px]">
                <div className="flex items-center gap-4 md:w-[100%]">
                  {/* Placeholder div instead of image */}
                  <div className="">
                    <img
                      className="w-[100px] h-[100px] object-cover rounded-[16px]"
                      src={wishCardImg}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-white font-[500] font-[Poppins] text-[16px] leading-[27px]">
                      {/* {order.items[0].product.name} */}
                    </h3>
                    <p className="text-white font-[500] font-[Poppins] text-[18px] leading-[27px] mb-[0px]">
                      ${order.totalAmount}{" "}
                      <span className="text-white font-[500] font-[Poppins] text-[18px] leading-[27px] mx-1">
                        {/* × */}
                      </span>{" "}
                      {/* {order.totalItems} */}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 md:flex-col md:w-[100%]">
                  <div className="md:w-[100%]">
                    {/* <div className="red-border cursor-pointer w-[198px] md:w-[100%] h-[46px] flex justify-center items-center gap-[8px] rounded-[100px]   text-[#D11A2AFF] font-[500] font-[Poppins] text-[16px] leading-[12px]">
                    <img
                      className="ShopCards-carticon w-[24px] h-[24px]"
                      src={delIcon}
                      alt=""
                    />
                    Remove
                  </div> */}
                  </div>
                  <div className="md:w-[100%]">
                    {/* <div className="red-border cursor-pointer w-[198px] md:w-[100%] h-[46px] flex justify-center items-center gap-[8px] rounded-[100px] bg-[#FD4960FF]   text-white font-[500] font-[Poppins] text-[16px] leading-[12px]">
                    <img
                      className="ShopCards-carticon w-[24px] h-[24px]"
                      src={carticon}
                      alt=""
                    />
                    Add to Cart
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-[#1B1B1B]  px-[24px] pt-[24px] pb-[27px] rounded-[16px]">
            <div className="flex justify-center items-center text-white font-[500] font-[Poppins] text-[18px] leading-[27px]">
              No orders found
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderCard;
