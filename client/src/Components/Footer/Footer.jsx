import React from "react";
import "./Footer.css";
import footerIcon1 from "../../images/jam_facebook.svg";
import footerIcon2 from "../../images/mdi_instagram.svg";
import footerIcon3 from "../../images/jam_linkedin.svg";
import footerIcon4 from "../../images/mdi_youtube.svg";
import footerIcon5 from "../../images/ic_baseline-tiktok.svg";
import Logo from "../../images/Logo.svg";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <>
      <footer>
        <div className="Footer-top">
          <div className="custom-container px-[100px] md:px-[16px]">
            <div className="footer-row">
              <div className="Footer-top-box1-otr" onClick={() => navigate("/")} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50">
                {/* <p className="nav-logo-inr">Logo</p> */}
                <img className="footer-logo" src={Logo} alt="" />
                <p className="Footer-top-box1-desc">
                  Onclasses makes it easy to create, sell, market, and scale
                  your online business with your personal brand.
                </p>
                <ul className="Footer-top-box1-ul">
                  <li className="Footer-top-box1-li">
                    <img
                      className="Footer-top-box1-img"
                      src={footerIcon1}
                      alt=""
                    />
                  </li>
                  <li className="Footer-top-box1-li">
                    <img
                      className="Footer-top-box1-img"
                      src={footerIcon2}
                      alt=""
                    />
                  </li>
                  <li className="Footer-top-box1-li">
                    <img
                      className="Footer-top-box1-img"
                      src={footerIcon3}
                      alt=""
                    />
                  </li>
                  <li className="Footer-top-box1-li">
                    <img
                      className="Footer-top-box1-img"
                      src={footerIcon4}
                      alt=""
                    />
                  </li>
                  <li className="Footer-top-box1-li">
                    <img
                      className="Footer-top-box1-img"
                      src={footerIcon5}
                      alt=""
                    />
                  </li>
                </ul>
              </div>
              <div className="Footer-top-box2-otr" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100">
                <p className="Footer-heading">Product</p>
                <ul className="Footer-top-box2-ul">
                  <li className="Footer-top-box2-li">Pricing</li>
                  <li className="Footer-top-box2-li">Features</li>
                </ul>
                <p className="Footer-heading extra-p">Resources</p>
                <ul className="Footer-top-box2-ul">
                  <li className="Footer-top-box2-li">AI Blog</li>
                  <li className="Footer-top-box2-li">Community</li>
                </ul>
              </div>
              <div className="Footer-top-box2-otr" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="150">
                <p className="Footer-heading ">Company</p>
                <ul className="Footer-top-box2-ul">
                  <li className="Footer-top-box2-li cursor-pointer" onClick={() => navigate("/aboutus")}>About</li>
                  <li className="Footer-top-box2-li cursor-pointer" onClick={() => navigate("/contact-us")}>Contact</li>
                  <li className="Footer-top-box2-li cursor-pointer">Influencers</li>
                </ul>
                <p className="Footer-heading extra-p">Support</p>
                <ul className="Footer-top-box2-ul">
                  <li className="Footer-top-box2-li cursor-pointer">FAQs</li>
                  <li className="Footer-top-box2-li cursor-pointer">Contact Support</li>
                </ul>
              </div>
              <div className="Footer-top-box2-otr" data-aos="fade-up" data-aos-duration="1700" data-aos-delay="200">
                <p className="Footer-heading">Access</p>
                <ul className="Footer-top-box2-ul">
                  <li className="Footer-top-box2-li cursor-pointer" onClick={() => navigate("/login")}>Login</li>
                  <li className="Footer-top-box2-li cursor-pointer">Star Free Trial</li>
                </ul>
                <p className="Footer-heading extra-p">Legal</p>
                <ul className="Footer-top-box2-ul">
                  <li className="Footer-top-box2-li cursor-pointer">Privacy Policy</li>
                  <li className="Footer-top-box2-li cursor-pointer">Terms & Conditions</li>
                </ul>
              </div> 
            </div>
          </div>
        </div>
        <div className="Footer-bottom" >
          <div className="custom-container px-[100px] md:px-[16px]">
            <div className="Footer-bottom-inr xsm:flex-col gap-[12px]">
              <p className="Footer-bottom-desc">
                FRONXSOLUTION – All Rights Reserved © Copyright 2024
              </p>
              <ul className="Footer-bottom-ul">
                <li className="Footer-bottom-li">
                  <img
                    className="Footer-bottom-img"
                    // src={footerpaymenticon1}
                    alt=""
                  />
                </li>
                <li className="Footer-bottom-li">
                  <img
                    className="Footer-bottom-img"
                    // src={footerpaymenticon2}
                    alt=""
                  />
                </li>
                <li className="Footer-bottom-li">
                  <img
                    className="Footer-bottom-img"
                    // src={footerpaymenticon3}
                    alt=""
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
