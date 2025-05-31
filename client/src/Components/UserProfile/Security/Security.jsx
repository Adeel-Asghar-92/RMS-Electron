import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toastError, toastSuccess } from "../../../utils/toasts";
import { axiosInstance } from "../../../utils/axios";
import Input from "../../UI/input";

const securitySchema = z.object({
  oldPassword:z.string().min(8, { message: "Password must be at least 8 characters" }).nonempty({ message: "Password is required" }),
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must include uppercase, lowercase, number, and special character",
      }
    ),
  confirmPassword: z
    .string()
    .min(8, { message: "Confirm Password must be at least 8 characters" }),
})
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const UserSecurity = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(securitySchema),
  });

  const updatePassword = async (data) => {
    try {
      const response = await axiosInstance.post(
        "/auth/update-password",
        { oldPassword: data.oldPassword, newPassword: data.newPassword },
        {
          headers: {
            Authorization: `${localStorage.getItem("auth_token")}`,
          },
        }
      );
      if (response.status === 200) {
        toastSuccess("Password updated successfully");
      }
    } catch (error) {
      toastError(error.response.data.message);
    }
  };
  const onSubmit = (data) => {
    updatePassword(data);
  };

  return (
    <div className="bg-[#1B1B1B] rounded-2xl p-6 mb-6">
      <h5 className=" font-medium leading-7 mb-8">Security</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 md:flex flex-col">
          <Input
            label="Old Password"
            type="password"
            name={"oldPassword"}
            register={register}
            placeholder="Enter old password"
            error={errors}
          />
          <Input
            label="New Password"
            type="password"
            name={"newPassword"}
            register={register}
            placeholder="Enter new password"
            error={errors}
          />
          <Input
            label="Confirm Password"
            type="password"
            name={"confirmPassword"}
            register={register}
            placeholder="Confirm your password"
            error={errors}
          />
          <div className="flex items-end">
            <button
              className="mt-4 bg-[#FD4960] rounded-full px-6 py-3 hover:bg-[#FF6A83] w-64"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <div className="loader"/> : "Update"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserSecurity;
