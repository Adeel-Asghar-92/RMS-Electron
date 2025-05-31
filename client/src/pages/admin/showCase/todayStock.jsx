import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toastError } from "../../../utils/toasts";
import Loader from "../../../Components/UI/Loaders/loader";
import { amountFormat } from "../../../utils/amountFormat";
import { getFormattedDate } from "../../../utils/date";
import { axiosInstance } from "../../../utils/axios";
import { useSelector } from "react-redux";
import { selectShopId } from "../../../Redux/shop/shopSelectors";
import { ConsumedQuantity } from "../dailyStock/dailyStock";

const TodayStock = ({ refresh, setRefresh }) => {
  const [todayStock, setTodayStock] = useState({});
  const [loading, setLoading] = useState(false);
  const shopId = useSelector(selectShopId);

  useEffect(() => {
    const fetchTodayStock = async () => {
      //   setLoading(true);
      try {
        const res = await axiosInstance.get(
          `/regularStock/todayStock/${shopId}`,
          {
            headers: {
              Authorization: localStorage.getItem("admin_auth_token"),
            },
          }
        );
        setTodayStock(res.data);
      } catch (err) {
        toastError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
        setRefresh(false);
      }
    };
    const fetchZeroQuantityItemPrice = async () => {
      try {
        const res = await axiosInstance.get(
          `/orders/calculateZeroQuantityItemPrice`,
          {
            headers: {
              Authorization: localStorage.getItem("admin_auth_token"),
            },
          }
        );
        const { total } = res.data;
        setTodayStock((prevState) => ({
          ...prevState,
          total: amountFormat(total),
        }));
      } catch (err) {
        toastError(err.response?.data?.message || "Something went wrong");
      }
    };

    if (refresh) {
      fetchTodayStock();
      // fetchZeroQuantityItemPrice();
    }
  }, [shopId, refresh]);

  return (
    <div className="col-span-5 bg-white shadow rounded-2xl p-4 mb-4">
      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-full">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[#656870]">
                  <th className="p-2">Name</th>
                  {/* <th className="p-2">Rate</th> */}
                  <th className="p-2">QTY</th>
                  <th className="p-2">Consumed QTY</th>
                  <th className="p-2">Remaining</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(todayStock).length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-2 text-center text-rose">
                      No stock found
                    </td>
                  </tr>
                ) : (
                  Object.keys(todayStock).map((productId) => {
                    const product = todayStock[productId];
                    return (
                      <tr key={productId} className="border-t border-gray-700">
                        <td className="p-2">
                          {product.productId.name}{" "}
                          {product?.count && (
                            <button
                              className="transition-all ease-in-out hover:scale-[1.52] text-white bg-rose rounded-full py-1 px-2.5"
                            >
                              {product?.count}
                            </button>
                          )}
                        </td>
                        {/* <td className="p-2">{amountFormat(product.productId.price)}</td> */}
                        <td className="p-2">{product.quantity}</td>
                        <td className="p-2">
                          <ConsumedQuantity item={product} />
                        </td>
                        <td className="p-2">
                          {product.quantity - product.consumedQuantity || ""}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayStock;
