import React from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import CartImage from "../../../images/cart-item.png";
import minus from "../../../images/AddToCartMinus.svg";
import plus from "../../../images/AddToCartPlus.svg";
import close from "../../../images/AddToCartClose.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../../Redux/cart/cartSelectors";
import { removeFromCart, updateQuantity } from "../../../Redux/cart/cartSlice";
import { amountFormat } from "../../../utils/amountFormat";
const AddToCart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const subTotal = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  const handleAddQuantity = (product) => {
    dispatch(updateQuantity({ product, quantity: product.orderQuantity + 1 }));
  };
  const handleReduceQuantity = (product) => {
    dispatch(updateQuantity({ product, quantity: product.orderQuantity - 1 }));
  };
  const handleRemoveItem = (productId) => {
    console.log("productId", productId);
    dispatch(removeFromCart({ productId }));
  };

  const handleCheckout = () => {
    if (subTotal > 0) {
      navigate("/payment");
    }
  };
  const cartItems1 = [
    {
      id: 1,
      name: "Chaos Battletom",
      description: "lorem ipsum",
      price: 98,
      quantity: 2,
    },
    {
      id: 2,
      name: "Chaos Battletom",
      description: "lorem ipsum",
      price: 98,
      quantity: 2,
    },
    {
      id: 3,
      name: "Chaos Battletom",
      description: "lorem ipsum",
      price: 98,
      quantity: 2,
    },
    {
      id: 1,
      name: "Chaos Battletom",
      description: "lorem ipsum",
      price: 98,
      quantity: 2,
    },
    {
      id: 2,
      name: "Chaos Battletom",
      description: "lorem ipsum",
      price: 98,
      quantity: 2,
    },
    {
      id: 3,
      name: "Chaos Battletom",
      description: "lorem ipsum",
      price: 98,
      quantity: 2,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="custom-container px-[100px] md:px-[16px] font-[poppins]">
        {/* Main Content */}
        <main className="mt-[110px] ">
          <button
            className="flex items-center gap-[8px]:  text-[#ffff] font-[manrope] font-[500px] text-[16px] leading-[24px]"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="50"
            onClick={() => navigate(-1)}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="white" // Changed stroke to white
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </button>

          <h1
            className="text-[28px] leading-8 font-semibold py-[50px] text-[#fff]"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="100"
          >
            Shopping Cart
          </h1>

          <div className="flex gap-[127px] XL:flex-col XL:gap-[90px]">
            <div
              className="w-[50%] XL:w-[100%] flex flex-col gap-[40px] max-h-[498px] overflow-y-auto no-scrollbar"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="150"
            >
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between sm:flex-col sm:gap-[27px] sm:items-start   pb-[40px] border-b border-[#474747]"
                >
                  <div className="flex gap-[16px]">
                    <img
                      src={item.images[0].url}
                      alt={item.name}
                      className="w-[98px] h-[98px] sm:w-[70px] sm:h-[70px] object-cover rounded-[4px]"
                    />
                    <div className="flex flex-col">
                      <p className="font-medium text-[16px] leading-[24px] text-[#fff] mb-[7px]">
                        {item.name}
                      </p>
                      <p className="font-normal text-base text-gray-400 mb-[0px]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-[32px]">
                    <div className="text-[24px] leading-6 font-medium text-[#fff]">
                      ${item.price}
                    </div>
                    <div className="flex justify-between w-[152px] h-[44px]  items-center py-[8px] px-[14px] bg-[#1B1B1B]  rounded-lg border border-[#474747]">
                      <button className=" ">
                        <img
                          src={minus}
                          alt=""
                          onClick={() => handleReduceQuantity(item)}
                        />
                      </button>
                      <span className="font-medium text-xl text-[#fff]">
                        {item.orderQuantity}
                      </span>
                      <button className=" ">
                        <img
                          src={plus}
                          alt=""
                          onClick={() => handleAddQuantity(item)}
                        />
                      </button>
                    </div>
                    <button className="  ">
                      <img
                        src={close}
                        alt=""
                        onClick={() => handleRemoveItem(item._id)}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div
              className=" bg-[#1b1b1b] p-8 rounded-[16px] w-[50%] XL:w-[100%]"
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay="100"
            >
              <h2 className="text-[20px] leading-4 font-bold mb-10 text-[#fff]">
                Order Summary
              </h2>

              <div className="mb-6">
                <p className="mb-2  leading-4 font-[400] text-[16px] text-[#fff]">
                  Discount code / Promo code
                </p>
                <input
                  type="text"
                  placeholder="Code"
                  className="w-full p-4 rounded-md  text-[#979797] font-[400] text-[14px] leading-[24px] focus:outline-none "
                />
              </div>

              {/* <div className="mb-[28px]">
                <p className="mb-2  leading-4 font-[400] text-[16px] text-[#fff]">
                  Your bonus card number
                </p>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter Card Number"
                    className="w-full py-4 pl-4 pr-[106px] rounded-md  text-[#979797] font-[400] text-[14px] leading-[24px] focus:outline-none "
                  />
                  <button className="top-[50%] transform translate-y-[-50%] right-[16px]  bg-white  text-black w-[76px] h-[32px] rounded-md !border !border-[#000]  font-[500] text-[12px] leading-[16px] absolute">
                    Apply
                  </button>
                </div> 
              </div> */}

              <div className="mb-[16px]">
                <div className="flex justify-between mb-4 font-medium">
                  <span className="text-white">Subtotal</span>
                  <span className="text-white">{amountFormat(subTotal)}</span>
                </div>
                <div className="flex justify-between  leading-8">
                  <span className="font-normal text-[#a8aebf]">
                    Estimated Tax
                  </span>
                  <span className="font-medium text-white">$0</span>
                </div>
                <div className="flex justify-between mb-2 leading-8">
                  <span className="font-normal  text-[#a8aebf]">
                    Estimated shipping & Handling
                  </span>
                  <span className="font-medium text-white">$0</span>
                </div>
              </div>

              <div className="flex justify-between font-medium mb-[48px]">
                <span className="text-white">Total</span>
                <span className="text-white">{amountFormat(subTotal)}</span>
              </div>

              <button
                className="w-full font-medium text-[16px] leading-[12px] text-white bg-[#FD4960] py-3 rounded-full"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AddToCart;
