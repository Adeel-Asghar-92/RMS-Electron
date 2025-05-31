import { amountFormat, simpleAmountFormat } from "../../../utils/amountFormat";
import { axiosInstance } from "../../../utils/axios";
import { generateOrderToken } from "../../../utils/others";
import { toastError, toastSuccess } from "../../../utils/toasts";

export const printBill = (cart) => {
  const total = Object.entries(cart.items).reduce((sum, [_, item]) => {
    return sum + (item.quantity || 1) * item.price;
  }, 0);
  console.log("cart", cart);

  // Create bill content with improved styling
  const billContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Bill Receipt</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
      body {
        font-family: 'Poppins', 'Arial', sans-serif;
        max-width: 300px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fcfcfc;
        color: #333;
      }
      .business-info {
        text-align: center;
      }
      .header {
        text-align: center;
        margin-bottom: 0px;
      }
      .store-name {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 5px;
        color: #1a1a1a;
        letter-spacing: 0.5px;
      }
      .store-info {
        font-size: 12px;
        color: #555;
        text-align: center;
      }
      .bill-date {
        font-size: 14px;
        color: #555;
        margin: 5px 0;
        line-height: 1.4;
      }
      .divider {
        border-top: 1px dashed #999;
        margin: 10px 0;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 15px;
      }
      th, td {
        text-align: left;
        padding: 6px 5px;
        font-size: 12px;
      }
      thead {
        border-bottom: 1px solid #ddd;
      }
      th {
        font-weight: 600;
      }
      .amount-col {
        text-align: right;
      }
      .total-row {
        font-weight: 700;
        border-top: 1px solid #333;
        font-size: 16px;
      }
      .total-row th, .total-row td {
        padding-top: 8px;
      }
      .footer {
        font-size: 14px;
        margin-top: 15px;
        color: #555;
        text-align: center;
        line-height: 1.5;
      }
      .footer b {
        color: #333;
      }
      @media print {
        body {
          width: 80mm;
          background-color: white;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
      .footer-link {
        font-size: 10px;
        color: #777;
        margin-top: 15px;
        display: block;
      }
      .receipt-title {
        font-size: 16px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin: 5px 0;
      }
      .address-info {
        font-size: 13px;
        line-height: 1.4;
      }
      .item-row td, .item-row th {
        padding: 8px 5px;
        border-bottom: 1px solid #eee;
      }
      .item-name {
        font-weight: 500;
      }
    </style>
  </head>
  <body>
    <div class="business-info">
      <div class="store-name">Chaman Muragh Pulao</div>
    </div>

     <div class="business-info receipt-title">Order Receipt</div>
    <div class="business-info bill-date">${new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}</div>
    <br />
    <div class="address-info">
    <table style="border:none; margin:0px;">
      <tr style="border:none">
        <td style="border:none; vertical-align:top;  padding:0px; text-align:left;"><b>Address:</b></td>
        <td style="border:none; font-size:14px; padding:0px;">Jaranwala Road, Near Sonery Bank, Khurrianwala</td>
      </tr>
      <tr style="border:none;">
        <td style="border:none; padding:5px 0px; text-align:left;"><b>Contact:</b></td>
        <td style="border:none; font-size:14px; padding:5px 0px;">+923006662096</td>
      </tr>
    </table>
    </div>

    <div class="divider"></div>
    
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Rate</th>
          <th>Qty</th>
          <th class="amount-col">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(cart.items)
          .map(
            ([_, item]) => `
          <tr class="item-row">
            <th class="item-name">${item.name}</th>
            <th>${item.price}</th>
            <th>${item.quantity || "1"}</th>
            <th class="amount-col">${simpleAmountFormat(
              item.price * (item.quantity || 1)
            )}</th>
          </tr>
        `
          )
          .join("")}
        <tr class="total-row">
          <th colspan="2">Total</th>
          <th colspan="2" class="amount-col" style="font-size: 18px;">${amountFormat(
            total
          )}</th>
        </tr>
      </tbody>
    </table>
    
    <div class="divider"></div>
    <br />
    <div class="footer">
      <b>Thank you for dining with us!</b><br>
      <span>We appreciate your visit and look forward to serving you again.</span>
      
      <div class="footer-link">
        Software Developed by Adeel Asghar<br>
        Contact: +923038040227
      </div>
    </div>
  </body>
  </html>
`;

  // Open new window and print
  const printWindow = window.open("", "Print Bill", "height=600,width=400");
  printWindow.document.write(billContent);
  printWindow.document.close();

  // Wait for resources to load then print
  printWindow.onload = function () {
    printWindow.print();
  };
  printWindow.onafterprint = function () {
    printWindow.close();
  };
};
export const orderTokenPrint = (cart, tokenNo, customerType) => {
  const total = Object.entries(cart).reduce((sum, [_, item]) => {
    return sum + (item.quantity || 1) * item.price;
  }, 0);
  // Create bill content with styling
  const billContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Bill Receipt</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        max-width: 300px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0px;
      }
      .store-name {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 5px;
      }
      .bill-date {
        font-size: 14px;
        color: #666;
        margin: 7px 0px;
        display: flex;
        justify-content: flex-end;
      }
      .divider {
        border-top: 1px dashed #000;
        margin: 10px 0;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 15px;
      }
      th, td {
        text-align: left;
        padding: 5px;
        font-size: 12px;
      }
      .amount-col {
        text-align: right;
      }
      .total-row {
        font-weight: bold;
        border-top: 1px solid #000;
      }
      .footer {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        margin-top: 20px;
        color: #666;
      }
      @media print {
        body {
          width: 80mm; /* Standard thermal printer width */
        }
      }
    </style>
  </head>
  <body>
    <div class="header">
      <b>Token: ${tokenNo} </b>
      <b>${customerType === "eatIn" ? "Sitting" : "Counter"}</b>
    </div>
    <b class="bill-date">${new Date().toLocaleString()}</b>
    <div class="divider"></div>
    
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Rate</th>
          <th>Qty</th>
          <th class="amount-col" style="text-align: right;">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(cart)
          .map(
            ([_, item]) => `
          <tr>
            <th>${item.name}</th>
            <th>${simpleAmountFormat(item.price)}</th>
            <th>${item.quantity || ""}</th>
            <th class="amount-col" style="text-align: right;">${simpleAmountFormat(
              item.price * (item.quantity || 1)
            )}</th>
          </tr>
        `
          )
          .join("")}
        <tr class="total-row">
          <th colspan="2" style="font-size: 20px;">Total Payable</th>
          <th colspan="2" class="amount-col" style="text-align: right; font-size: 20px;">${amountFormat(
            total
          )}</th>
        </tr>
      </tbody>
    </table>
    
    <div class="divider"></div>
    <div class="footer">
      <b>Please Visit Again</b>
      <b>Thank you!</b>
    </div>
  </body>
  </html>
`;

// window.onload = function() {
//   setTimeout(function() {
//     window.print();
//   }, 500);
// }
// window.onafterprint = function() {
//   setTimeout(function() {
//     window.close();
//   }, 1000);
// }
  // Open new window and print
  const printWindow = window.open("", "_blank", "height=600,width=400");
  if (!printWindow) {
    alert("Please allow pop-ups for this website to print receipts");
    return;
  }

  printWindow.document.writeln(billContent);
  printWindow.document.close();
  printWindow.onload = function () {
    printWindow.print();
  };
  printWindow.onafterprint = function () {
    printWindow.close();
  };
};

export const orderPrintDirect = (cart, tokenNo, customerType) => {
  const total = Object.entries(cart).reduce((sum, [_, item]) => {
    return sum + (item.quantity || 1) * item.price;
  }, 0);
  // Create bill content with styling
  const billContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Bill Receipt</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        max-width: 300px;
        margin: 0 auto;
        padding: 10px;
      }
      .business-info{
        text-align: center;
      }
      .header{
        text-align: center;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
      }
      .footer {
        text-align: center;
      }
      .store-name {
        font-size: 22px;
        font-weight: bold;
      }
      .business-info {
        font-size: 12px;
        margin-bottom: 10px;
      }
      .bill-date {
        font-size: 14px;
        color: #666;
        margin: 5px 0;
      }
      .divider {
        border-top: 1px dashed #000;
        margin: 10px 0;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 15px;
      }
      th, td {
        text-align: left;
        padding: 5px;
        font-size: 14px;
      }
      .amount-col {
        text-align: right;
      }
      .total-row {
        font-weight: bold;
        border-top: 1px solid #000;
      }
      .footer {
        font-size: 14px;
        margin-top: 15px;
        color: #666;
      }
      @media print {
        body {
          width: 80mm;
          margin: none;
        }
      }
      .footer-link {
        font-size: 10px;
        color: #666;
      }



    </style>
  </head>
  <body>

    <!-- Business Info -->
    <div class="business-info">
      <div class="store-name">Chaman Murgh Pulao</div>
      <br />
      <br />
      </div>
      <div class="bill-date"><b> Address:</b> Chaman Murgh Palao, Jaranwala Road, Near Sonery Bank, khurrianwala</div>
      <div class="bill-date"><b> Contact:</b> +923006662096 </div>
      <br />
    <div class="divider"></div>

    <!-- Order Info -->
    <div class="header">
      Order: ${tokenNo}
      <b>${customerType === "eatIn" ? "Sitting" : "Counter"}</b>
    </div>
    <div class="bill-date">Date: ${new Date().toLocaleString()}</div>

    <div class="divider"></div>

    <!-- Order Items -->
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Rate</th>
          <th>Qty</th>
          <th class="amount-col">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(cart)
          .map(
            ([_, item]) => `
          <tr>
            <th>${item.name}</th>
            <th>${simpleAmountFormat(item.price)}</th>
            <th>${item.quantity || ""}</th>
            <th class="amount-col">${simpleAmountFormat(
              item.price * (item.quantity || 1)
            )}</th>
          </tr>
        `
          )
          .join("")}
        <tr class="total-row">
          <th colspan="2" style="font-size: 18px;">Total</th>
          <th colspan="2" class="amount-col" style="font-size: 18px;">${amountFormat(
            total
          )}</th>
        </tr>
      </tbody>
    </table>

    <div class="divider"></div>

    <!-- Footer Message -->
    <br />
    <br />
    <br />
    <div class="footer">
      <b>Thank you for dining with us!</b><br>
      <span>We appreciate your visit and look forward to serving you again.</span>
      <br />
      <br />
      <br />
      <br />
      <span class="footer-link">
        Software Developed by
        <a href="" target="_blank" class="footer-link">Adeel Asghar</a>
        <br />
        Contact us @ +923038040227
      </span>
    </div>

  </body>
  </html>
`;

  // Open new window and print
  const printWindow = window.open("", "Order Token", "height=600,width=400");
  printWindow.document.write(billContent);
  printWindow.document.close();

  // Wait for resources to load then print
  printWindow.onload = function () {
    printWindow.print();
    // Uncomment below line if you want the print window to close after printing
    // printWindow.close();
  };
  // Close the window after printing
  printWindow.onafterprint = function () {
    printWindow.close();
  };
};

export const handleMakeOrder = async (
  cart,
  order,
  shopId,
  customerType,
  orderDate,
  setLoading,
  setRefresh,
  setCart,
  customerBill,
  setOrderToken,
  setRefetchProducts
) => {
  setRefresh(false);
  setRefetchProducts(false);
  const newTotal = Object.entries(cart).reduce((sum, [_, item]) => {
    return sum + (item.quantity || 1) * item.price;
  }, 0);
  if (Object.keys(cart).length > 0) {
    setLoading(true);
    const orderItems = Object.entries(cart)
      // .filter(([_, item]) => item.quantity > 0)
      .map(([productId, item]) => ({
        productId,
        quantity: item.quantity || 0,
        price: item.price,
        name: item.name,
        unit: item.unit,
        isStockAble: item.isStockAble,
        ...(item.unit === "plt" && { plateType: item?.plateType || "" }),
        ...(item?.parentProduct && {
          parentProduct: item.parentProduct,
          dealProducts: item.dealProducts,
        }),
      }));
    const orderId = order?.tokenNo || generateOrderToken();
    const orderData = {
      items: orderItems,
      orderId,
      totalAmount: newTotal,
      shopId,
      customerType,
      orderDate: orderDate || "",
    };
    const url = order?.id ? `/orders/updateOrderById/${order?.id}` : "/orders";
    const method = order?.id ? "put" : "post";
    await axiosInstance[method](url, orderData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("admin_auth_token"),
      },
    })
      .then((res) => {
        const message = order?.id
          ? "Order updated successfully"
          : "Order placed successfully";
        toastSuccess(message);
        customerBill
          ? orderPrintDirect(cart, orderId, customerType)
          : orderTokenPrint(cart, orderId, customerType);
        setCart({});
        setOrderToken("");
        setRefetchProducts(res.data)
      })
      .catch((error) => {
        console.error(error);
        toastError(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
        setRefresh(true);
      });
  } else {
    toastError("Please add items before placing order");
  }
};

export const getOrderById = async (orderId, setCart, setOrder, setLoading) => {
  setLoading(true);
  await axiosInstance
    .get(`/orders/getOrderByOrderId/${orderId}`, {
      headers: {
        Authorization: localStorage.getItem("admin_auth_token"),
      },
    })
    .then((res) => {
      
      setOrder({ id: res.data._id, tokenNo: res.data.orderId });
      const newItems = res.data.items.reduce((acc, item) => {
        acc[item.productId] = item;
        return acc;
      }, {});
      setCart(newItems);
    })
    .catch((error) => {
      toastError(error.response.data.message);
      console.log(error);
    })
    .finally(() => {
      setLoading(false);
    });
};

export const orderKpis = async (setTodayStock) => {
  try {
    const res = await axiosInstance.get(`/orders/orderKpis`, {
      headers: {
        Authorization: localStorage.getItem("admin_auth_token"),
      },
    });
    
    const { totalOrders, totalRevenue } = res.data;
    setTodayStock((prevState) => ({
      ...prevState,
      totalOrders: totalOrders,
      totalRevenue: totalRevenue,
    }));
  } catch (err) {
    toastError(err.response?.data?.message || "Something went wrong");
  }
};
