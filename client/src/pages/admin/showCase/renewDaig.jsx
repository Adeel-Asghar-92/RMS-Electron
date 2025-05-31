import { useEffect, useState } from "react";
import { axiosInstance } from "../../../utils/axios";
import { selectShopId } from "../../../Redux/shop/shopSelectors";
import { useSelector } from "react-redux";
import { toastError } from "../../../utils/toasts";

const RenewDaig = ({ setRefresh }) => {
  const shopId = useSelector(selectShopId);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await axiosInstance.get("/products/allProducts", {
          headers: {
            Authorization: localStorage.getItem("admin_auth_token"),
          },
          params: {
            isStockAble: false,
            shopId,
            parentProduct: false,
            isShowcase: false,
          },
        });
        setProducts(productsRes.data);
      } catch (error) {
        toastError(error.response?.data?.message || "Something went wrong");
      }
    };
    fetchData();
  }, [shopId]);

  const addStock = async (productId) => {
    const data = {
      items: [
        {
          productId: productId,
          quantity: 1,
          isAvailable: true,
          halfPlateConsumedQuantity: 0,
          fullPlateConsumedQuantity: 0,
        },
      ],
      shopId,
    };
    try {
      await axiosInstance.post("/regularStock", data, {
        headers: {
          Authorization: localStorage.getItem("admin_auth_token"),
        },
      });
      setRefresh((prev) => !prev);
    } catch (error) {
      toastError(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="col-span-2 bg-white shadow rounded-2xl p-4 mb-4">
      <p className="text-lg font-semibold text-secondary">
        Renew <span className="text-rose"> Daig</span>
      </p>
      <div className="mt-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex justify-between items-center border-b py-3"
          >
            <p>{product.name}</p>
            <button
              className="bg-rose px-3 py-[5px] rounded-lg text-white text-sm"
              onClick={() => addStock(product._id)}
            >
              Change Me
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenewDaig;
