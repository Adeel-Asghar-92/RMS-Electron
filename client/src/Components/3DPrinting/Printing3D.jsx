import React from "react";
import "./3DPrinting.css";
const Printing3D = () => {
  return (
    <>
      <div className="Printing3D-main pt-[50px]">
        <div className="custom-container px-[100px] md:px-[16px] ">
          <p className="Printing3D-heading1 pb-[46px]" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50">
            3D <span className="Printing3D-heading2">Printing Services</span>
          </p>
          <div className="Printing3D-row flex gap-[25px] xl:flex-wrap justify-center">
            <div className="Printing3D-box-otr " data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50">
              <div className="Printing3D-box-inr">
                <p className="Printing3D-box-heading font-[600] text-[22px] leading-[23px]">
                  Digital & Physical 3D Models
                </p>
                <p className="Printing3D-box-desc font-[400] text-[16px] leading-[28px] pt-[16px]">
                  We offer both digital copies (.STL files) and physical copies
                  (3D printed models) of a wide range of designs. Choose from
                  our collection of models and get them in the format you prefer
                </p>
                <div class="AboutUsHero-btn2-otr pt-[30px]">
                  <div class="AboutUsHero-btn2-inr font-medium text-[16px] leading-[12px] p-[24px] w-[219px] h-[56px] text-center cursor-pointer">
                    Browse Models
                  </div>
                </div>
              </div>
            </div>
            <div className="Printing3D-box-otr " data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100">
              <div className="Printing3D-box-inr">
                <p className="Printing3D-box-heading font-[600] text-[22px] leading-[23px]">
                  Physical 3D Models Only
                </p>
                <p className="Printing3D-box-desc font-[400] text-[16px] leading-[28px] pt-[16px]">
                  We offer both digital copies (.STL files) and physical copies
                  (3D printed models) of a wide range of designs. Choose from
                  our collection of models and get them in the format you prefer
                </p>
                <div class="AboutUsHero-btn2-otr pt-[30px]">
                  <div class="AboutUsHero-btn2-inr font-medium text-[16px] leading-[12px] p-[24px] w-[219px] h-[56px] text-center cursor-pointer">
                    View Physical Models
                  </div>
                </div>
              </div>
            </div>
            <div className="Printing3D-box-otr " data-aos="fade-up" data-aos-duration="1500" data-aos-delay="150">
              <div className="Printing3D-box-inr">
                <p className="Printing3D-box-heading font-[600] text-[22px] leading-[23px]">
                  Scanning Services
                </p>
                <p className="Printing3D-box-desc font-[400] text-[16px] leading-[28px] pt-[16px]">
                  We offer both digital copies (.STL files) and physical copies
                  (3D printed models) of a wide range of designs. Choose from
                  our collection of models and get them in the format you prefer
                </p>
                <div class="AboutUsHero-btn2-otr pt-[30px]">
                  <div class="AboutUsHero-btn2-inr font-medium text-[16px] leading-[12px] p-[24px] w-[219px] h-[56px] text-center cursor-pointer">
                    Contact Us
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Printing3D;
