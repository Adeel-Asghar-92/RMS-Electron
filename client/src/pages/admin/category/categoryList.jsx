import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "../../../images/search.svg";
import ActionIcon from "../../../images/actionIcon.svg";
import LeftIcon from "../../../images/chevron-right.svg";
import RightIcon from "../../../images/chevron-right (1).svg";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../../utils/toasts";
import { axiosInstance } from "../../../utils/axios";
import Loader from "../../../Components/UI/Loaders/loader";
import ActionDropdown from "../../../Components/UI/Dropdowns/ActionDropdown/actionDropdown";

const CategoryList = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const fetchCategories = () => {
    const token = localStorage.getItem("admin_auth_token");
    setLoading(true);
    axiosInstance
      .get("/category", {
        headers: {
          Authorization: `${token}`,
        },
        params: {
          name: searchTerm,
          limit: 50,
          page: currentPage,
          sortBy,
        },
      })
      .then(({ data }) => {
        setCategories(data.results);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        toastError(err.response?.data?.message || "Something went wrong");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, [navigate, currentPage, searchTerm, sortBy]);

  const handleDelete = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      const token = localStorage.getItem("admin_auth_token");
      try {
        await axiosInstance.delete(`/category/${categoryId}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        toastSuccess("Category deleted successfully");
        fetchCategories(); // Refresh the list
      } catch (err) {
        toastError(err.response?.data?.message || "Failed to delete category");
      }
    }
    setActiveDropdown(null);
  };

  const handleEdit = (categoryId) => {
    navigate(`/admin/editCategory/${categoryId}`);
    setActiveDropdown(null);
  };

  return (
    <>
      {/* <header className="flex justify-between items-center mb-6 xsm:flex-col xsm:gap-[16px]">
        <h1 className="text-2xl font-semibold">
          Product <span className="text-[#FD4960]">Category</span>
        </h1>
        <button
          className="bg-rose p-3 py-2 rounded-lg"
          onClick={() => navigate("/admin/addCategory")}
        >
          Add Category
        </button>
      </header> */}
      <div className="text-black rounded-2xl">
        <div className="flex justify-between items-center mb-6 md:flex-col md:gap-[16px]">
          {/* <h3 className="text-lg font-semibold"></h3> */}
          <div className="relative md:w-[300px]">
            <img
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A8AEBF]"
              src={SearchIcon}
              alt=""
            />
            <input
              type="text"
              placeholder="Search Category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-[10px] pl-12 rounded-full border-1 border-[#474C59] bg-transparent  placeholder:text-base placeholder:font-medium placeholder:text-[#474C59] w-[484px] md:w-[300px]"
            />
          </div>
          <button
            className="bg-rose p-3 py-2 rounded-lg text-white"
            onClick={() => navigate("/admin/addCategory")}
          >
            Add Category
          </button>
        </div>

        <div className="lg:relative lg:h-[267px] overflow-y-auto shadow bg-white rounded p-3 ">
          <table className="w-full lg:absolute lg:top-0 lg:left-0 lg:h-[100%] lg:w-[150%] sm:!w-[427%]">
            <thead>
              <tr className="text-left text-[#A8AEBF]">
                <td className="p-2">
                  <span
                    className={sortBy === "name" ? "font-semibold" : ""}
                    onClick={() => setSortBy("name")}
                  >
                    Category
                  </span>
                </td>
                <td className="p-2">
                  <span
                    className={sortBy === "_id" ? "font-semibold" : ""}
                    onClick={() => setSortBy("_id")}
                  >
                    Category Id
                  </span>
                </td>
                <td className="p-2 text-right">Action</td>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                categories.length > 0 &&
                categories.map((category) => (
                  <tr key={category._id} className="border-t border-gray-700">
                    <td className="p-2">{category.name}</td>
                    <td className="p-2">{category._id}</td>
                    <td className="p-2 text-right">
                      {/* <button>
                        <img src={ActionIcon} alt="" />
                      </button> */}
                      <ActionDropdown
                        item={category}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        setActiveDropdown={setActiveDropdown}
                        activeDropdown={activeDropdown}
                        dropdownRef={dropdownRef}
                      />
                    </td>
                  </tr>
                ))}
              {loading && (
                <tr>
                  <td colSpan={3} className="px-2 py-3 text-center">
                    <Loader />
                  </td>
                </tr>
              )}
              {!loading && categories.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-2 py-3 text-center">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4 md:flex-col md:gap-[16px]">
          <div className="text-[#BBBBBB]">
            Showing page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2 text-white">
            <button
              className="paginationIcons bg-[#262626]"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <img src={LeftIcon} alt="" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`paginationItem ${
                  i + 1 === currentPage ? "bg-[#FD4960]" : ""
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="paginationIcons bg-[#262626]"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <img src={RightIcon} alt="" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
