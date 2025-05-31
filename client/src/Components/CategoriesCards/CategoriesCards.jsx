import React from "react";
import "./CategoriesCards.css";
import CategoriesCardsImg from "../../images/CategoriesImg.svg";
const CategoriesCards = () => {
  return (
    <>
      <div className="CategoriesCards-main pt-[30px]">
        <div className="custom-container px-[100px] md:px-[16px]">
          <div className="flex" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50">
            <p className="CategoriesCards-heading1  font-[500] text-[16px] leading-[28px] py-[3px] px-[12px]">
              Rocks and Crystals
            </p>
          </div>
          <div className="CategoriesCards-row flex items-center gap-[24px] pt-[30px] xl:flex-col">
            <div className="CategoriesCards-left w-[63%] flex gap-[24px] xl:w-[100%] lg:flex-col">
              <div className="CategoriesCards-img-left-otr w-[100%]" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50">
                <img
                  className="CategoriesCards-img-left w-[100%] h-[406px] lg:h-[192px] object-cover rounded-[8px]"
                  src={CategoriesCardsImg}
                  alt=""
                />
              </div>
              <div className="CategoriesCards-img-left-otr w-[100%]" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100">
                <img
                  className="CategoriesCards-img-left w-[100%] h-[406px] lg:h-[192px] object-cover rounded-[8px]"
                  src={CategoriesCardsImg}
                  alt=""
                />
              </div>
            </div>
            <div className="CategoriesCards-right w-[37%] flex flex-col gap-[24px] xl:w-[100%]" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="150">
              <div className="CategoriesCards-img-right-otr xl:w-[100%] ">
                <img
                  className="CategoriesCards-img-right w-[100%] h-[192px] object-cover rounded-[8px]"
                  src={CategoriesCardsImg}
                  alt=""
                />
              </div>
              <div className="CategoriesCards-img-right-otr xl:w-[100%]">
                <img
                  className="CategoriesCards-img-right w-[100%] h-[192px] object-cover rounded-[8px]"
                  src={CategoriesCardsImg}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesCards;
