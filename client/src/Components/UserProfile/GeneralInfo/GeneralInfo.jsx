import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toastError, toastSuccess } from "../../../utils/toasts";
import { axiosInstance } from "../../../utils/axios";
import Input from "../../UI/input";

const UserGeneralInfo = () => {
  const schema = z.object({
    name: z
      .string()
      .min(3, { message: "Name should be at least 3 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    contactNo: z
      .string()
      .min(11, { message: "Contact number should be at least 11 characters." }),
    address: z
      .string()
      .min(10, { message: "Address should be at least 10 characters." }),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      axiosInstance
        .get(`/users/me`, {
          headers: {
            Authorization: `${localStorage.getItem("auth_token")}`,
          },
        })
        .then(({ data }) => {
          setValue("name", data.name || "");
          setValue("email", data.email || "");
          setValue("contactNo", data.contactNo || "");
          setValue("address", data.address || "");
        })
        .catch((error) => {
          toastError(error.message);
        });
    };

    fetchUserDetails();
  }, [setValue]);
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.put(`/users/me`, data, {
        headers: {
          Authorization: `${localStorage.getItem("auth_token")}`,
        },
      });
      toastSuccess("Profile updated successfully");
    } catch (error) {
      toastError(error.message);
    }
  };

  return (
    <>
      <div className="bg-[#1B1B1B] rounded-2xl p-6 mb-6">
        <h5 className=" font-medium leading-7 mb-8">General Information</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 md:flex flex-col ">
            <Input
              label="Name"
              type="text"
              name={"name"}
              register={register}
              placeholder="Enter Your Name"
              error={errors.name?.message}
            />
            <Input
              label="Email"
              type="email"
              disabled
              name={"email"}
              register={register}
              placeholder="Enter Your Email"
              error={errors.email?.message}
            />
            <Input
              label="Contact"
              type="tel"
              name={"contactNo"}
              register={register}
              placeholder="Enter Your Contact Number"
              error={errors.contactNo?.message}
            />
            <div className="col-span-2">
              <label className="block text-sm mb-1">Address</label>
              <textarea
                className="w-full p-[15px] rounded-2xl border-1 border-[#474C59] bg-transparent  placeholder:text-base placeholder:font-medium placeholder:text-[#ffffff]"
                rows="3"
                {...register("address")}
              ></textarea>
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="mt-4 bg-[#FD4960] rounded-full px-6 py-3 hover:bg-[#FF6A83] w-64"
              type="submit"
              disabled={isSubmitting}
            >
              
              {isSubmitting ? <span className="loader" />: "Update"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserGeneralInfo;
