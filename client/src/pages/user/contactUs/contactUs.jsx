import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { axiosInstance } from "../../../utils/axios";
import Loader from "../../../Components/UI/Loaders/loader";
import { toastError, toastSuccess } from "../../../utils/toasts";
import Navbar from "../../../Components/Navbar/Navbar";
import EmailIcon from "../../../images/email_Icon.png";
import PhoneIcon from "../../../images/phoneIcon.png";
import MapPinIcon from "../../../images/locationIcon.png";
import AttachmentIcon from "../../../images/attachmentIcon.png";

const contactSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .email({ message: "Must be a valid email address" })
    .min(1, { message: "Email is required" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  message: z.string().min(1, { message: "Message is required" }),
  file: z.any().optional(),
});

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const [loading, setLoading] = useState(false);
  const [fileAttachment, setFileAttachment] = useState(null);
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/contactUs", data);
      if (response.status === 200) {
        toastSuccess("Message sent successfully!");
      }
    } catch (error) {
      toastError("Error occurred while sending message.");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileAttachment(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setValue("file", reader.result, { shouldValidate: true });
    };
  };

  return (
    <>
      <Navbar />
      <div className=" text-white font-[poppins] mt-[110px] ">
        {/* Contact Us Content */}
        <div className="custom-container px-[100px] md:px-[16px]">
          <h1
            className="font-[600] text-[32px] leading-[24px] mb-[0px]"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="50"
          >
            Contact Us
          </h1>
          <p
            className="text-gray-400 font-[400] text-[18px] leading-[28px] mt-[16px] mb-[0px]"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="100"
          >
            Just leave us a note, we are always ready to help
          </p>

          <div className="flex flex-wrap justify-between  mt-[40px] gap-[40px] xl:flex-col">
            {/* Contact Information */}
            <div className="w-1/3 space-y-6 xl:w-[100%] xl:flex xl:justify-between xl:flex-wrap">
              <div
                className="flex items-center space-x-4"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="50"
              >
                <img src={EmailIcon} alt="" width={40} height={40} />
                <div className="flex flex-col align-middle">
                  <p className="font-normal mb-0 text-base text-[#C8CCD9] leading-5">
                    Email
                  </p>
                  <p className="font-normal text-lg mb-0">
                    contact@xyzgmail.com
                  </p>
                </div>
              </div>
              <div
                className="flex items-center space-x-4"
                data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-delay="100"
              >
                <img src={PhoneIcon} alt="" width={40} height={40} />
                <div>
                  <p className="font-normal mb-0 text-base leading-5 text-[#C8CCD9]">
                    Phone
                  </p>
                  <p className="font-normal text-lg mb-0">+923027689870</p>
                </div>
              </div>
              <div
                className="flex items-center space-x-4"
                data-aos="fade-up"
                data-aos-duration="1500"
                data-aos-delay="150"
              >
                <img src={MapPinIcon} alt="" width={40} height={40} />
                <div>
                  <p className="font-normal mb-0 text-base leading-5 text-[#C8CCD9]">
                    Address
                  </p>
                  <p className="font-normal text-lg mb-0  max-w-[506px]">
                    Building 4, 4th Floor, Plot No. 31, Arkan Plaza Business
                    Complex, Sheikh.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className="max-w-[646px] xl:max-w-[100%] w-full xl:w-full lg:w-full md:w-full sm:w-full p-8 rounded-2xl bg-[#1B1B1B]"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="50"
            >
              <form onSubmit={handleSubmit(onSubmit)} className=" space-y-6">
                <div>
                  <input
                    {...register("name")}
                    type="text"
                    id="name"
                    className="w-full p-[15px] rounded-2xl border-1 border-[#474C59] bg-transparent  placeholder:text-base placeholder:font-medium placeholder:text-[#ffffff]"
                    placeholder="Enter Your Name"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    {...register("email")}
                    type="email"
                    name="email"
                    placeholder="Enter Email Address"
                    className="w-full p-[15px] rounded-2xl border-1 border-[#474C59] bg-transparent  placeholder:text-base placeholder:font-medium placeholder:text-[#ffffff] "
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    {...register("phone")}
                    type="tel"
                    name="phone"
                    placeholder="Enter Phone Number"
                    className="w-full p-[15px] rounded-2xl border-1 border-[#474C59] bg-transparent  placeholder:text-base placeholder:font-medium placeholder:text-[#ffffff] "
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-sm">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
                <div>
                  <textarea
                    {...register("message")}
                    name="message"
                    placeholder="Your Message"
                    rows="4"
                    className="resize-none w-full p-[15px] rounded-2xl border-1 border-[#474C59] bg-transparent  placeholder:text-base placeholder:font-medium placeholder:text-[#ffffff] "
                  ></textarea>
                  {errors.message && (
                    <span className="text-red-500 text-sm">
                      {errors.message.message}
                    </span>
                  )}
                </div>
                <div
                  className="flex justify-center items-center text-center w-full p-[15px] rounded-2xl border-1 border-dashed border-[#474C59] border-spacing-8 bg-transparent cursor-pointer"
                  onClick={() => document.getElementById("fileInput").click()} // Trigger the file input on click
                >
                  <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <img
                    src={AttachmentIcon}
                    alt="attachment icon"
                    className="mt-1 mx-1 w-4 h-4"
                  />
                  <span className="placeholder:text-base placeholder:font-medium placeholder:text-[#ffffff]">
                    {fileAttachment?.file ? fileAttachment?.file?.name : "Add Attachment"}
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#FD4960] text-white py-3 hover:bg-[#FF6A83] transition duration-300 mt-[47px]!"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

