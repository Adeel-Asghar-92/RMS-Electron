import React, { useState } from "react";
import Navbar from "../../../../Components/Navbar/Navbar";
import Title from "../title";
import { useNavigate } from "react-router-dom";
import "./forgetPassword.css";
import { toastError, toastSuccess } from "../../../../utils/toasts";
import { axiosInstance } from "../../../../utils/axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" })
    .nonempty({ message: "Email is required" }),
});

export default function ForgetPassword() {
  const navigate = useNavigate();
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
      const response = await axiosInstance.post("/auth/forgot-password", {
        email: data.email,
      });

      toastSuccess(
        "Email sent successfully. Check your inbox for the next steps."
      );
      // navigate("/login");
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
            title={"Forget"}
            title2={"Password"}
            subTitle={"We'll send you an email so you can reset your password."}
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
                  htmlFor="email"
                  className="text-[16px] font-[400] leading-[21px] mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="w-full p-[15px] rounded-2xl border-1 border-[#474C59] bg-transparent  placeholder:text-base placeholder:font-medium placeholder:text-[#474C59] focus:outline-none text-[16px] font-[500] leading-[24px] text-[#fff]"
                  placeholder="Enter email address"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-[#FF1B6B] text-[16px] font-[400] leading-[21px] my-2">
                    {errors.email.message}
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
