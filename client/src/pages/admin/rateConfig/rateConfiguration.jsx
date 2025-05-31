import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectShopId } from "../../../Redux/shop/shopSelectors";
import { axiosInstance } from "../../../utils/axios";
import axios from "axios";
import { toastError, toastSuccess } from "../../../utils/toasts";
import Loader from "../../../Components/UI/Loaders/loader";

const RateConfiguration = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const shopId = useSelector(selectShopId);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products/allProducts", {
          params: { isStockAble: false, shopId, parentProduct: false },
          headers: { Authorization: localStorage.getItem("admin_auth_token") },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchProducts1 = async () => {
      try {
        const response = await axiosInstance.get("/regularStock/getStockDetailsByDate", {
          params: new URLSearchParams({
            startDate: "2025-02-26",
            endDate: "2025-02-27",
          }),
          headers: { Authorization: localStorage.getItem("admin_auth_token") },
        });
        // setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchProducts1();
    fetchProducts();
  }, [shopId]);

  const handleInputChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    if (field === "mundiRate" || field === "formula") {
      if (
        updatedProducts[index].mundiRate.toString().length > 1 &&
        updatedProducts[index].formula?.trim().length > 1
      ) {
        updatedProducts[index].actualResult = calculateActualResult(
          updatedProducts[index].mundiRate,
          updatedProducts[index].formula
        );
      }
    }
    setProducts(updatedProducts);
  };

  const handleFormulaChange = (index, newFormula) => {
    const updatedProducts = [...products];
    updatedProducts[index].formula = newFormula;
    setProducts(updatedProducts);
  };
  const calculateActualResult = (mundiRate = 0, formula = "*1") => {
    // Trim the formula to remove any whitespace
    const trimmedFormula = formula?.trim();

    // First check if the formula is empty
    if (!trimmedFormula) {
      return mundiRate;
    }

    try {
      // Check if the formula starts with an operator
      if (/^[+\-*/]/.test(trimmedFormula)) {
        // If it starts with an operator, directly evaluate
        return eval(mundiRate.toString() + trimmedFormula);
      } else {
        // If it doesn't start with an operator, assume multiplication
        return eval(mundiRate.toString() + "*" + trimmedFormula);
      }
    } catch (error) {
      console.error("Invalid formula:", error);
      return mundiRate; // Return original price if formula is invalid
    }
  };

  const handleSave = async () => {
    try {
      const response = await axiosInstance.post("/products/saveProductsRates", { products });
      if (response.status === 200) {
        toastSuccess("Products saved successfully!");
      } else {
        toastError("Failed to save products.");
      }
    } catch (error) {
      console.error("Error saving products:", error);
      toastError("An error occurred while saving products.");
    }
  };



  return (
    <div className="rate-configuration">
      <button
        onClick={handleSave}
        className="bg-rose text-white py-2 px-6 mb-10 rounded hover:opacity-90 transition-opacity float-end"
      >
        Save
      </button>
      {loading && <Loader />}

      <table className="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Rate</th>
            <th>Formula</th>
            <th>Manufacturing Price </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>
                <input
                  type="number"
                  value={product?.mundiRate || ""}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "mundiRate",
                      parseFloat(e.target.value)
                    )
                  }
                  className="p-[5px] pl-1 rounded-lg border-1 border-[#474C59] bg-transparent placeholder:text-base placeholder:font-medium placeholder:text-[#474C59] w-[204px] md:w-[200px]"
                />
              </td>
              <td>
                <input
                  type="string"
                  value={product?.formula || ""}
                  className="p-[5px] pl-1 rounded-lg border-1 border-[#474C59] bg-transparent placeholder:text-base placeholder:font-medium placeholder:text-[#474C59] w-[400px] md:w-[250px]"
                  onChange={(e) => handleFormulaChange(index, e.target.value)}
                />
              </td>
              <td>
                {calculateActualResult(product.mundiRate, product.formula)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
};

export default RateConfiguration;
