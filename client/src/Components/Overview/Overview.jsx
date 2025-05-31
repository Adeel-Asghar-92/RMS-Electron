import React from "react";
import "./Overview.css";
import overViewImg from "../../images/OverviewImg.svg";
const Overview = () => {
  return (
    <>
      <div className="Overview-main">
        <div className="custom-container px-[100px] md:px-[16px]">
          <p className="Overview-heading1 font-[600] text-[24px] leading-[32px] mb-[0px] pl-[10px]" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50">
            Overview
          </p>
          <p className="Overview-heading2 font-[600] text-[24px] leading-[32px] mb-[0px] py-[40px]" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100">
            Example{" "}
            <span className="Overview-heading3 font-[600] text-[24px] leading-[32px]">
              of Uses
            </span>
          </p>
          <div className="Overview-row flex flex-wrap items-center gap-[24px]  XL:flex-wrap XL:justify-center pb-[40px]">
            <div className="Overview-box-otr w-[310px] XL:w-[300px] sm:!w-[100%]" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50">
              <div className="Overview-box-inr p-[10px] rounded-[8px]">
                <div className="Overview-img-otr">
                  <img
                    className="Overview-img w-[100%] h-[292px] object-cover rounded-[8px]"
                    src={overViewImg}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="Overview-box-otr w-[310px] XL:w-[300px] sm:!w-[100%]" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100">
              <div className="Overview-box-inr p-[10px] rounded-[8px]">
                <div className="Overview-img-otr">
                  <img
                    className="Overview-img w-[100%]  h-[292px] object-cover rounded-[8px]"
                    src={overViewImg}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="Overview-box-otr w-[310px] XL:w-[300px] sm:!w-[100%]" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="150">
              <div className="Overview-box-inr p-[10px] rounded-[8px]">
                <div className="Overview-img-otr">
                  <img
                    className="Overview-img w-[100%]  h-[292px] object-cover rounded-[8px]"
                    src={overViewImg}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="Overview-box-otr w-[310px] XL:w-[300px] sm:!w-[100%]" data-aos="fade-up" data-aos-duration="1700" data-aos-delay="200">
              <div className="Overview-box-inr p-[10px] rounded-[8px]">
                <div className="Overview-img-otr">
                  <img
                    className="Overview-img w-[100%]  h-[292px] object-cover rounded-[8px]"
                    src={overViewImg}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="Overview-box-otr w-[310px] XL:w-[300px] sm:!w-[100%]" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50">
              <div className="Overview-box-inr p-[10px] rounded-[8px]">
                <div className="Overview-img-otr">
                  <img
                    className="Overview-img w-[100%] h-[292px] object-cover rounded-[8px]"
                    src={overViewImg}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="Overview-box-otr w-[310px] XL:w-[300px] sm:!w-[100%]" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100">
              <div className="Overview-box-inr p-[10px] rounded-[8px]">
                <div className="Overview-img-otr">
                  <img
                    className="Overview-img w-[100%]  h-[292px] object-cover rounded-[8px]"
                    src={overViewImg}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="Overview-box-otr w-[310px] XL:w-[300px] sm:!w-[100%]" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="150">
              <div className="Overview-box-inr p-[10px] rounded-[8px]">
                <div className="Overview-img-otr">
                  <img
                    className="Overview-img w-[100%]  h-[292px] object-cover rounded-[8px]"
                    src={overViewImg}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="Overview-box-otr w-[310px] XL:w-[300px] sm:!w-[100%]" data-aos="fade-up" data-aos-duration="1700" data-aos-delay="200">
              <div className="Overview-box-inr p-[10px] rounded-[8px]">
                <div className="Overview-img-otr">
                  <img
                    className="Overview-img w-[100%]  h-[292px] object-cover rounded-[8px]"
                    src={overViewImg}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <p className="Overview-heading2 font-[600] text-[24px] leading-[32px] mb-[0px] " data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50">
            Details
            <span className="Overview-heading3 font-[600] text-[24px] leading-[32px] ml-[7px]">
              of the sets
            </span>
          </p>
          <p className="Overview-heading4 font-[600] text-[28px] leading-[44px]  mb-[0px] pt-[40px] pb-[32px]" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100">
            Crossroads: Fungal Tunnels includes models divided into three
          </p>
          <p className="Overview-heading1 font-[600] text-[24px] leading-[32px] mb-[0px] pl-[10px]" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="150">
            Categories
          </p>
          <ul className="Categories-ul flex items-center gap-[40px] !mt-[30px] flex-wrap xsm:gap-[16px]" data-aos="fade-up" data-aos-duration="1700" data-aos-delay="200">
            <li className="Categories-li flex items-center gap-[8px]">
              <span className="ItemShowcase-list-dot "></span>
              <p className="Categories-txt font-[500] text-[16px] leading-[28px] mb-[0px]">
                Rocks and Crystals
              </p>
            </li>
            <li className="Categories-li flex items-center gap-[8px]">
              <span className="ItemShowcase-list-dot "></span>
              <p className="Categories-txt font-[500] text-[16px] leading-[28px] mb-[0px]">
                Modular Mushrooms
              </p>
            </li>
            <li className="Categories-li flex items-center gap-[8px]">
              <span className="ItemShowcase-list-dot "></span>
              <p className="Categories-txt font-[500] text-[16px] leading-[28px] mb-[0px]">
                Giant Mushrooms
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Overview;
