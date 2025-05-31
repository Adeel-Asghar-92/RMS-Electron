import React from "react";
import UseWrapper from "../../../Components/UseWrapper/UseWrapper";
import AboutUsHero from "../../../Components/AboutUsHero/AboutUsHero";
import FeatuesAboutUs from "../../../Components/FeatuesAboutUs/FeatuesAboutUs";
import AboutProcess from "../../../Components/AboutProcess/AboutProcess";
import ClientSection from "../../../Components/ClientSection/ClientSection";

const AboutUsView = () => {
  return (
    <div>
      <UseWrapper>
        <AboutUsHero />
        <FeatuesAboutUs />
        <AboutProcess />
        <div className="pb-[120px] md:pb-[32px]">
          <ClientSection />
        </div>
      </UseWrapper>
    </div>
  );
};

export default AboutUsView;
