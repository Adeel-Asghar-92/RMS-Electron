import React, { useState, useEffect } from "react";
import { toastError, toastSuccess } from "../../../utils/toasts";
import { axiosInstance } from "../../../utils/axios";
import Loader from "../../../Components/UI/Loaders/loader";
import DeleteIcon from "../../../images/delete.svg";
import EditIcon from "../../../images/edit-3.svg";
import { getFormattedDateWithTime } from "../../../utils/date";
import LeftIcon from "../../../images/chevron-right.svg";
import RightIcon from "../../../images/chevron-right (1).svg";
import ExpenseForm from "./addExpense"; // Import the reusable component

// Constants
const INITIAL_PAGE = 1;
const TABLE_HEADERS = ["Name", "Amount", "Date", "Actions"];

// Expense Table Component
const ExpenseTable = ({ expenses, onEdit, onDelete }) => (
  <div className="bg-white shadow rounded py-1 px-3 m-3">
    <table className="w-full">
      <thead>
        <tr className="text-left text-[#A8AEBF]">
          {TABLE_HEADERS.map((header) => (
            <th key={header} className="p-2">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense._id} className="border-t border-gray-700">
            <td className="p-2">{expense.name}</td>
            <td className="p-2">{expense.amount}</td>
            <td className="p-2">{getFormattedDateWithTime(expense.createdAt)}</td>
            <td className="p-2">
              <button
                className="p-1 text-sm hover:bg-slate-50 rounded-full"
                onClick={() => onEdit(expense)}
              >
                <img src={EditIcon} width={27} alt="Edit" />
              </button>
              <button onClick={() => onDelete(expense._id)}>
                <img src={DeleteIcon} alt="Delete" className="w-6 h-6" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Main Component
const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  // API calls
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("admin_auth_token");
      setLoading(true);
      const response = await axiosInstance.get("/expenses", {
        headers: {
          Authorization: `${token}`,
        },
        params: {
          limit: 50,
          page: currentPage,
        },
      });
      setExpenses(response.data.results);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      toastError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  // Handlers
  const handleDelete = async (expenseId) => {
    if (!window.confirm("Are you sure you want to delete this Expense?"))
      return;

    try {
      setLoading(true);
      await axiosInstance.delete(`/expenses/${expenseId}`, {
        headers: { Authorization: localStorage.getItem("admin_auth_token") },
      });
      toastSuccess("Deleted successfully");
      fetchData();
    } catch (err) {
      toastError(err.response?.data?.message || "Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setSelectedExpense(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedExpense(null);
  };

  return (
    <>
      {loading && <Loader />}

      <header className="flex justify-between items-center mb-6 xsm:flex-col xsm:gap-[16px]">
        <h1 className="text-2xl font-semibold text-secondary"></h1>
        <button
          className="bg-rose p-3 py-2 rounded-lg text-white"
          onClick={handleAddNew}
        >
          Add Expense
        </button>
      </header>

      <div className="rounded-2xl p-6 text-black">
        <div className="lg:relative lg:h-[267px] overflow-y-auto">
          {!loading && expenses.length > 0 ? (
            <ExpenseTable
              expenses={expenses}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
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

      <ExpenseForm
        show={showModal}
        expenseToEdit={selectedExpense}
        onClose={handleCloseModal}
        onSuccess={fetchData}
      />
    </>
  );
};

export default Expenses;