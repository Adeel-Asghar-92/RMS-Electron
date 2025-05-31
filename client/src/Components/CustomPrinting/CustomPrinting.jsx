import React from "react";
import "./CustomPrinting.css";
import downloadIcon from "../../images/file_upload.svg";
const CustomPrinting = () => {
  return (
    <>
      <div className="custom-container px-[100px] md:px-[16px] my-[40px]">
        <div className="CustomPrinting-main" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50">
          <p className="CustomPrinting-heading font-[600] text-[22px] leading-[30px]">
            Custom 3D Printing Orders
          </p>
          <p className="CustomPrinting-desc font-[400] text-[16px] leading-[28px] pb-[32px] pt-[17px]">
            Have your own design? Upload your .STL file, and we will review it
            and provide a quote for 3D printing. Once you approve the quote, we
            will start printing your model.
          </p>
          <div className="download-otr mb-[16px]">
            <div className="download-inr">
              <div className="download-img-otr">
                <img className="download-img" src={downloadIcon} alt="" />
              </div>
              <p className="download-heading font-[400] text-[14px] leading-[24px] py-[16px]">
                Drag & Drop image
              </p>
              <p className="download-or font-[400] text-[14px] leading-[24px]">
                or
              </p>
              <div className="download-btn-otr pt-[16px]">
                <div className="download-btn-inr font-[400] text-[16px] leading-[28px]">
                  Browse file
                </div>
              </div>
            </div>
          </div>
          <textarea
            className="download-textarea font-[400] text-[14px] leading-[16px] p-[24px] rounded-[16px] bg-black w-[100%] h-[223px] resize-none"
            placeholder="Additional details or instructions"
          />
          <div class="AboutUsHero-btn2-otr flex justify-center mt-[32px]">
            <div class="AboutUsHero-btn2-inr font-medium text-[16px] leading-[12px] px-[24px] py-[22px] w-[266px] text-center cursor-pointer">
              Request for Quote
            </div>
          </div>
        </div>
        <div className="Printing3D-box-otr pt-[40px]" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50">
          <div className="Printing3D-box-inr" >
            <p className="Printing3D-box-heading font-[600] text-[22px] leading-[23px]">
              Scanning Services
            </p>
            <p className="Printing3D-box-desc font-[400] text-[16px] leading-[28px] pt-[16px]">
              We offer both digital copies (.STL files) and physical copies (3D
              printed models) of a wide range of designs. Choose from our
              collection of models and get them in the format you prefer
            </p>
            <div class="AboutUsHero-btn2-otr pt-[30px]">
              <div class="AboutUsHero-btn2-inr font-medium text-[16px] leading-[12px] p-[24px] w-[219px] h-[56px] text-center cursor-pointer">
                Contact Us
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomPrinting;
