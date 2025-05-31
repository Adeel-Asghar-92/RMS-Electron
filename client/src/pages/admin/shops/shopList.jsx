import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Modal from "react-bootstrap/Modal";
import { toastError, toastSuccess } from "../../../utils/toasts";
import { axiosInstance } from "../../../utils/axios";
import Loader from "../../../Components/UI/Loaders/loader";
import SearchIcon from "../../../images/search.svg";
import xIcon from "../../../images/x.svg";
import DeleteIcon from "../../../images/delete.svg";
import EditIcon from "../../../images/edit-3.svg";
import LeftIcon from "../../../images/chevron-right.svg";
import RightIcon from "../../../images/chevron-right (1).svg";

const shopFormSchema = z.object({
  name: z.string().min(2, "Shop name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

const ShopList = () => {
  const [shops, setShops] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(shopFormSchema),
    defaultValues: {
      name: "",
      address: "",
      _id: "",
    },
  });

  const handleClose = () => {
    setShowModal(false);
    reset();
  };

  const fetchShops = async () => {
    const token = localStorage.getItem("admin_auth_token");
    setLoading(true);

    try {
      const { data } = await axiosInstance.get("/shop", {
        headers: {
          Authorization: token,
        },
        params: {
          name: searchTerm,
          limit: 50,
          page: currentPage,
          sortBy,
        },
      });

      setShops(data.results);
      setTotalPages(data.totalPages);
    } catch (err) {
      toastError(err.response?.data?.message || "Failed to fetch shops");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, [currentPage, searchTerm, sortBy]);

  const handleDelete = async (shopId) => {
    if (!window.confirm("Are you sure you want to delete this shop?")) return;

    const token = localStorage.getItem("admin_auth_token");

    try {
      await axiosInstance.delete(`/shop/${shopId}`, {
        headers: {
          Authorization: token,
        },
      });
      toastSuccess("Shop deleted successfully");
      fetchShops();
    } catch (err) {
      toastError(err.response?.data?.message || "Failed to delete shop");
    }
  };

  const onSubmit = async (values) => {
    const token = localStorage.getItem("admin_auth_token");
    const isEditMode = Boolean(watch("_id"));

    try {
      if (isEditMode) {
        await axiosInstance.put(`/shop/${watch("_id")}`, values, {
          headers: {
            Authorization: token,
          },
        });
        toastSuccess("Shop updated successfully");
      } else {
        await axiosInstance.post("/shop", values, {
          headers: {
            Authorization: token,
          },
        });
        toastSuccess("Shop added successfully");
      }
      handleClose();
      fetchShops();
    } catch (err) {
      toastError(err.response?.data?.message || `Failed to ${isEditMode ? "update" : "add"} shop`);
    }
  };

  const handleEdit = (shop) => {
    setValue("name", shop.name);
    setValue("address", shop.address);
    setValue("_id", shop._id);
    setShowModal(true);
  };
  return (
    <>
      {/* <header className="flex justify-between items-center mb-6 xsm:flex-col xsm:gap-[16px]">
        <p className="text-2xl font-semibold text-secondary">
          Shop <span className="text-rose">List</span>
        </p>
        <button
          className="bg-rose p-3 py-2 rounded-lg"
          onClick={() => setShowModal(true)}
        >
          Add Shop
        </button>
      </header> */}

      <div className="text-black">
        <div className="flex justify-between items-center mb-6 md:flex-col md:gap-[16px]">
          {/* <div></div> */}
          <div className="relative md:w-[300px]">
            <img
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
              src={SearchIcon}
              alt=""
            />
            <input
              type="text"
              placeholder="Search Shop"
              defaultValue={searchTerm}
              onBlur={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  setSearchTerm(e.target.value);
                }
              }}
              className="p-[10px] pl-12 rounded-full border-1 border-[#474C59] bg-transparent placeholder:text-base placeholder:font-medium placeholder:text-[#474C59] w-[484px] md:w-[300px]"
            />
          </div>
          <button
          className="bg-rose p-3 py-2 rounded-lg text-white"
          onClick={() => setShowModal(true)}
        >
          Add Shop
        </button>
        </div>

        <div className="lg:relative lg:h-[267px] overflow-y-auto bg-white text-black shadow rounded-2xl p-6">
          <table className="w-full lg:absolute lg:top-0 lg:left-0 lg:h-auto lg:w-[150%] sm:!w-[427%]">
            <thead>
              <tr className="text-left text-[#656870]">
                <th
                  className="p-2 cursor-pointer"
                  onClick={() => setSortBy("name")}
                >
                  Name
                </th>
                <th
                  className="p-2 cursor-pointer"
                  onClick={() => setSortBy("_id")}
                >
                  Address
                </th>
                <th className="p-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-2 py-3 text-center">
                    <Loader />
                  </td>
                </tr>
              ) : shops.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-2 py-3 text-center">
                    No data found
                  </td>
                </tr>
              ) : (
                shops.map((shop) => (
                  <tr key={shop._id} className="border-t border-gray-700">
                    <td className="p-2">{shop.name}</td>
                    <td className="p-2">{shop.address}</td>
                    <td className="p-2 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          className="p-1 text-sm hover:bg-slate-50 rounded-full"
                          onClick={() => handleEdit(shop)}
                        >
                          <img src={EditIcon} width={27} />
                        </button>
                        <button
                          className="p-1 text-sm hover:bg-slate-50 rounded-full"
                          onClick={() => handleDelete(shop._id)}
                        >
                          <img src={DeleteIcon} width={30} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
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
              className="paginationIcons bg-accent"
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
              className="paginationIcons bg-accent"
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

      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        className="profile-modal"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="flex justify-between">
              <p className="font-[600] font-[Poppins] text-secondary text-[22px] leading-[32px] mb-[0px]">
                {watch("_id") ? "Update" : "Add"} <span className="text-rose">Shop</span>
              </p>
              <img
                className="w-[24px] h-[24px] cursor-pointer"
                src={xIcon}
                alt=""
                onClick={handleClose}
              />
            </div>

            <div className="flex flex-col gap-[27px] mt-[40px] lg:flex-col">
              <div className="flex-1">
                <label className="font-[600] font-[Poppins] text-[14px] leading-[21px] pb-[8px]">
                  Shop Name
                </label>
                <input
                  type="text"
                  placeholder="Enter shop name"
                  className="grey-border w-[100%] h-[38px] rounded-[6px] px-[13px]"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-600 text-xs">{errors.name.message}</p>
                )}
              </div>
              <div className="flex-1">
                <label className="font-[600] font-[Poppins] text-[14px] leading-[21px] pb-[8px]">
                  Shop Address
                </label>
                <input
                  type="text"
                  placeholder="Enter shop address"
                  className="grey-border w-[100%] h-[38px] rounded-[6px] px-[13px] focus:"
                  {...register("address")}
                />
                {errors.address && (
                  <p className="text-red-600 text-xs">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="flex gap-[16px] xsm:flex-col xsm:w-[100%]">
              <div className="xsm:w-[100%]">
                <div
                  className="border-pink cursor-pointer w-[150px] xsm:w-[100%] h-[40px] flex justify-center items-center gap-[8px] rounded-lg text-rose font-[500] font-[Poppins] text-[16px] leading-[12px]"
                  onClick={handleClose}
                >
                  Cancel
                </div>
              </div>
              <div className="xsm:w-[100%]">
                <button
                  className="red-border cursor-pointer w-[150px] xsm:w-[100%] h-[40px] flex justify-center items-center gap-[8px] rounded-lg bg-rose text-white font-[500] font-[Poppins] text-[16px] leading-[12px]"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <div className="loader" /> : "Save"}
                </button>
              </div>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default ShopList;
