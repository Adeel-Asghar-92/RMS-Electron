import React from "react";
import SearchIcon from "../../../images/search.svg";
import ActionIcon from "../../../images/actionIcon.svg";
import LeftIcon from "../../../images/chevron-right.svg";
import RightIcon from "../../../images/chevron-right (1).svg";
import "./dashboard.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import TotalSalesIcon from "../../../images/totalSales.svg";
import TotalIncomeIcon from "../../../images/totalIncome.svg";
import TotalOrdersIcon from "../../../images/totalOrder.svg";
const Dashboard = () => {
  const chartData = [
    { name: "Jan", value: 30 },
    { name: "Feb", value: 40 },
    { name: "Mar", value: 45 },
    { name: "Apr", value: 50 },
    { name: "May", value: 49 },
    { name: "Jun", value: 60 },
    { name: "Jul", value: 70 },
    { name: "Aug", value: 91 },
    { name: "Sep", value: 85 },
    { name: "Oct", value: 80 },
    { name: "Nov", value: 90 },
    { name: "Dec", value: 100 },
  ];

  return (
    <>
      <div className="flex flex-col  gap-4">
        {/* Stats */}
        <div className="grid grid-cols-3 md:grid-cols-1  gap-4 lg:flex lg:gap-[16px] lg:flex-col">
          <div className="bg-[#1B1B1B] p-4 rounded-lg h-[151px] flex flex-col justify-between lg:flex-1">
            <div className="font-normal text-lg text-[#BBBBBB] flex items-center gap-3">
              <img src={TotalSalesIcon} alt="" /> Total Sales
            </div>
            <div className="text-[32px] font-bold leading-8 lg:mt-[16px]">
              $456
            </div>
          </div>
          <div className="bg-[#1B1B1B] p-4 rounded-lg h-[151px] flex flex-col justify-between lg:flex-1">
            <div className="font-normal text-lg text-[#BBBBBB] flex items-center gap-3">
              {" "}
              <img src={TotalIncomeIcon} alt="" /> Total Income
            </div>
            <div className="text-[32px] font-bold leading-8 lg:mt-[16px]">
              $456
            </div>
          </div>
          <div className="bg-[#1B1B1B] p-4 rounded-lg h-[151px] flex flex-col justify-between lg:flex-1">
            <div className="font-normal text-lg text-[#BBBBBB] flex items-center gap-3">
              {" "}
              <img src={TotalOrdersIcon} alt="" /> Total Orders
            </div>
            <div className="text-[32px] font-bold leading-8 lg:mt-[16px]">
              45
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-[#1B1B1B] py-9 px-6 rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Orders</h3>
            <div className="m-1">
              <select
                className="bg-[#262626] rounded-full px-4 py-2 text-white focus:outline-none"
                style={{ padding: "8px 12px" }}
              >
                <option value="Year">Year</option>
                <option value="Month">Month</option>
                <option value="Week">Week</option>
                <option value="Day">Day</option>
              </select>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid
                vertical={true}
                horizontal={false}
                strokeDasharray="3 3"
                stroke="#2D3748"
              />
              <XAxis dataKey="name" stroke="#718096" axisLine={false} />
              <YAxis stroke="#718096" axisLine={false} tick={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1A202C", border: "none" }}
                itemStyle={{ color: "#FFFFFF" }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10B981"
                strokeWidth={2}
                dot={{
                  stroke: "#10B981",
                  strokeWidth: 2,
                  fill: "#10B981",
                  r: 6,
                }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom grid */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:flex lg:flex-col lg:gap-[16px]">
          {/* Top Products */}
          <div className="bg-[#1B1B1B] p-4 rounded-lg lg:flex-1">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Top Products</h3>

              <select
                className="bg-[#262626] rounded-full px-4 py-2 text-white focus:outline-none"
                style={{ padding: "8px 12px" }}
              >
                <option value="Year">Year</option>
                <option value="Month">Month</option>
                <option value="Week">Week</option>
                <option value="Day">Day</option>
              </select>
            </div>
            <div className="space-y-2">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-[#232323] p-3 rounded-2xl"
                >
                  <div className="flex items-center space-x-2">
                    <img src="" alt="" srcset="" />
                    <div>
                      <div className="font-medium text-lg md:text-[15px] md:leading-[19px]">
                        Chaos Battletom
                      </div>
                      <div className="text-[#A8AEBF] leading-5">100 Items</div>
                    </div>
                  </div>
                  <div className="font-medium text-lg">$500</div>
                </div>
              ))}
            </div>
          </div>

          {/* Orders */}
          <div className="bg-[#1B1B1B] p-4 rounded-lg lg:flex-1  ">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Orders</h3>

              <select
                className="bg-[#262626] rounded-full px-4 py-2 text-white focus:outline-none"
                style={{ padding: "8px 12px" }}
              >
                <option value="Year">Year</option>
                <option value="Month">Month</option>
                <option value="Week">Week</option>
                <option value="Week">Week</option>
                <option value="Day">Day</option>
              </select>
            </div>
            <div className="xsm:overflow-x-auto">
              <table className="w-full xsm:w-[150%]">
                <thead>
                  <tr className="leading-5 text-[#A8AEBF] text-left">
                    <td>Product</td>
                    <td>Price</td>
                    <td>Delivery Date</td>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(5)].map((_, index) => (
                    <>
                      <tr key={index} className="border-b-2  border-[#232323]">
                        <td className="py-2">
                          <div className="flex items-center space-x-2">
                            <img src="" alt="" srcset="" />
                            <span>Chaos Battletom</span>
                          </div>
                        </td>
                        <td>$299</td>
                        <td>20 Nov 2024</td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Products Overview */}
        <div className="flex flex-col gap-6 bg-[#1B1B1B] p-4 rounded-lg ">
          <div className="flex justify-between items-center md:flex-col md:gap-[16px]">
            <h3 className="text-lg font-semibold">Products Overview</h3>
            <div className="relative">
              <img
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                src={SearchIcon}
                alt=""
                srcset=""
              />
              <input
                type="text"
                placeholder="Search product"
                className="w-full p-[10px] pl-12 rounded-full border-1 border-[#474C59] bg-transparent  placeholder:text-base placeholder:font-medium placeholder:text-[#474C59] "
              />
            </div>
          </div>
          <div className="lg:relative lg:h-[511px]  overflow-y-auto   ">
            <table className="w-full lg:absolute lg:top-0 lg:left-0 lg:h-[100%] lg:w-[150%] sm:!w-[399%]">
              <thead>
                <tr className="text-[#A8AEBF] text-left">
                  <td>Name</td>
                  <td>ID #</td>
                  <td>Price</td>
                  <td>Quantity</td>
                  <td>Revenue</td>
                  <td>Status</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        <img src="" alt="" srcset="" />
                        <span>Chaos Battletom</span>
                      </div>
                    </td>
                    <td>234454545</td>
                    <td>$10.25</td>
                    <td>28</td>
                    <td>$328.25</td>
                    <td>
                      <span
                        className={`px-3 py-2 rounded-full ${
                          index % 2 === 0
                            ? "bg-[#20C37529] text-[#20C375] "
                            : "bg-[#FA8C1629] text-[#FA8C16]"
                        }`}
                      >
                        {index % 2 === 0 ? "Available" : "Not Available"}
                      </span>
                    </td>
                    <td>
                      <img src={ActionIcon} alt="" srcset="" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4  md:flex-col md:gap-[16px]">
            <div className="text-[#BBBBBB]">Showing 5 entries</div>
            <div className="flex space-x-2">
              <button className="paginationIcons bg-[#262626]">
                <img src={LeftIcon} alt="" srcset="" />
              </button>
              <button className="paginationItem bg-[#FD4960]">1</button>
              <button className="paginationItem">2</button>
              <button className="paginationItem">3</button>
              <button className="paginationIcons bg-[#262626]">
                <img src={RightIcon} alt="" srcset="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
