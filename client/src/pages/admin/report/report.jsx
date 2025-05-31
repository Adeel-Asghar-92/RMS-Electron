import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../utils/axios";
import { amountFormat } from "../../../utils/amountFormat";
import "./report.css";
import { manufacturingPrintReport, printOrderReport } from "./actions";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Report = () => {
  const [stockDetails, setStockDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [expenses, setExpenses] = useState({ expenses: [], totalAmount: 0 });

  const [orderDetails, setOrderDetails] = useState({
    productSales: [],
    summary: {},
  });

  const fetchStockDetails = async () => {
    try {
      const response = await axiosInstance.get(
        "/regularStock/getStockDetailsByDate",
        {
          params: new URLSearchParams({
            startDate,
            endDate,
          }),
          headers: {
            Authorization: localStorage.getItem("admin_auth_token"),
          },
        }
      );

      const data = response.data.data;
      let total = 0;

      const updatedData = data.map((item) => {
        const formula = item.productDetails.formula
          ? item.productDetails.formula
          : "";
        const totalConsumedQuantity = item.totalConsumedQuantity;
        const totalWeight = item.totalWeight;
        const mundiRate = item.productDetails.mundiRate;

        const totalPrice =
          totalConsumedQuantity * eval(mundiRate.toString() + formula) ||
          totalWeight * eval(mundiRate.toString() + formula);
        total += totalPrice;

        return {
          ...item,
          totalPrice,
        };
      });

      setStockDetails(updatedData);
      setTotalPrice(total);
    } catch (error) {
      console.error("Error fetching stock details", error);
    }
  };

  const fetchOrderDetails = async () => {
    try {
      const response = await axiosInstance.get("/orders/getOrderAnalytics", {
        params: new URLSearchParams({
          startDate: startDate,
          endDate: endDate,
        }),
        headers: {
          Authorization: localStorage.getItem("admin_auth_token"),
        },
      });
      setOrderDetails(response.data);
    } catch (error) {
      console.error("Error fetching order details", error);
    }
  };

  const fetchExpensesByDate = async () => {
    try {
      const response = await axiosInstance.get("/expenses/byDate", {
        params: new URLSearchParams({
          startDate,
          endDate,
        }),
        headers: {
          Authorization: localStorage.getItem("admin_auth_token"),
        },
      });
      setExpenses(response.data);
      console.log("response.data", response.data);
    } catch (error) {
      console.error("Error fetching expenses by date", error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
    fetchStockDetails();
    fetchExpensesByDate();
  }, [startDate, endDate]);

  const printManuFacturingReport = () => {
    manufacturingPrintReport(stockDetails, totalPrice);
  };

  // Function to download Manufacturing Report as PDF
  const downloadManufacturingReportPDF = async () => {
    const printButtonsElement = document.querySelectorAll(".print-buttons");
    printButtonsElement.forEach((el) => (el.style.display = "none"));
    const element = document.querySelector(".manufacturing-report"); // Add a class to the manufacturing report container
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Manufacturing_Report.pdf");
    printButtonsElement.forEach((el) => (el.style.display = "flex"));
  };

  // Function to download Order Report as PDF
  const downloadOrderReportPDF = async () => {
    const printButtonsElement = document.querySelectorAll(".print-buttons");
    printButtonsElement.forEach((el) => (el.style.display = "none"));
    const element = document.querySelector(".order-report"); // Add a class to the order report container
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Order_Report.pdf");
    printButtonsElement.forEach((el) => (el.style.display = "flex"));
  };

  const [items, setItems] = useState([
    { id: "Report Details", label: "Report Details", isActive: true },
    { id: "calculation", label: "Calculation", isActive: false },
  ]);

  const handleTabClick = (id) => {
    const updatedItems = items.map((item) => ({
      ...item,
      isActive: item.id === id,
    }));
    setItems(updatedItems);
  };
  return (
    <>
      <div className="flex justify-between items-center text-black">
        <nav className="flex overflow-x-auto hide-scrollbar">
          {items.map((item) => (
            <p
              key={item.id}
              className={`relative px-[19px] py-2.5 text-base font-medium whitespace-nowrap transition-colors`}
              onClick={() => handleTabClick(item.id)}
            >
              {item.label}
              {item.isActive && (
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#fc9d74]" />
              )}
            </p>
          ))}
        </nav>
        <div className="flex justify-between items-center gap-4">
          <label className="block text-sm mb-1">
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-[5px] rounded border-1 border-[#474C59] bg-transparent  placeholder:text-base placeholder:font-medium "
            />
          </label>
          <label className="block text-sm mb-1">
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-[5px] rounded border-1 border-[#474C59] bg-transparent  placeholder:text-base placeholder:font-medium "
            />
          </label>
        </div>
      </div>
      {items[0].isActive ? (
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4 lg:flex lg:flex-col">
          <div className="report-container bg-white text-black shadow rounded-2xl p-4 manufacturing-report">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-semibold text-secondary mb-4">
                Manufacturing <span className="text-rose">Report</span>
              </h1>
              <div className="flex gap-2 print-buttons">
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                  onClick={downloadManufacturingReportPDF}
                >
                  Download
                </button>
                <button
                  className="bg-rose text-white px-4 py-1 rounded"
                  onClick={() => printManuFacturingReport()}
                >
                  Print
                </button>
              </div>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300 text-[#656870]">
                    <th className="p-2">Name</th>
                    <th className="p-2">Qty</th>
                    <th className="p-2">Cons Qty</th>
                    <th className="p-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {stockDetails.map((item, index) => (
                    <tr key={index} className="border-t border-gray-300">
                      <td className="p-2">{item.productDetails.name}</td>
                      <td className="p-2">{item.totalQuantity}</td>
                      <td className="p-2">
                        {item.totalConsumedQuantity || item.totalWeight + " KG"}
                      </td>
                      <td className="p-2 text-right">
                        {item.totalPrice.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t border-gray-300">
                    <th className="p-2">Total</th>
                    <th className="p-2 text-rose text-right" colSpan="2">
                      {amountFormat(totalPrice)}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="report-container bg-white text-black shadow rounded-2xl p-4 order-report">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-semibold text-secondary mb-4">
                Order <span className="text-rose">Report</span>
              </h1>
              <div className="flex gap-2 print-buttons">
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                  onClick={downloadOrderReportPDF}
                >
                  Download
                </button>
                <button
                  className="bg-rose text-white px-4 py-1 rounded"
                  onClick={() =>
                    printOrderReport(
                      orderDetails.productSales,
                      orderDetails?.summary?.totalRevenue
                    )
                  }
                >
                  Print
                </button>
              </div>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300 text-[#656870]">
                    <th className="p-2">Name</th>
                    <th className="p-2">Qty</th>
                    <th className="p-2">Rate</th>
                    <th className="p-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails?.productSales?.map((item, index) => (
                    <tr key={index} className="border-t border-gray-300">
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.totalQuantity}</td>
                      <td className="p-2">
                        {item.totalQuantity ? item.price : ""}
                      </td>
                      <td className="p-2 text-right">
                        {item.totalRevenue.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t border-gray-300">
                    <th className="p-2">Total</th>
                    <th className="p-2"></th>
                    <th className="p-2 text-rose text-right" colSpan="2">
                      {amountFormat(orderDetails?.summary?.totalRevenue || 0)}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3">
          <div className="report-container bg-white text-black shadow rounded-2xl p-4">
            <h1 className="text-lg font-semibold text-secondary mb-4">
              Calculation <span className="text-rose">Report</span>
            </h1>
            <div className="overflow-x-auto mt-4">
              <table className="w-1/2">
                <tbody>
                  <tr className="border-b-2 border-gray-300 text-[#656870]">
                    <td className="p-2">Sale Amt</td>
                    <td className="p-2 text-right">
                      {amountFormat(orderDetails?.summary?.totalRevenue)}
                    </td>
                  </tr>
                  <tr className="border-b-2 border-gray-300 text-[#656870]">
                    <td className="p-2">Manufacturing Amt</td>
                    <td className="p-2 text-right">
                      {amountFormat(totalPrice)}
                    </td>
                  </tr>
                  <tr className="border-b-2 border-gray-300 text-[#656870]">
                    <td className="p-2">Expenses</td>
                    <td className="p-2 text-right">
                      {amountFormat(expenses.totalAmount)}
                    </td>
                  </tr>
                  <tr className="border-b-2 bg-lime-300 border-gray-300 text-[#656870]">
                    <td className="p-2 font-bold">Total PSF</td>
                    <td className="p-2 text-right font-bold">
                      {amountFormat(
                        orderDetails?.summary?.totalRevenue -
                          totalPrice -
                          expenses.totalAmount
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Report;
