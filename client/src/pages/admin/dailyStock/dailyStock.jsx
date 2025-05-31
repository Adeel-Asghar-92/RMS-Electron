import React, { useState, useEffect } from "react";
import SearchIcon from "../../../images/search.svg";
import LeftIcon from "../../../images/chevron-right.svg";
import RightIcon from "../../../images/chevron-right (1).svg";
import { toastError, toastSuccess } from "../../../utils/toasts";
import { axiosInstance } from "../../../utils/axios";
import Loader from "../../../Components/UI/Loaders/loader";
import DeleteIcon from "../../../images/delete.svg";
import EditIcon from "../../../images/edit-3.svg";
import xIcon from "../../../images/x.svg";
import { Modal } from "react-bootstrap";
import { selectShopId } from "../../../Redux/shop/shopSelectors";
import { z } from "zod";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "../../../Components/UI/Select/Select";
import Input from "../../../Components/UI/input";
import { getFormattedDateWithTime } from "../../../utils/date";

// Constants
const INITIAL_PAGE = 1;
const TABLE_HEADERS = ["Product Name", "Quantity", "Consumed QTY", "Remaining"];

// Schema
const stockFormSchema = z.object({
  shopId: z.string().min(1, "Shop ID is required"),
  items: z.array(
    z.object({
      productId: z.string().min(1, "Product ID is required"),
      quantity: z
        .string()
        .transform((val) => Number(val))
        .refine((val) => val >= 0, "Price must be greater than 0"),
      weight: z
        .string()
        .transform((val) => Number(val))
        .refine((val) => val >= 0, "Weight must be greater than 0"),
      consumedQuantity: z.number().optional(),
      halfPlateConsumedQuantity: z.number().optional(),
      fullPlateConsumedQuantity: z.number().optional(),
      isAvailable: z.boolean().optional(),
    })
  ),
});

// Component to display consumed quantity
export const ConsumedQuantity = ({ item }) => {
  if (item?.consumedQuantity >= 0) {
    return item.consumedQuantity;
  }

  return (
    <>
      <p className="m-0">Full Plates: {item.fullPlateConsumedQuantity}</p>
      <p className="m-0">Half Plates: {item.halfPlateConsumedQuantity}</p>
    </>
  );
};

// Stock Table Component
const StockTable = ({ stock, onEdit, onDelete }) => (
  <div key={stock._id} className="bg-white shadow rounded py-1 px-3 m-3">
    <div className="flex justify-between items-center">
      <h4 className="text-xl font-semibold my-4">
        {getFormattedDateWithTime(stock.createdAt)}
      </h4>
      <div>
        <button
          className="p-1 text-sm hover:bg-slate-50 rounded-full"
          onClick={() => onEdit(stock)}
        >
          <img src={EditIcon} width={27} alt="Edit" />
        </button>
        <button onClick={() => onDelete(stock._id)}>
          <img src={DeleteIcon} alt="Delete" className="w-6 h-6" />
        </button>
      </div>
    </div>

    <table className="w-full lg:absolute lg:top-0 lg:left-0 lg:h-[100%] lg:w-[150%] sm:!w-[427%]">
      <thead>
        <tr className="text-left text-[#A8AEBF]">
          {TABLE_HEADERS.map((header) => (
            <td key={header} className="p-2">
              {header}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {stock.items.map((item) => (
          <tr key={item._id} className="border-t border-gray-700">
            <td className="p-2 flex items-center">
              <img
                src={item.productId.images?.[0]?.url}
                alt="Product"
                className="w-10 h-10 rounded mr-2"
              />
              {item.productId.name}
            </td>
            <td className="p-2">
              {item.weight ? item.weight + "KG" : item.quantity}
            </td>
            <td className="p-2">
              <ConsumedQuantity item={item} />
            </td>
            <td className="p-2">
              {(!item.weight && item.quantity - item.consumedQuantity) || ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Stock Form Modal Component
const StockFormModal = ({
  show,
  onHide,
  onSubmit,
  formMethods,
  products,
  shops,
}) => {
  const {
    control,
    watch,
    register,
    formState: { errors, isSubmitting },
  } = formMethods;
  console.log("errors", errors);
  return (
    <Modal show={show} onHide={onHide} centered className="profile-modal">
      <form onSubmit={onSubmit}>
        <Modal.Body>
          <div className="flex justify-between">
            <p className="font-[600] font-[Poppins] text-secondary text-[22px] leading-[32px] mb-[0px]">
              {watch("_id") ? "Update" : "Add"}{" "}
              <span className="text-rose">Daily Stock</span>
            </p>
            <img
              className="w-[24px] h-[24px] cursor-pointer"
              src={xIcon}
              alt=""
              onClick={onHide}
            />
          </div>

          <div className="flex flex-col gap-[27px] mt-[40px] lg:flex-col">
            <Select
              label="Shop"
              name="shopId"
              control={control}
              placeholder="Select Shop"
              options={shops.map((shop) => ({
                value: shop._id,
                label: shop.name,
              }))}
            />

            <table className="w-full mt-[16px] border-collapse">
              <thead>
                <tr>
                  <th className="text-left text-[16px] leading-[24px] font-[400] font-[Poppins] text-[#262626] border-b pb-[8px]">
                    Product
                  </th>
                  <th className="text-left text-[16px] leading-[24px] font-[400] font-[Poppins] text-[#262626] border-b pb-[8px]">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {watch("items")?.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="text-[16px] leading-[24px] font-[400] font-[Poppins] text-[#262626] py-[8px]">
                      {
                        products.find(
                          (product) =>
                            product._id === watch(`items.${index}.productId`)
                        )?.name
                      }
                    </td>
                    <td className="text-[16px] leading-[24px] font-[400] font-[Poppins] text-[#262626] py-[8px] flex items-end">
                      <Input
                        name={
                          watch(`items.${index}.unit`) === "kg"
                            ? `items.${index}.weight`
                            : `items.${index}.quantity`
                        }
                        control={control}
                        placeholder={
                          watch(`items.${index}.unit`) === "kg"
                            ? "Enter Weight"
                            : "Enter Quantity"
                        }
                        type="number"
                        min={0}
                        register={register}
                        errors={errors?.items?.[index]?.quantity}
                        // max={!item.isShowcase ? 1 : Infinity}
                        // required
                      />
                      <span>
                        {watch(`items.${index}.unit`) === "kg" ? "/KG" : ""}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <div className="flex gap-[16px] xsm:flex-col xsm:w-[100%]">
            <button
              className="border-pink cursor-pointer w-[150px] xsm:w-[100%] h-[40px] flex justify-center items-center gap-[8px] rounded-lg text-rose font-[500] font-[Poppins] text-[16px] leading-[12px]"
              onClick={onHide}
              type="button"
            >
              Cancel
            </button>
            <button
              className="red-border cursor-pointer w-[150px] xsm:w-[100%] h-[40px] flex justify-center items-center gap-[8px] rounded-lg bg-rose text-white font-[500] font-[Poppins] text-[16px] leading-[12px]"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <div className="loader" /> : "Save"}
            </button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

// Main Component
const DailyStock = () => {
  const shopId = useSelector(selectShopId);

  const [products, setProducts] = useState([]);
  const [dailyStock, setDailyStock] = useState([]);
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [shops, setShops] = useState([]);

  const formMethods = useForm({
    resolver: zodResolver(stockFormSchema),
    defaultValues: {
      shopId: shopId,
      _id: "",
    },
  });

  const { reset, setValue, watch, handleSubmit } = formMethods;

  // API calls
  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsRes, shopsRes, stockRes] = await Promise.all([
        axiosInstance.get("/products/allProducts", {
          params: { isStockAble: false, shopId, parentProduct: false },
          headers: { Authorization: localStorage.getItem("admin_auth_token") },
        }),
        axiosInstance.get("/shop/allShops", {
          headers: { Authorization: localStorage.getItem("admin_auth_token") },
        }),
        axiosInstance.get("/regularStock", {
          headers: { Authorization: localStorage.getItem("admin_auth_token") },
        }),
      ]);

      setProducts(productsRes.data);
      setShops(shopsRes.data);
      setDailyStock(stockRes.data.results);
      setTotalPages(stockRes.data.totalPages);
    } catch (err) {
      toastError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    setValue("shopId", shopId);
  }, []);

  // Handlers
  const handleDelete = async (stockId) => {
    if (!window.confirm("Are you sure you want to delete this Stock?")) return;

    const token = localStorage.getItem("admin_auth_token");
    try {
      setLoading(true);
      await axiosInstance.delete(`/regularStock/${stockId}`, {
        headers: { Authorization: token },
      });
      toastSuccess("Deleted successfully");
      fetchData();
    } catch (err) {
      toastError(err.response?.data?.message || "Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (stock) => {
    debugger
    setValue("shopId", stock.shopId);
    setValue(
      "items",
      stock.items.map((item) => ({
        ...item,
        quantity: item.quantity.toString() || "",
        weight: item.weight.toString() || "",
        productId: item.productId._id,
        isShowcase: item.productId.isShowcase,
        isAvailable: true,
        unit: item.weight ? "kg" : ""
      }))
    );
    setValue("_id", stock._id);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setValue(
      "items",
      products.map((product) => ({
        productId: product._id,
        quantity: "",
        weight: "",
        isAvailable: true,
        unit: product.unit,
        ...(product.isShowcase
          ? { consumedQuantity: 0, isShowcase: true }
          : product.haveChild
          ? {
              halfPlateConsumedQuantity: 0,
              fullPlateConsumedQuantity: 0,
              isShowcase: false,
            }
          : {
              consumedQuantity: 0,
              isShowcase: false,
            }),
      }))
    );
    setShowModal(true);
  };

  const onSubmit = async (data) => {
    const isEdit = watch("_id");
    const endpoint = isEdit ? `/regularStock/${watch("_id")}` : "/regularStock";
    const method = isEdit ? "put" : "post";
    const hasItems = data.items.some((item) => item.quantity || item.weight);
    if (!hasItems) {
      toastError("At least one item must have quantity");
      return;
    }

    data.items = data.items.filter((item) => item.quantity || item.weight);
    
    const a = data.items.map((item) => {
      if (item.weight) {
        item.quantity = 1;
        return item;
      } else {
        return item;
      }
    });
    data.items = a;

    try {
      await axiosInstance[method](endpoint, data, {
        headers: { Authorization: localStorage.getItem("admin_auth_token") },
      });
      toastSuccess(`Stock ${isEdit ? "edited" : "added"} successfully`);
      setShowModal(false);
      fetchData();
      reset();
    } catch (err) {
      toastError(
        err.response?.data?.message ||
          `Failed to ${isEdit ? "edit" : "add"} stock`
      );
    }
  };

  return (
    <>
      {loading && <Loader />}

      <header className="flex justify-between items-center mx-3 xsm:flex-col xsm:gap-[16px]">
        <div className="relative md:w-[300px]">
          <img
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A8AEBF]"
            src={SearchIcon}
            alt=""
          />
          <input
            type="text"
            placeholder="Search Stock"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-[10px] pl-12 rounded-full border-1 border-[#474C59] bg-transparent placeholder:text-base placeholder:font-medium placeholder:text-[#474C59] w-[484px] md:w-[300px]"
          />
        </div>
        <button
          className="bg-rose p-3 py-2 rounded-lg text-white"
          onClick={handleAddNew}
        >
          Add Today Stock
        </button>
      </header>

      <div className="rounded-2xl text-black">
        <div className="lg:relative lg:h-[267px] overflow-y-auto">
          {!loading && dailyStock.length > 0 ? (
            dailyStock.map((stock) => (
              <StockTable
                key={stock._id}
                stock={stock}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="text-center">
              <h3 className="px-2 py-3">No Data Found</h3>
            </div>
          )}
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

      <StockFormModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          reset();
        }}
        onSubmit={handleSubmit(onSubmit)}
        formMethods={formMethods}
        products={products}
        shops={shops}
      />
    </>
  );
};

export default DailyStock;
