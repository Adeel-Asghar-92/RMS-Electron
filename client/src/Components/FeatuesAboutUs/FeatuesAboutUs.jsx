import React from "react";
import "./FeatuesAboutUs.css";
import Icon1 from "../../images/AboutUsIcon1.svg";
import Icon2 from "../../images/AboutUsIcon2.svg";
import Icon3 from "../../images/AboutUsIcon3.svg";
const FeatuesAboutUs = () => {
  return (
    <>
      <div className="FeatuesAboutUs-main pb-[177px]">
        <div className="custom-container px-[100px] md:px-[16px]">
          <p className="FeatuesAboutUs-heading1 text-center font-medium text-[32px] leading-[32px]" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50">
            Our{" "}
            <span className="FeatuesAboutUs-heading2 font-medium text-[32px] leading-[32px]">
              Features
            </span>
          </p>
          <div className="FeatuesAboutUs-row flex justify-center pt-[60px] xl:pt-[27px] xl:flex-wrap XL:gap-[27px] XL:items-center xsm:gap-0">
            <div className="FeatuesAboutUs-box-otr " data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50">
              <div className="FeatuesAboutUs-box-inr w-[437px] h-[332px] XL:!static XL:hide-after XL:w-[100%] XL:h-[235px]">
                <div className="FeatuesAboutUs-box-img-otr">
                  <img className="FeatuesAboutUs-box-img" src={Icon1} alt="" />
                </div>
                <p className="FeatuesAboutUs-box-heading font-[600] text-[22px] leading-[30px] pt-[32px] pb-[6px]">
                  High-Quality Models
                </p>
                <p className="FeatuesAboutUs-box-desc font-medium text-base leading-[22px] max-w-[317px]">
                  All characters are designed with attention to detail to ensure
                  they fit perfectly in your game world.
                </p>
              </div>
            </div>
            <div className="FeatuesAboutUs-box-otr extra-for-shape pt-[20px] XL:!pt-[0px]" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100">
              <div className="extra-for-shape-inr w-[437px] h-[332px]  XL:!static XL:hide-after XL:!w-[100%] XL:h-[235px]">
                <div className="FeatuesAboutUs-box-img-otr">
                  <img className="FeatuesAboutUs-box-img" src={Icon2} alt="" />
                </div>
                <p className="FeatuesAboutUs-box-heading font-[600] text-[22px] leading-[30px] pt-[32px] pb-[6px]">
                  Instant Downloads
                </p>
                <p className="FeatuesAboutUs-box-desc font-medium text-base leading-[22px] max-w-[317px]">
                  After payment, characters are ready to be downloaded instantly
                  for a hassle-free experience.
                </p>
              </div>
            </div>
            <div className="FeatuesAboutUs-box-otr" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="150">
              <div className="FeatuesAboutUs-box-inr w-[437px] h-[332px]  XL:!static XL:hide-after XL:w-[100%] XL:h-[235px]">
                <div className="FeatuesAboutUs-box-img-otr">
                  <img className="FeatuesAboutUs-box-img" src={Icon3} alt="" />
                </div>
                <p className="FeatuesAboutUs-box-heading font-[600] text-[22px] leading-[30px] pt-[32px] pb-[6px]">
                  Secure Payments
                </p>
                <p className="FeatuesAboutUs-box-desc font-medium text-base leading-[22px] max-w-[317px]">
                  We provide a highly secure payment gateway to protect your
                  transactions and information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatuesAboutUs;
