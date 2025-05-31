import React from "react";

const Title = ({ title, title2, subTitle }) => {
  return (
    <>
      <h1 className="text-2xl font-semibold text-center mb-[0px]" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50">
        {title} <span className="heading">{title2}</span>
      </h1>
      <p className="text-gray-400 text-center pt-[24px] pb-[40px] mb-[0px]" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100">
        {subTitle}
      </p>
    </>
  );
};

export default Title;
