import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Eye from "../../../../images/eye.png";
import { toastError, toastSuccess } from "../../../../utils/toasts";
import { axiosInstance } from "../../../../utils/axios";
import Title from "../title";
import "./login.css";

const schema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" })
    .nonempty({ message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .nonempty({ message: "Password is required" }),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("admin_auth_token");
    // const userToken = localStorage.getItem("auth_token");
    if (adminToken && window.location.pathname !== "/admin/ShowCase")
      navigate("/admin/ShowCase");
    // else if (userToken) navigate("/");
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        "/auth/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );
      localStorage.setItem("admin_auth_token", response.data.tokens.refresh.token);
      localStorage.setItem("role", response.data.user.role);
      toastSuccess("Logged in Successfully");
      navigate("/admin/ShowCase");
    } catch (error) {
      toastError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className=" font-[poppins] pt-20 ">
        <div className="custom-container px-[100px] md:px-[16px]">
          <Title
            title={"Welcome Back to"}
            title2={"Chaman Murgh Pulao"}
            subTitle={"Sign in to continue to your account."}
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
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">
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
                    type={showPassword ? "text" : "password"}
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                    className="w-full h-[56px] pl-[16px] pr-[40px] rounded-2xl border-1 border-[#474C59] bg-transparent  placeholder:text-base placeholder:font-medium placeholder:text-[#474C59] focus:outline-none text-[16px] font-[500] leading-[24px]"
                    placeholder="Enter password"
                  />
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <img src={Eye} />
                    {showPassword ? "" : ""}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2">
                {/* <div class="checkbox-container flex items-center gap-[8px]">
                  <input
                    type="checkbox"
                    {...register("rememberMe")}
                    className={`login-checkbox ${checked ? "checked" : ""}`}
                    onClick={toggleCheckbox}
                  />
                  <label for="rememberMe">Remember me</label>
                </div> */}

                <a
                  onClick={() => navigate("/forget-password")}
                  className="forget-password cursor-pointer text-sm hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#FD4960] text-white py-3 !my-[40px] disabled:bg-[#e76369]"
                disabled={isLoading}
              >
                {isLoading ? <div className="loader"></div> : "Sign in"}
              </button>
            </form>
            
          </div>
        </div>
      </div>
    </>
  );
}
