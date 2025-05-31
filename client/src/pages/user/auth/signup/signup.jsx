import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "../../../../Components/Navbar/Navbar";
import FacebookIcon from "../../../../images/facebook.png";
import GoogleIcon from "../../../../images/googleicon.png";
import Title from "../title";
import "./signup.css";
import { toastError, toastSuccess } from "../../../../utils/toasts";
import { axiosInstance } from "../../../../utils/axios";
// import Eye from "../../../../images/eye.png";
// import { GoogleLogin } from "@react-oauth/google";
// import FacebookLogin from "../../../../Components/FacebookButton";

const schema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }).nonempty({ message: "Email is required" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).nonempty({ message: "Password is required" }),
});

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/register", {
        email: data.email,
        password: data.password,
      });
      localStorage.setItem(
        "auth_token",
        response.data.tokens.refresh.token
      );
      toastSuccess("Registrated Successfully, Please verify your email");
      navigate("/login");
    } catch (error) {
      toastError(error.response.data.message);
    }
  };

  return (
    <>
      <div className="font-[poppins] py-12">
        <div className="custom-container px-[100px] md:px-[16px]">
          <Title
            title={"Welcome Back to"}
            title2={"Chaman Murgh Pulao"}
            subTitle={"Join us and unlock a world of possibilities."}
          />
          <div
            className="mx-auto max-w-[646px] lg:w-full p-8 rounded-2xl shadow"
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="150"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="text-[16px] font-[400] leading-[21px] mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className="w-full p-[15px] rounded-2xl border-1 border-[#474C59] bg-transparent  placeholder:text-base placeholder:font-medium placeholder:text-[#474C59] focus:outline-none text-[16px] font-[500] leading-[24px]"
                  placeholder="Enter Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
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
                  className="w-full p-[15px] rounded-2xl border-1 border-[#474C59] bg-transparent  placeholder:text-base placeholder:font-medium placeholder:text-[#474C59] focus:outline-none text-[16px] font-[500] leading-[24px]"
                  placeholder="Enter Email Address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    {...register("password")}
                    className="w-full h-[56px] pl-[16px] pr-[40px] rounded-2xl border-1 border-[#474C59] bg-transparent  placeholder:text-base placeholder:font-medium placeholder:text-[#474C59] focus:outline-none text-[16px] font-[500] leading-[24px]"
                    placeholder="Enter password"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#FD4960] text-white py-3 !my-[40px] "
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

