import React from "react";
import "./ItemShowcase.css";
import showCaseImg from "../../images/ItemShowcaseImg.svg";
import showCaseImg2 from "../../images/ShowCaseImg2.svg";
import showCaseImg3 from "../../images/ShowCaseImg3.svg";
const ItemShowcase = () => {
  return (
    <>
      <div className="ItemShowcase-main pt-[40px]">
        <div className="custom-container px-[100px] md:px-[16px]">
          <p className="ItemShowcase-heading1" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50">
            Artist <span className="ItemShowcase-heading2">Showcase</span>
          </p>
          <div className="ItemShowcase-row flex items-center gap-[24px] py-[40px] xl:flex-col" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
            <div className="ItemShowcase-img-left w-[63%] xl:w-[100%]">
              <div className="ItemShowcase-img-left-otr">
                <img
                  className="ItemShowcase-img-left-inr w-[100%] h-[503px] object-cover rounded-[8px] xl:h-[240px]"
                  src={showCaseImg}
                  alt=""
                />
              </div>
            </div>
            <div className="ItemShowcase-img-right w-[37%] flex flex-col gap-[24px] xl:w-[100%]">
              <div className="ItemShowcase-img-right-otr">
                <img
                  className="ItemShowcase-img-right-inr w-[100%] h-[240px] object-cover rounded-[8px]"
                  src={showCaseImg}
                  alt=""
                />
              </div>
              <div className="ItemShowcase-img-right-otr">
                <img
                  className="ItemShowcase-img-right-inr w-[100%] h-[240px] object-cover rounded-[8px]"
                  src={showCaseImg}
                  alt=""
                />
              </div>
            </div>
          </div>
          <p className="ItemShowcase-heading3 font-[600] text-[28px] leading-[44px]" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50">
            This is a Late Pledge of my Kickstarter Campaign - Crossroads:
            Fungal Tunnels
          </p>
          <div className="ItemShowcase-info p-[24px] my-[32px] sm:p-[16px]" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100">
            <p className="ItemShowcase-info1 font-[500] text-[22px] leading-[28px]">
              Available{" "}
              <span className="ItemShowcase-info2 font-[400] text-[22px] leading-[28px] xsm:leading-[25px] xsm:text-[17px]">
                : Non-commercial personal license and commercial license.
              </span>
            </p>
          </div>
          <div className="ItemShowcase-list-otr " data-aos="fade-up" data-aos-duration="1500" data-aos-delay="150">
            <div className="ItemShowcase-list flex items-center gap-[8px]">
              <span className="ItemShowcase-list-dot sm:!hidden"></span>
              <p className="ItemShowcase-list-txt font-[500] text-[16px] leading-[28px]">
                It has been successfully funded thanks to the support of
                403 backers in December 2023.
              </p>
            </div>
            <div className="ItemShowcase-list flex items-center gap-[8px]">
              <span className="ItemShowcase-list-dot sm:!hidden"></span>
              <p className="ItemShowcase-list-txt font-[500] text-[16px] leading-[28px]">
                Models from this set are made for FDM printing and do not
                require using any supports.
              </p>
            </div>
          </div>
          <div className="artWork-otr flex items-center gap-[24px] py-[40px] md:flex-col" >
            <div className="artWork-inr w-[100%]" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50">
              <img
                className="artWork-img rounded-[8px] h-[408px] object-cover w-[100%] xl:h-[240px]"
                src={showCaseImg2}
                alt=""
              />
            </div>
            <div className="artWork-inr w-[100%]" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100">
              <img
                className="artWork-img rounded-[8px] h-[408px] object-cover w-[100%] xl:h-[240px]"
                src={showCaseImg3}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemShowcase;
