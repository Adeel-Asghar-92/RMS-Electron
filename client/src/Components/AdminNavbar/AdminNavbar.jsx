import React, { useState, useRef, useEffect, useCallback } from "react";
import "./AdminNavbar.css";
import AdminArrow from "../../images/Adminchevron-down.svg";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Icon from "../../images/AdminSidebaricon.svg";
import { axiosInstance } from "../../utils/axios";
import { toastError } from "../../utils/toasts";
import { useDispatch, useSelector } from "react-redux";
import { setShopId } from "../../Redux/shop/shopSlice";
import { selectShopId } from "../../Redux/shop/shopSelectors";
import Logo from "../../images/chamanLogo.png";
import { adminRoutes } from "../../OurRoutes/sidebarItems";
import ExpenseForm from "../../pages/admin/expense/addExpense";

const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]);
};

const getCurrentRoute = (path) => {
  return adminRoutes.find((item) => {
    const pathRegex = new RegExp(
      `^${item.path.replace(/:[a-zA-Z0-9_]+/g, "[a-zA-Z0-9_]+")}$`
    );
    return pathRegex.test(path);
  });
};

const AdminNavbar = ({ sidebarItems, toggleSidebar, showOffcanvas, setShowOffcanvas }) => {
  // const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [shops, setShops] = useState([]);
  const [heading, setHeading] = useState("");
  const [showModal, setShowModal] = useState(false);


  const userDropdownRef = useRef(null);
  const shopDropdownRef = useRef(null);
  const dispatch = useDispatch();
  const shopId = useSelector(selectShopId);
  const location = useLocation();
  const navigate = useNavigate();

  useOutsideClick(userDropdownRef, () => setIsUserDropdownOpen(false));
  useOutsideClick(shopDropdownRef, () => setIsShopDropdownOpen(false));

  const handleAddNew = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const fetchShops = useCallback(async () => {
    const token = localStorage.getItem("admin_auth_token");
    try {
      const { data } = await axiosInstance.get("/shop/allShops", {
        headers: { Authorization: token },
      });
      setShops(data);
      if (data.length > 0 && !shopId) {
        dispatch(setShopId(data[0]._id));
      }
    } catch (err) {
      toastError(err.response?.data?.message || "Failed to fetch shops");
    }
  }, [dispatch, shopId]);

  useEffect(() => {
    fetchShops();
  }, [fetchShops]);

  useEffect(() => {
    const route = getCurrentRoute(location.pathname);
    setHeading(route?.label || "");
  }, [location.pathname]);

  const handleLogout = () => {
    const adminToken = localStorage.getItem("admin_auth_token");
    const userToken = localStorage.getItem("auth_token");
    localStorage.removeItem(adminToken ? "admin_auth_token" : "auth_token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  
  return (
    <div className="DashNavbar-otr">
      <div className="DashNavbar-inr flex items-center justify-between pt-[20px] pb-[10px] px-[10px]">
        <div className="flex gap-[16px] items-center">
          <div
            className="hidden XL:flex"
            onClick={() => setShowOffcanvas(true)}
          >
            <svg
              className="offcanvasIcon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M3 4H21V6H3V4ZM3 11H15V13H3V11ZM3 18H21V20H3V18Z" />
            </svg>
          </div>
          <button
            className="xl:hidden"
            onClick={toggleSidebar}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div>
            <p className="text-2xl font-semibold text-secondary">
              {heading.split(" ")[0]}{" "}
              <span className="text-rose">{heading.split(" ")[1]}</span>
            </p>
          </div>
        </div>

        <div className="flex gap-[12px] items-center">
          <button className="bg-rose text-white py-[6.8px] px-3 rounded hover:opacity-90 transition-opacity" onClick={handleAddNew}>Add Expense</button>
          <div ref={shopDropdownRef} className="relative cursor-pointer">
            <button
              className="flex items-center gap-[8px] font-[500] text-[16px] border border-[#3E3E3E] px-[12px] py-[6px] rounded-[8px] hover:text-white hover:bg-accent"
              onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
            >
              {shops.find((shop) => shop._id === shopId)?.name || "Select Shop"}
              <img className="w-[20px] h-[20px]" src={AdminArrow} alt="" />
            </button>

            {isShopDropdownOpen && (
              <div className="admin-drop absolute z-[99] top-12 right-0 w-[224px] bg-white shadow border border-white rounded-[16px] p-[14px]">
                <ul>
                  {shops.map((shop) => (
                    <li
                      key={shop._id}
                      className="flex items-center !px-[16px] h-[45px] rounded-[8px] hover:bg-[#e3e3e3]"
                      onClick={() => dispatch(setShopId(shop._id))}
                    >
                      {shop.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div ref={userDropdownRef} className="relative cursor-pointer">
            <div
              className="flex items-center gap-[12px]"
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            >
              <img
                className="w-[48px] h-[48px] rounded-full object-cover"
                src="https://images.unsplash.com/photo-1720048170970-3848514c3d60?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
                alt="User"
              />
              <img src={AdminArrow} alt="" />
            </div>

            {isUserDropdownOpen && (
              <div className="admin-drop absolute z-[99] left-[-150px] bottom-[-250px] w-[224px] bg-white shadow border border-white rounded-[16px] p-[24px]">
                <ul className="space-y-2">
                  {["Profile", "Wish List", "Orders"].map((item) => (
                    <li
                      key={item}
                      className="!flex items-center !px-[16px] h-[45px] rounded-[8px] transition-[.3s] hover:bg-[#e3e3e3] cursor-pointer font-[Poppins] font-[500] text-[16px] leading-[28px]"
                    >
                      {item}
                    </li>
                  ))}
                  <li
                    className="flex items-center !px-[16px] h-[45px] rounded-[8px] transition-[.3s] hover:bg-[#e3e3e3] cursor-pointer font-[Poppins] font-[500] text-[16px] leading-[28px]"
                    onClick={handleLogout}
                  >
                    Log Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        className="sm:!w-[300px]"
      >
        <Offcanvas.Body>
          <div className="offcanvas-header">
            <img src={Logo} alt="Logo" width={100} className="ml-[70px]" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="offcanvasIcon"
              onClick={() => setShowOffcanvas(false)}
            >
              <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" />
            </svg>
          </div>

          <div className="offcanvas-body-2">
            <ul className="AdminSidebar-ul !p-[24px] space-y-[24px]">
              {sidebarItems?.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setShowOffcanvas(false)}
                    className={`AdminSidebar-a py-[10px] px-[16px] rounded-[8px] flex items-center gap-[12px] ${
                      isActive(item.path) ? "bg-accent" : ""
                    }`}
                  >
                    <img className="AdminSidebar-icon" src={Icon} alt="" />
                    <p className="font-[500] text-[16px] text-white">
                      {item.label}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <ExpenseForm
        show={showModal}
        onClose={handleCloseModal}
        onSuccess={() =>{}}
      />
    </div>
  );
};

export default AdminNavbar;
