import React from "react";
import Navbar from "../../../../Components/Navbar/Navbar";
import Title from "../title";
import { useNavigate, useLocation } from "react-router-dom";
import "./resetPassword.css";
import { toastError, toastSuccess } from "../../../../utils/toasts";
import { axiosInstance } from "../../../../utils/axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z
  .object({
    password: z
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
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(
        "/auth/reset-password",
        { password: data.password },
        { params: { token } }
      );

      toastSuccess("Password reset successfully. Login to continue.");
      navigate("/login");
      reset();
    } catch (error) {
      toastError(error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="text-white font-[poppins] my-12">
        <div className="custom-container px-[100px] md:px-[16px]">
          <Title
            title={"Reset"}
            title2={"Password"}
            subTitle={"Enter your new password."}
          />
          <div
            className="mx-auto max-w-[646px] lg:w-full p-8 rounded-2xl bg-[#1B1B1B]"
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="150"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="password"
                  className="text-[16px] font-[400] leading-[21px] mb-2"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  className="w-full p-[15px] rounded-2xl border-1 border-[#474C59] bg-transparent  placeholder:text-base placeholder:font-medium placeholder:text-[#474C59] focus:outline-none text-[16px] font-[500] leading-[24px] text-[#fff]"
                  placeholder="Enter new password"
                  disabled={isSubmitting}
                />
                {errors.password && (
                  <p className="text-[#FF1B6B] text-[16px] font-[400] leading-[21px] my-2">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-[16px] font-[400] leading-[21px] mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  className="w-full p-[15px] rounded-2xl border-1 border-[#474C59] bg-transparent  placeholder:text-base placeholder:font-medium placeholder:text-[#474C59] focus:outline-none text-[16px] font-[500] leading-[24px] text-[#fff]"
                  placeholder="Enter confirm password"
                  disabled={isSubmitting}
                />
                {errors.confirmPassword && (
                  <p className="text-[#FF1B6B] text-[16px] font-[400] leading-[21px] my-2">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#FD4960] text-white py-3 !my-[40px] "
                disabled={isSubmitting}
              >
                {isSubmitting ? <div className="loader" /> : "Reset Password"}
              </button>
            </form>

            <p className="mb-[0px] text-center  text-base">
              Already have a member?{" "}
              <span
                className="font-semibold md:text-base forget-password cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
