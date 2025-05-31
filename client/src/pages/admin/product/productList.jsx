import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "../../../images/search.svg";
import LeftIcon from "../../../images/chevron-right.svg";
import RightIcon from "../../../images/chevron-right (1).svg";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../../utils/toasts";
import { axiosInstance } from "../../../utils/axios";
import Loader from "../../../Components/UI/Loaders/loader";
// import ActionDropdown from "../../../Components/UI/Dropdowns/ActionDropdown/actionDropdown";
import { amountFormat } from "../../../utils/amountFormat";
import DeleteIcon from "../../../images/delete.svg";
import EditIcon from "../../../images/edit-3.svg";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const fetchProducts = () => {
    const token = localStorage.getItem("admin_auth_token");
    setLoading(true);
    axiosInstance
      .get("/products", {
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
        setProducts(data.results);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        toastError(err.response?.data?.message || "Something went wrong");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [navigate, currentPage, searchTerm, sortBy]);

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setLoading(true);
      const token = localStorage.getItem("admin_auth_token");
      try {
        await axiosInstance.delete(`/products/${productId}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        toastSuccess("Product deleted successfully");
        fetchProducts(); // Refresh the list
      } catch (err) {
        toastError(err.response?.data?.message || "Failed to delete product");
      }
      setLoading(false);
    }
    setActiveDropdown(null);
  };

  const handleEdit = (productId) => {
    navigate(`/admin/editProduct/${productId}`);
    setActiveDropdown(null);
  };

  return (
    <>
      {loading && <Loader />}
      {/* <header className="flex justify-between items-center  xsm:flex-col xsm:gap-[16px]">
        <h1 className="text-2xl font-semibold text-secondary">
          Product <span className="text-rose">List</span>
        </h1>
        <button
          className="bg-rose p-3 py-2 rounded-lg"
          onClick={() => navigate("/admin/addProduct")}
        >
          Add Product
        </button>
      </header> */}
      <div className="rounded-2xl text-black">
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
              placeholder="Search product"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-[10px] pl-12 rounded-full border-1 border-[#474C59] bg-transparent placeholder:text-base placeholder:font-medium placeholder:text-[#474C59] w-[484px] md:w-[300px]"
            />
          </div>
          <button
            className="bg-rose p-3 py-2 rounded-lg text-white"
            onClick={() => navigate("/admin/addProduct")}
          >
            Add Product
          </button>
        </div>

        <div className="lg:relative lg:h-[267px] overflow-y-auto bg-white text-black shadow rounded-2xl p-3">
          <table className="w-full lg:absolute lg:top-0 lg:left-0 lg:h-[100%] lg:w-[150%] sm:!w-[427%]">
            <thead>
              <tr className="text-left text-[#A8AEBF]">
                <td className="p-2">
                  <span
                    // className={sortBy === "name" ? "font-semibold" : ""}
                    onClick={() => setSortBy("name")}
                  >
                    Product Name
                  </span>
                </td>

                <td className="p-2">Price</td>
                <td className="p-2">Quantity</td>
                <td className="p-2">Category</td>
                <td className="p-2 text-right">Action</td>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                products.length > 0 &&
                products.map((product) => (
                  <tr key={product._id} className="border-t border-gray-700">
                    <td className="p-2 flex items-center">
                      <img
                        src={product.images?.[0]?.url }
                        alt="Product"
                        className="w-10 h-10 rounded mr-2"
                      />
                      {product.name}
                    </td>
                    <td className="p-2">{amountFormat(product.price)}</td>
                    <td className="p-2">{product.stock}</td>
                    <td className="p-2">{product.categoryId?.name || "N/A"}</td>
                    <td className="p-2 text-right">
                      {/* <ActionDropdown
                        item={product}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        setActiveDropdown={setActiveDropdown}
                        activeDropdown={activeDropdown}
                        dropdownRef={dropdownRef}
                      /> */}
                      <div className="flex justify-end gap-2">
                        <button
                          className="p-1 text-sm hover:bg-slate-50 rounded-full"
                          onClick={() => handleEdit(product._id)}
                        >
                          <img src={EditIcon} width={27} />
                        </button>
                        <button
                          className="p-1 text-sm hover:bg-slate-50 rounded-full"
                          onClick={() => handleDelete(product._id)}
                        >
                          <img src={DeleteIcon} width={30} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              {/* {loading && (
                <tr>
                  <td colSpan={7} className="px-2 py-3 text-center">
                    <Loader />
                  </td>
                </tr>
              )} */}
              {!loading && products.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-2 py-3 text-center">
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
          <div className="flex space-x-2">
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
                  i + 1 === currentPage ? "bg-rose" : ""
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

export default ProductList;
