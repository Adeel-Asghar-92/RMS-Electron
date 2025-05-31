import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toastError, toastSuccess } from "../../../utils/toasts";
import { axiosInstance } from "../../../utils/axios";
import AddIcon from "../../../images/AddToCartPlus.svg";
import "./PaymentInfo.css";
import { useState } from "react";
import xIcon from "../../../images/x.svg";
import Modal from "react-bootstrap/Modal";
import visaIcon from "../../../images/Visa.svg";
import masterIcon from "../../../images/Mastercard.svg";
import paypalIcon from "../../../images/PayPal.svg";
import bitIcon from "../../../images/Bitcoin.svg";
import AmazonPayIcon from "../../../images/AmazonPay.svg";
import KlarnaIcon from "../../../images/Klarna.svg";
import PayoneerIcon from "../../../images/Payoneer.svg";
import EtheriumIcon from "../../../images/Etherium.svg";
import PaymentCard from "../../Cards/card";
import Loader from "../../UI/Loaders/loader";

const paymentCardSchema = z.object({
  cardholderName: z
    .string()
    .min(1, "Cardholder name is required")
    .max(50, "Cardholder name must be at most 50 characters long"),
  cardNumber: z
    .string()
    .min(16, "Card number must be at least 16 characters long")
    .max(19, "Card number must be at most 19 characters long"),
  expiryMonth: z
    .string()
    .min(2, "Expiry month must be at least 2 characters long")
    .max(2, "Expiry month must be at most 2 characters long"),
  expiryYear: z
    .string()
    .min(4, "Expiry year must be at least 4 characters long")
    .max(4, "Expiry year must be at most 4 characters long"),
  cvv: z
    .string()
    .min(3, "CVV must be at least 3 characters long")
    .max(4, "CVV must be at most 4 characters long"),
});

const PaymentInfo = () => {
  const [show, setShow] = useState(false);
  const [paymentCards, setPaymentCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(paymentCardSchema),
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function detectCardType(cardNumber) {
    const visaPrefix = ['4'];
    const mastercardPrefix = ['51', '52', '53', '54', '55'];
    const paypalPrefix = ['34', '37'];
    const bitcoinPrefix = ['62'];
    const amazonPrefix = ['4'];
    const klarnaPrefix = ['53'];
    const pioneerPrefix = ['63'];
    const ethereumPrefix = ['40'];
  
    if (visaPrefix.some(prefix => cardNumber.startsWith(prefix))) {
      return 'Visa';
    } else if (mastercardPrefix.some(prefix => cardNumber.startsWith(prefix))) {
      return 'Mastercard';
    } else if (paypalPrefix.some(prefix => cardNumber.startsWith(prefix))) {
      return 'PayPal';
    } else if (bitcoinPrefix.some(prefix => cardNumber.startsWith(prefix))) {
      return 'Bitcoin';
    } else if (amazonPrefix.some(prefix => cardNumber.startsWith(prefix))) {
      return 'Amazon';
    } else if (klarnaPrefix.some(prefix => cardNumber.startsWith(prefix))) {
      return 'Klarna';
    } else if (pioneerPrefix.some(prefix => cardNumber.startsWith(prefix))) {
      return 'Pioneer';
    } else if (ethereumPrefix.some(prefix => cardNumber.startsWith(prefix))) {
      return 'Ethereum';
    } else {
      return 'Unknown';
    }
  }

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      data.cardType = detectCardType(data.cardNumber);
      const response = await axiosInstance.post("/paymentCard", data, {
        headers: {
          Authorization: `${localStorage.getItem("auth_token")}`,
        },
      });
      toastSuccess("Payment card added successfully");
      fetchPaymentCard();
      handleClose();
    } catch (error) {
      toastError("Error adding payment card");
    }
    setLoading(false);
  };

  const fetchPaymentCard = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/paymentCard", {
        headers: {
          Authorization: `${localStorage.getItem("auth_token")}`,
        },
      });
      if (response.data) {
        console.log("Fetched payment card:", response.data);
        setPaymentCards(response.data);
        // Here you can set the state with the fetched data if needed
      }
    } catch (error) {
      toastError("Error fetching payment card");
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchPaymentCard();
  }, []);

  const onDelete = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/paymentCard/${id}`, {
        headers: {
          Authorization: `${localStorage.getItem("auth_token")}`,
        },
      });
      fetchPaymentCard();
      toastSuccess("Payment card deleted successfully");
    } catch (error) {
      toastError("Error deleting payment card");
    }
    setLoading(false);
  };

  return (
    <>
    <div className="bg-[#1B1B1B] rounded-2xl p-6 ">
      <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
      <p className="mb-4">cards</p>
      <div className="flex flex-wrap gap-[30px] md:flex-col">
        {paymentCards.length > 0 &&
          paymentCards.map((card) => <PaymentCard card={card} onDelete={onDelete}/>)}
        <div className="bg-[#0A0A0A] rounded-lg w-[334px] h-[208px] flex flex-col items-center justify-center font-[inter] xsm:w-[270px] xsm:h-[189px]">
          <button
            className="rounded-full p-3 mb-4 bg-[#FD4960]"
            onClick={handleShow}
          >
            <img src={AddIcon} alt="" />
          </button>
          <span>Add New Card</span>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="profile-modal"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="flex justify-between">
              <p className="font-[600] font-[Poppins] text-[22px] leading-[32px] text-white mb-[0px]">
                Add New Card
              </p>
              <img
                className="w-[24px] h-[24px] cursor-pointer "
                src={xIcon}
                alt=""
                onClick={handleClose}
              />
            </div>
            <div className="">
              <ul className="flex gap-[8px] !p-[16px] bg-[#1B1B1BFF] !my-[40px] lg:flex-wrap">
                <li className="">
                  <img
                    className="w-[70px] h-[48px] object-cover"
                    src={visaIcon}
                    alt=""
                  />
                </li>
                <li className="">
                  <img
                    className="w-[70px] h-[48px] object-cover"
                    src={masterIcon}
                    alt=""
                  />
                </li>
                <li className="">
                  <img
                    className="w-[70px] h-[48px] object-cover"
                    src={paypalIcon}
                    alt=""
                  />
                </li>
                <li className="">
                  <img
                    className="w-[70px] h-[48px] object-cover"
                    src={bitIcon}
                    alt=""
                  />
                </li>
                <li className="">
                  <img
                    className="w-[70px] h-[48px] object-cover"
                    src={AmazonPayIcon}
                    alt=""
                  />
                </li>
                <li className="">
                  <img
                    className="w-[70px] h-[48px] object-cover"
                    src={KlarnaIcon}
                    alt=""
                  />
                </li>
                <li className="">
                  <img
                    className="w-[70px] h-[48px] object-cover"
                    src={PayoneerIcon}
                    alt=""
                  />
                </li>
                <li className="">
                  <img
                    className="w-[70px] h-[48px] object-cover"
                    src={EtheriumIcon}
                    alt=""
                  />
                </li>
              </ul>
            </div>
            <div className="flex gap-[27px] lg:flex-col">
              <div className="flex-1">
                <label className="ont-[600] font-[Poppins] text-[14px] leading-[21px] text-white pb-[8px]">
                  Card Number
                </label>
                <input
                  type="number"
                  placeholder="1234 5678 9012 3456"
                  className="grey-border  w-[100%] h-[38px] rounded-[6px]  focus:outline-none px-[13px] bg-black text-white"
                  {...register("cardNumber")}
                />
                {errors.cardNumber && (
                  <p className="text-red-600 text-xs">
                    {errors.cardNumber.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label className="ont-[600] font-[Poppins] text-[14px] leading-[21px] text-white pb-[8px]">
                  Name on Card
                </label>
                <input
                  type="text"
                  placeholder="John Smith"
                  className="grey-border  w-[100%] h-[38px] rounded-[6px]  focus:outline-none px-[13px] bg-black text-white"
                  {...register("cardholderName")}
                />
                {errors.cardholderName && (
                  <p className="text-red-600 text-xs">
                    {errors.cardholderName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-[27px] mt-[16px] lg:flex-col">
              <div className="flex-1 flex gap-[27px]">
                <div className="flex-1">
                  <label className="ont-[600] font-[Poppins] text-[14px] leading-[21px] text-white pb-[8px]">
                    Month
                  </label>
                  <input
                    type="number"
                    placeholder="01"
                    className="grey-border  w-[100%] h-[38px] rounded-[6px]  focus:outline-none px-[13px] bg-black text-white"
                    {...register("expiryMonth")}
                  />
                  {errors.expiryMonth && (
                    <p className="text-red-600 text-xs">
                      {errors.expiryMonth.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="ont-[600] font-[Poppins] text-[14px] leading-[21px] text-white pb-[8px]">
                    Year
                  </label>
                  <input
                    type="number"
                    placeholder="2024"
                    className="grey-border  w-[100%] h-[38px] rounded-[6px]  focus:outline-none px-[13px] bg-black text-white"
                    {...register("expiryYear")}
                  />
                  {errors.expiryYear && (
                    <p className="text-red-600 text-xs">
                      {errors.expiryYear.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <label className="ont-[600] font-[Poppins] text-[14px] leading-[21px] text-white pb-[8px]">
                  CVV
                </label>
                <input
                  type="number"
                  placeholder="123"
                  className="grey-border  w-[100%] h-[38px] rounded-[6px]  focus:outline-none px-[13px] bg-black text-white"
                  {...register("cvv")}
                />
                {errors.cvv && (
                  <p className="text-red-600 text-xs">{errors.cvv.message}</p>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className=" flex gap-[16px] xsm:flex-col xsm:w-[100%]">
              <div className="xsm:w-[100%]">
                <div
                  className="border-pink cursor-pointer w-[198px] xsm:w-[100%] h-[46px] flex justify-center items-center gap-[8px] rounded-[100px]   text-[#FD4960FF] font-[500] font-[Poppins] text-[16px] leading-[12px]"
                  onClick={handleClose}
                >
                  Cancel
                </div>
              </div>
              <div className="xsm:w-[100%]">
                <button
                  className="red-border cursor-pointer w-[198px] xsm:w-[100%] h-[46px] flex justify-center items-center gap-[8px] rounded-[100px] bg-[#FD4960FF]   text-white font-[500] font-[Poppins] text-[16px] leading-[12px]"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <div className="loader" /> : "Save"}
                </button>
              </div>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
    {loading && <Loader />}
    </>
  );
};

export default PaymentInfo;
