// ExpenseForm.jsx
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "react-bootstrap";
import Input from "../../../Components/UI/input";
import xIcon from "../../../images/x.svg";
import { axiosInstance } from "../../../utils/axios";
import { toastError, toastSuccess } from "../../../utils/toasts";

// Schema
export const expenseFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  amount: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val > 0, "Amount must be greater than or equal to 0"),
  date: z.string().min(1, "Date is required"),
});

const ExpenseForm = ({ 
  show = false,
  expenseToEdit = null,
  onClose,
  onSuccess,
  isModal = true 
}) => {
  const formMethods = useForm({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      name: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      _id: ""
    },
  });

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = formMethods;

  // Set form values when editing an expense
  useEffect(() => {
    if (expenseToEdit) {
      setValue("name", expenseToEdit.name || "");
      setValue("amount", expenseToEdit.amount || "");
      setValue("date", expenseToEdit.date ? expenseToEdit.date.split("T")[0] : new Date().toISOString().split("T")[0]);
      setValue("_id", expenseToEdit._id || "");
    } else {
      reset({
        name: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        _id: ""
      });
    }
  }, [expenseToEdit, setValue, reset]);

  const isEdit = !!watch("_id");
  
  const handleFormCancel = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = async (data) => {
    const endpoint = isEdit ? `/expenses/${watch("_id")}` : "/expenses";
    const method = isEdit ? "put" : "post";

    try {
      await axiosInstance[method](endpoint, data, {
        headers: { Authorization: localStorage.getItem("admin_auth_token") },
      });
      toastSuccess(`Expense ${isEdit ? "edited" : "added"} successfully`);
      reset();
      onSuccess();
      onClose();
    } catch (err) {
      toastError(
        err.response?.data?.message ||
          `Failed to ${isEdit ? "edit" : "add"} expense`
      );
    }
  };

  const FormContent = () => (
    <>
      <div className="flex flex-col gap-[27px] mt-[40px] lg:flex-col">
        <Input
          label="Name"
          name="name"
          control={control}
          placeholder="Enter Name"
          register={register}
          error={errors}
        />
        <Input
          label="Amount"
          name="amount"
          control={control}
          placeholder="Enter Amount"
          type="number"
          register={register}
          error={errors}
        />
        <Input
          label="Date"
          name="date"
          control={control}
          placeholder="Enter Date"
          type="date"
          register={register}
          error={errors}
        />
      </div>
      
      <div className="flex gap-[16px] mt-6 xsm:flex-col xsm:w-[100%]">
        <button
          className="border-pink cursor-pointer w-[150px] xsm:w-[100%] h-[40px] flex justify-center items-center gap-[8px] rounded-lg text-rose font-[500] font-[Poppins] text-[16px] leading-[12px]"
          onClick={handleFormCancel}
          type="button"
        >
          Cancel
        </button>
        <button
          className="red-border cursor-pointer w-[150px] xsm:w-[100%] h-[40px] flex justify-center items-center gap-[8px] rounded-lg bg-rose text-white font-[500] font-[Poppins] text-[16px] leading-[12px]"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? <div className="loader" /> : isEdit ? "Update" : "Save"}
        </button>
      </div>
    </>
  );

  if (!isModal) {
    return (
      <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-[600] font-[Poppins] text-secondary text-[22px] leading-[32px] mb-[0px]">
          {isEdit ? "Update" : "Add"} <span className="text-rose">Expense</span>
        </h3>
        <FormContent />
      </form>
    );
  }

  return (
    <Modal show={show} onHide={handleFormCancel} centered className="profile-modal">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Modal.Body>
          <div className="flex justify-between">
            <p className="font-[600] font-[Poppins] text-secondary text-[22px] leading-[32px] mb-[0px]">
              {isEdit ? "Update" : "Add"} <span className="text-rose">Expense</span>
            </p>
            <img
              className="w-[24px] h-[24px] cursor-pointer"
              src={xIcon}
              alt=""
              onClick={handleFormCancel}
            />
          </div>
          <FormContent />
        </Modal.Body>
      </form>
    </Modal>
  );
};

export default ExpenseForm;