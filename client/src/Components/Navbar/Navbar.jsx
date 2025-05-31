import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

import "./Navbar.css";
import cartIcon from "../../images/Nav-cartIcon.svg";
import userIcon from "../../images/Nav-usericon.svg";
import NavArrowIcon from "../../images/NavArrow-down.svg";
import Logo from "../../images/Logo.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCartQuantity,
  selectCartTotal,
} from "../../Redux/cart/cartSelectors";
import { amountFormat } from "../../utils/amountFormat";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const cartQuantity = useSelector(selectCartQuantity);
  const cartTotal = useSelector(selectCartTotal);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);

    // Modified to use a custom event listener
    const handleTokenUpdate = () => {
      const updatedToken = localStorage.getItem("accessToken");
      setIsLoggedIn(!!updatedToken);
    };

    // Listen for the custom event
    window.addEventListener("tokenUpdated", handleTokenUpdate);

    // Cleanup the listener on component unmount
    return () => {
      window.removeEventListener("tokenUpdated", handleTokenUpdate);
    };
  }, []);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible =
        currentScrollPos <= 47 || currentScrollPos < prevScrollPos;

      setVisible(visible);
      setPrevScrollPos(currentScrollPos);

      // Add/remove 'scrolled' class based on scroll position
      const navbarElement = document.querySelector(".navbar-otr");
      if (currentScrollPos > 47) {
        navbarElement.classList.add("scrolled");
      } else {
        navbarElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Remove the token
    setIsLoggedIn(false); // Update state
    navigate("/login"); // Redirect to login after logout
  };
  return (
    <>
      <div className="navbar-otr">
        <div className="custom-container px-[100px] md:px-[16px]">
          <div className="navbar-inr">
            <div className="nav-logo-otr sm:!flex-1 sm:justify-between sm:flex-row-reverse">
              {/* <img className="nav-logo-inr" src="" alt="" /> */}
              <div
                className="offcanvasIcon-otr hidden xl:flex"
                onClick={handleShow}
              >
                <svg
                  className="offcanvasIcon sm:rotate-[180deg]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="rgba(255,255,255,1)"
                >
                  <path d="M3 4H21V6H3V4ZM3 11H15V13H3V11ZM3 18H21V20H3V18Z"></path>
                </svg>
              </div>
              
              <img
                className="nav-logo-inr cursor-pointer"
                onClick={() => navigate("/")}
                src={Logo}
                alt=""
              />
            </div>
            <ul className="nav-ul xl:!hidden">
              <li className="nav-li">
                <a onClick={() => navigate("/")} className="nav-a">
                  Home
                </a>
              </li>
              <li className="nav-li">
                <a onClick={() => navigate("/aboutus")} className="nav-a">
                  About Us
                </a>
              </li>
              <li className="nav-li">
                <p className="nav-a">
                  Shop
                  <img className="NavArrowIcon" src={NavArrowIcon} alt="" />
                </p>
                <div className="drop-otr">
                  <ul className="drop-ul">
                    <li className="li-drop" onClick={() => navigate("/search")}>
                      3D Characters
                    </li>
                    <li
                      className="li-drop dropextra"
                      onClick={() => navigate("/search")}
                    >
                      2D Characters
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-li">
                <a onClick={() => navigate("/printing-3d")} className="nav-a">
                  Custom Orders
                </a>
              </li>
             
              <li className="nav-li">
                <a onClick={() => navigate("/contact-us")} className="nav-a">
                  Contact Us
                </a>
              </li>
            </ul>
            <div className="user-cart sm:!hidden">
            
              {!isLoggedIn ? (
                <div className="nav-user-otr">
                  <img className="nav-user" src={userIcon} alt="" />
                  <div className="nav-user-desc">
                    <p className="nav-user-heading">Welcome</p>
                    <p
                      className="nav-user-sign cursor-pointer"
                      onClick={() => navigate("/login")}
                    >
                      Sign In / Register
                    </p>
                  </div>
                </div>
              ) : (
                <button
                  className="w-[94px] h-[46px] rounded-[100px] text-[15px] font-medium bg-[#FD4960] text-white flex items-center justify-center"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              )}
              <div
                className="nav-cart-otr cursor-pointer"
                onClick={() => navigate("/add-to-cart")}
              >
                <div className="nav-cart-img-otr">
                  <img className="nav-cart-img" src={cartIcon} alt="" />
                  <span className="cart-counter">{cartQuantity}</span>
                </div>
                <div className="nav-cart-desc">
                  <p className="nav-cart-heading">Shopping Cart</p>
                  <p className="nav-cart-amt">{amountFormat(cartTotal)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Button variant="primary" onClick={handleShow} className="">
        Launch
      </Button> */}

      <Offcanvas show={show} onHide={handleClose} className="sm:!w-[300px]">
        <Offcanvas.Body>
          <div className="offcanvas-header">
            <p className="nav-logo-inr" onClick={() => navigate("/")}>
              Logo
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="rgba(255,255,255,1)"
              className="offcanvasIcon"
              onClick={handleClose}
            >
              <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
            </svg>
          </div>
          <div className="offcanvas-body-2">
            <ul className="offcanvas-ul ">
              <li className="offcanvas-li">
                <a onClick={() => navigate("/")} className="offcanvas-a">
                  Home
                </a>
              </li>
              <li className="offcanvas-li">
                <a onClick={() => navigate("/aboutus")} className="offcanvas-a">
                  About Us
                </a>
              </li>
              <li className="offcanvas-li">
                <a onClick={() => navigate("/search")} className="offcanvas-a">
                  Shop
                </a>
              </li>
              <li className="offcanvas-li">
                <a
                  onClick={() => navigate("/printing-3d")}
                  className="offcanvas-a"
                >
                  Custom Orders
                </a>
              </li>
              {/* <li className="offcanvas-li">
                <a href="/" className="offcanvas-a">
                  Collections
                </a>
              </li> */}

              <li className="offcanvas-li">
                <a
                  onClick={() => navigate("/contact-us")}
                  className="offcanvas-a"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navbar;
