import React from "react";
import BankIcon from "../../images/bankIcon.svg";
import MasterCardIcon from "../../images/MASTER-CARDLOGO.svg";
import WifiIcon from "../../images/wifiIcon.svg";
import DeleteIcon from "../../images/delete.svg";

const PaymentCard = ({ card, onDelete }) => {
  return (
    <div className="relative w-[334px] xsm:w-[270px] xsm:h-[189px] bg-[linear-gradient(110.44deg,_rgba(186,_188,_89,_0)_1.12%,_#FD4960_1.27%,_#191919_86.85%)] rounded-lg px-3 py-[13px]  font-[inter]">
      <div className="opacity-1 transition duration-300 absolute top-1 right-1 hover:bg-[rgba(255,255,255,0.1)] rounded-full p-3 cursor-pointer" onClick={() => onDelete(card.id)}>
        <img src={DeleteIcon} alt="Delete" width={24}/>
      </div>
      <div className="flex justify-between items-center mb-4 xsm:!mb-2">
        <div className="flex items-center gap-2">
          <img src={BankIcon} alt="" />
          <p className="font-bold text-base mb-0">FYI BANK</p>
        </div>
        <span className="font-bold">CREDIT</span>
      </div>
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <p className="font-bold mb-7 xsm:mb-0">
            {card?.cardNumber.replace(/(.{4})/g, (match, group) => group + " ")}
          </p>
          <div className="flex justify-between items-center">
            <p className="font-medium text-xs mb-0">
              VALID{" "}
              <span className="font-bold text-base">
                {card.expiryMonth}/{card.expiryYear}
              </span>
            </p>
            <p className="font-bold mb-1">{card?.cvv}</p>
          </div>

          <p className="font-bold mt-7 xsm:mt-3 mb-0">{card?.cardholderName}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-end">
            <img src={WifiIcon} alt="" />
          </div>
          <div className="relative top-[50px] xsm:top-[19px] xsm:right-[-13px]">
            <img src={MasterCardIcon} alt="Mastercard" />
            <p className="font-semibold text-xs">{card?.cardType}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
