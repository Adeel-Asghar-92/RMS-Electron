import { amountFormat } from "../../../utils/amountFormat";

export const manufacturingPrintReport = (stockDetails, totalPrice) => {
  // Create report content with styling
  const reportContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Manufacturing Report</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          max-width: 300px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          display: flex;
          justify-content: center;
          margin-bottom: 0px;
        }
        .report-title {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .report-date {
          font-size: 14px;
          color: #666;
          margin: 7px 0px;
          display: flex;
          justify-content: center;
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
         td {
          text-align: left;
          padding: 5px;
          font-size: 14px;
        }
        th {
          text-align: left;
          padding: 5px;
          font-size: 12px;
        }
        .amount-col {
          text-align: right;
        }
        .amount-col1 {
          text-align: right;
          font-size: 18px;
        }
        .total-row {
          font-weight: bold;
          border-top: 1px solid #000;
          font-size: 16px;
        }
        .footer {
          display: flex;
          justify-content: center;
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
        <b>Manufacturing Report</b>
      </div>
      <b class="report-date">${new Date().toLocaleString()}</b>
      <div class="divider"></div>
      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cons. Qty</th>
            <th class="amount-col">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${stockDetails.map(item => `
            <tr>
              <th>${item.productDetails.name}</th>
              <th>${item.totalConsumedQuantity || item.totalWeight + " KG"}</th>
              <th class="amount-col">${item.totalPrice.toFixed(2)}</th>
            </tr>
          `).join('')}
          <tr class="total-row">
            <th >Total</th>
            <th colspan="2" class="amount-col1">${amountFormat(totalPrice)}</th>
          </tr>
        </tbody>
      </table>
      
      <div class="divider"></div>
      <div class="footer">
        <b>Thank you!</b>
      </div>
    </body>
    </html>
  `;

  // Open new window and print
  const printWindow = window.open("", "Manufacturing Report", "height=600,width=400");
  printWindow.document.write(reportContent);
  printWindow.document.close();

  // Wait for resources to load then print
  printWindow.onload = function () {
    printWindow.print();
  };
  // Close the window after printing
  printWindow.onafterprint = function () {
    printWindow.close();
  };
};
export const printOrderReport = (stockDetails, totalPrice) => {
  // Create report content with styling
  const reportContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Manufacturing Report</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          max-width: 300px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          display: flex;
          justify-content: center;
          margin-bottom: 0px;
        }
        .report-title {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .report-date {
          font-size: 14px;
          color: #666;
          margin: 7px 0px;
          display: flex;
          justify-content: center;
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
         td {
          text-align: left;
          padding: 5px;
          font-size: 14px;
        }
        th {
          text-align: left;
          padding: 5px;
          font-size: 12px;
        }
        .amount-col {
          text-align: right;
        }
        .amount-col1 {
          text-align: right;
          font-size: 18px;
        }
        .total-row {
          font-weight: bold;
          border-top: 1px solid #000;
          font-size: 16px;
        }
        .footer {
          display: flex;
          justify-content: center;
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
        <b>Order Report</b>
      </div>
      <b class="report-date">${new Date().toLocaleString()}</b>
      <div class="divider"></div>
      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Qty</th>
            <th>Rate</th>
            <th class="amount-col">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${stockDetails.map(item => `
            <tr>
              <th>${item.name}</th>
              <th>${item.totalQuantity}</th>
              <th>${item.totalQuantity ? item.price : ""}</th>
              <th class="amount-col">${item.totalRevenue}</th>
            </tr>
          `).join('')}
          <tr class="total-row">
            <th colspan="2">Total</th>
            <th colspan="2" class="amount-col1">${amountFormat(totalPrice)}</th>
          </tr>
        </tbody>
      </table>
      
      <div class="divider"></div>
      <div class="footer">
        <b>Thank you!</b>
      </div>
    </body>
    </html>
  `;
  
  // Open new window and print
  const printWindow = window.open("", "Manufacturing Report", "height=600,width=400");
  printWindow.document.write(reportContent);
  printWindow.document.close();

  // Wait for resources to load then print
  printWindow.onload = function () {
    printWindow.print();
  };
  // Close the window after printing
  printWindow.onafterprint = function () {
    // printWindow.close();
  };
};
