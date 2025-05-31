import React, { useState, useEffect, useRef } from "react";
import { axiosInstance } from "../../../utils/axios";
import Loader from "../../../Components/UI/Loaders/loader";
import { amountFormat } from "../../../utils/amountFormat";
import { orderKpis, getOrderById, handleMakeOrder } from "./actions";
import { useSelector } from "react-redux";
import { selectShopId } from "../../../Redux/shop/shopSelectors";
import MiniOrderList from "../orderList/miniOrderList";

const Showcase = () => {
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);
  const shopId = useSelector(selectShopId);
  const [refresh, setRefresh] = useState(true);
  const [refetchProducts, setRefetchProducts] = useState(true);
  const [loading, setLoading] = useState(true);
  const [customerType, setCustomerType] = useState("eatIn");
  const [orderToken, setOrderToken] = useState("");
  const [order, setOrder] = useState("");
  const [todayOrder, setTodayOrder] = useState({});
  const [showKpi, setShowKpi] = useState(false);
  const [orderDate, setOrderDate] = useState("");
  // Refs for input fields
  const inputRefs = useRef([]);

  useEffect(() => {
    if (refetchProducts) {
      fetchProducts();
      orderKpis(setTodayOrder);
    }
  }, [refetchProducts]);

  useEffect(() => {
    const newTotal = Object.entries(cart).reduce((sum, [_, item]) => {
      return sum + (item.quantity || 1) * item.price;
    }, 0);
    setTotal(newTotal);
  }, [cart]);

  const token = localStorage.getItem("admin_auth_token");
  const fetchProducts = async () => {
    try {
      const [{ data: products }, { data: todayStock }] = await Promise.all([
        axiosInstance.get("/products/getProductsCategorizedByCategory", {
          headers: { Authorization: token },
        }),
        axiosInstance.get(`/regularStock/todayStock/${shopId}`, {
          headers: { Authorization: localStorage.getItem("admin_auth_token") },
        }),
      ]);

      const platesData = Object.values(todayStock).find((item) =>
        item.hasOwnProperty("fullPlateConsumedQuantity")
      );

      const newData = products.map((item) => {
        if (todayStock[item._id]) {
          item.rem =
            todayStock[item._id].quantity -
            todayStock[item._id].consumedQuantity;
        }
        if (item.name.toLowerCase().includes("full")) {
          item.rem = platesData?.fullPlateConsumedQuantity || 0
        }else if (item.name.toLowerCase().includes("half")) {
          item.rem = platesData?.halfPlateConsumedQuantity || 0
        }
        return item;
      });

      // const platesData = Object.values(todayStock).find((item) =>
      //   item.hasOwnProperty("fullPlateConsumedQuantity")
      // );
      setTodayOrder((prev) => ({
        ...prev,
        totalPlates: platesData
          ? platesData.fullPlateConsumedQuantity +
            platesData.halfPlateConsumedQuantity
          : 0,
      }));
      setCategories(newData);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (product, quantity) => {
    // Ensure the input is a number
    if (!/^\d*$/.test(quantity)) return; // Only allow digits

    const {
      name,
      _id,
      price,
      parentProduct,
      unit,
      plateType,
      isStockAble,
      dealProducts,
    } = product;
    setCart((prev) => {
      const updatedCart = { ...prev };
      if (quantity > 0) {
        updatedCart[_id] = {
          quantity: parseInt(quantity) || 0,
          price,
          name,
          parentProduct,
          unit,
          plateType,
          isStockAble,
          dealProducts,
        };
      } else {
        delete updatedCart[_id];
      }
      return updatedCart;
    });
  };

  const handlePriceChange = (product, price) => {
    // Ensure the input is a number
    if (!/^\d*\.?\d*$/.test(price)) return; // Only allow digits and a single decimal point

    const {
      name,
      _id,
      quantity,
      parentProduct,
      unit,
      plateType,
      isStockAble,
      dealProducts,
    } = product;
    setCart((prev) => {
      const updatedCart = { ...prev };
      if (price > 0) {
        updatedCart[_id] = {
          quantity,
          price: parseFloat(price) || 0,
          name,
          parentProduct,
          unit,
          plateType,
          isStockAble,
          dealProducts,
        };
      } else {
        delete updatedCart[_id];
      }
      return updatedCart;
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleMakeOrder(
        cart,
        order,
        shopId,
        customerType,
        orderDate,
        setLoading,
        setRefresh,
        setCart,
        false,
        setOrderToken,
        setRefetchProducts
      );
      const firstInput = inputRefs.current.find((ref) => ref);
      firstInput?.focus();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();

      const currentIndex = inputRefs.current.findIndex(
        (ref) => ref === document.activeElement
      );

      if (currentIndex < inputRefs.current.length - 1) {
        if (inputRefs.current[currentIndex + 1])
          inputRefs.current[currentIndex + 1]?.focus();
        else if (inputRefs.current[currentIndex + 2])
          inputRefs.current[currentIndex + 2]?.focus();
        else if (inputRefs.current[currentIndex + 3])
          inputRefs.current[currentIndex + 3]?.focus();
        // inputRefs.current[currentIndex + 2]?.focus();
        // inputRefs.current[currentIndex + 3]?.focus();
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const currentIndex = inputRefs.current.findIndex(
        (ref) => ref === document.activeElement
      );
      if (currentIndex > 0) {
        if (inputRefs.current[currentIndex - 1])
          inputRefs.current[currentIndex - 1]?.focus();
        else if (inputRefs.current[currentIndex - 2])
          inputRefs.current[currentIndex - 2]?.focus();
        else if (inputRefs.current[currentIndex - 3])
          inputRefs.current[currentIndex - 3]?.focus();
        // inputRefs.current[currentIndex - 2]?.focus();
        // inputRefs.current[currentIndex - 1]?.focus();
        // inputRefs.current[currentIndex - 3]?.focus();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [cart]);

  let timer;
  useEffect(() => {
    if (orderToken) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        getOrderById(orderToken, setCart, setOrder, setLoading);
      }, 500);
    } else {
      setOrder("");
    }
  }, [orderToken]);

  const showKpis = () => {
    setShowKpi(!showKpi);
  };

  const reset = () => {
    setCart({});
    setOrderToken("");
    setOrder("");
    setTotal(0);
    setCustomerType("eatIn");
    setShowKpi(false);
    setOrderDate("");
  };

  return (
    <div className="text-black">
      {loading && <Loader />}
      <div className="grid grid-cols-5 gap-4 mb-3">
        {showKpi && (
          <>
            <div className="col-span-1 lg:col-span-1 bg-white shadow rounded-2xl p-4">
              <h1 className="text-lg font-semibold text-secondary">
                Today's <span className="text-rose">Income</span>
              </h1>
              <p className="text-md text-accent font-bold">
                {amountFormat(todayOrder?.totalRevenue)}
              </p>
            </div>
            <div className="col-span-1 lg:col-span-1 bg-white shadow rounded-2xl p-4">
              <h1 className="text-lg font-semibold text-secondary">
                Today's <span className="text-rose">Orders</span>
              </h1>
              <p className="text-md text-accent font-bold">
                {todayOrder?.totalOrders}
              </p>
            </div>
            <div className="col-span-1 lg:col-span-1 bg-white shadow rounded-2xl p-4">
              <h1 className="text-lg font-semibold text-secondary">
                Daig <span className="text-rose">Plates</span>
              </h1>
              <p className="text-md text-accent font-bold">
                {todayOrder?.totalPlates}
              </p>
            </div>
          </>
        )}
        {localStorage.getItem("role") === "admin" && (
          <button
            className="fixed top-[4%] text-xs right-[23%] bg-rose p-2 py-2 rounded-lg text-white"
            onClick={showKpis}
          >
            Show Kpi's
          </button>
        )}

        {/* <TodayStock refresh={refresh} setRefresh={setRefresh} /> */}
        {/* <RenewDaig setRefresh={setRefresh} /> */}
      </div>
      <div className="grid grid-cols-8 lg:grid-cols-1 gap-4">
        <div className="col-span-5 lg:col-span-1 bg-white shadow rounded-2xl p-4">
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="flex justify-between space-x-4 mb-4">
                <div className="flex items-center space-x-4">
                  {/* <span className=" font-semibold">Customer Type:</span> */}
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="customerType"
                      value="eatIn"
                      className="mr-2"
                      checked={customerType === "eatIn"}
                      onChange={(e) => setCustomerType(e.target.value)}
                    />
                    Sitting
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="customerType"
                      value="takeAway"
                      className="mr-2"
                      checked={customerType === "takeAway"}
                      onChange={(e) => setCustomerType(e.target.value)}
                    />
                    Counter
                  </label>
                </div>
                <label className="flex gap-2 items-end">
                  <button
                    className="bg-rose text-white py-[5px] px-3 rounded hover:opacity-90 transition-opacity"
                    onClick={reset}
                  >
                    Reset
                  </button>
                  <input
                    type="text"
                    className="w-full px-2 py-1 rounded-lg border-1 border-[#474C59] bg-transparent  placeholder:text-base placeholder:font-medium placeholder:text-[#aea7a7]"
                    placeholder="Order Token"
                    value={orderToken}
                    onChange={(e) => setOrderToken(e.target.value)}
                  />
                  <input
                    type="date"
                    value={orderDate}
                    onChange={(e) => setOrderDate(e.target.value)}
                    className="w-full px-2 py-1 rounded-lg border-1 border-[#474C59] bg-transparent  placeholder:text-base placeholder:font-medium "
                  />
                </label>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300 text-left text-[#656870]">
                    <th className="p-2  whitespace-nowrap">Input Qty</th>
                    <th className="p-2 cursor-pointer whitespace-nowrap">
                      Name
                    </th>
                    <th className="p-2 text-right whitespace-nowrap">Rate</th>
                    {localStorage.getItem("role") === "admin" && (
                      <th className="p-2 text-right whitespace-nowrap">Qty</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {
                    // categories.flatMap((category) =>
                    categories.map((product, index) => (
                      <tr
                        key={product._id}
                        className="border-t border-gray-300"
                      >
                        {" "}
                        <td className="px-2 py-[2px] whitespace-nowrap">
                          {!product?.withPrice ? (
                            <input
                              ref={(el) =>
                                (inputRefs.current[index * 2 + 1] = el)
                              }
                              autoFocus={0 === index}
                              type="text"
                              value={cart[product._id]?.quantity || ""}
                              onChange={(e) =>
                                handleQuantityChange(product, e.target.value)
                              }
                              placeholder=""
                              className="w-20 sm:w-24 md:w-32 px-2 py-1 border border-gray-300 rounded-md"
                            />
                          ) : (
                            <input
                              ref={(el) => (inputRefs.current[index * 2] = el)}
                              type="text"
                              value={cart[product._id]?.price || ""}
                              onChange={(e) =>
                                handlePriceChange(product, e.target.value)
                              }
                              placeholder="Price"
                              className="w-20 sm:w-24 md:w-32 px-2 py-1 border border-gray-300 rounded-md"
                            />
                          )}
                        </td>
                        <td className="px-2 py-[2px] whitespace-nowrap">
                          {product.name}
                        </td>
                        <td className="px-2 py-[2px] text-right whitespace-nowrap">
                          {product?.withPrice
                            ? ""
                            : amountFormat(product.price)}
                        </td>
                        {localStorage.getItem("role") === "admin" && (
                          <td
                            className={`px-2 py-[2px] text-right whitespace-nowrap ${
                              product?.rem <= 12 && !product.name.includes("Pulao") ? "bg-red-500 text-white" : ""
                            }`}
                          >
                            {!product?.withPrice
                              ? product?.rem
                                ? product.rem
                                : product.stock
                              : ""}
                          </td>
                        )}
                      </tr>
                    ))
                    // )
                  }
                  <tr className="border-t-2 border-gray-300 font-bold">
                    <td className="p-3 text-left">{amountFormat(total)}</td>
                    <td colSpan="3" className="p-3 text-left">
                      Total
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-span-3 lg:col-span-1 bg-white shadow rounded-2xl p-4">
          <div className="flex flex-col place-content-between h-full">
            <div>
              <div className="flex justify-between items-start">
                <p className="text-lg font-semibold text-secondary">
                  Bill <span className="text-rose"> Preview</span>
                </p>
                <button
                  onClick={() =>
                    handleMakeOrder(
                      cart,
                      order,
                      shopId,
                      customerType,
                      orderDate,
                      setLoading,
                      setRefresh,
                      setCart,
                      true,
                      setOrderToken,
                      setRefetchProducts
                    )
                  }
                  className="bg-rose text-white py-1 px-3 rounded hover:opacity-90 transition-opacity"
                >
                  Make Order
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300 text-left text-[#656870]">
                      <th className="p-2 whitespace-nowrap">Name</th>
                      <th className="p-2 text-right whitespace-nowrap">Qty</th>
                      <th className="p-2 text-right whitespace-nowrap">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(cart).map(([productId, item]) => (
                      <tr key={productId} className="border-t border-gray-300">
                        <td className="p-2 whitespace-nowrap">{item.name}</td>
                        <td className="p-2 text-right whitespace-nowrap">
                          {item.quantity}
                        </td>
                        <td className="p-2 text-right whitespace-nowrap">
                          {amountFormat(item.price * (item.quantity || 1))}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-gray-300 font-bold">
                      <td colSpan="1" className="p-3 text-left">
                        Total:
                      </td>
                      <td colSpan="2" className="p-3 text-right">
                        {amountFormat(total)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
              <div className="border-t-2 border-dashed border-gray-700">
                <p className="text-lg font-semibold text-secondary mt-1">
                  Recent <span className="text-rose">Orders </span>
                </p>

                <MiniOrderList
                  setOrderToken={setOrderToken}
                  refetch={refresh}
                />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
