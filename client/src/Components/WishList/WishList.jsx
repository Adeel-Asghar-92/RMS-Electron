import React, { useState, useEffect } from "react";
import "./WishList.css";
import delIcon from "../../images/DelIcon.svg";
import wishCardImg from "../../images/WishListImg.svg";
import carticon from "../../images/shopping-cart-01.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Loader from "../UI/Loaders/loader";
import { axiosInstance } from "../../utils/axios";
import { toastError, toastSuccess } from "../../utils/toasts";

const schema = z.object({
  favouriteItem: z.array(z.object({ id: z.string().uuid() })),
});

const WishList = () => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });
  const [favouriteItems, setFavouriteItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFavouriteItems = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/favouriteItem", {
        headers: {
          Authorization: `${localStorage.getItem("auth_token")}`,
        },
      });
      setFavouriteItems(response.data.results);
    } catch (error) {
      toastError(error.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    getFavouriteItems();
  }, []);

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post(
        "/favouriteItem",
        { productId: data },
        {
          headers: { Authorization: `${localStorage.getItem("auth_token")}` },
        }
      );
      getFavouriteItems();
      toastSuccess("Favourite items updated successfully");
    } catch (error) {
      toastError(error.message);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="WishList-main ">
        <p className="WishList-heading font-[Poppins] font-[600] text-[24px] leading-[24px] text-white">
          Wish <span className="text-[#e9425f]">List</span>
        </p>
        <div className="WishList-row flex flex-col gap-[16px]">
          {favouriteItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#232323] flex items-center justify-between p-[24px] rounded-[16px] w-full  sm:flex-col sm:gap-[16px] sm:tems-baseline"
            >
              <div className="flex items-center gap-[24px]">
                <img
                  src={item?.product?.images?.[0]?.url}
                  alt="Chaos Battletom"
                  className="w-[100px] h-[100px] rounded-[16px] object-cover"
                />

                <div className="">
                  <h2 className="font-[Poppins] font-[500] text-[18px] leading-[21px] text-white mb-[0px]">
                    {item?.product?.name}
                  </h2>
                  <p className="py-[9px] font-[Poppins] font-[500] text-[18px] leading-[28px] text-white mb-[0px]">
                    ${item.product.price}
                  </p>
                  <div className=" flex">
                    <p
                      className={`font-[Poppins] font-[400] text-[16px] leading-[21px] ${
                        item.product.quantity > 0
                          ? "text-[#20C375]"
                          : "text-[#ff3737]"
                      }  mb-[0px] px-[12px] py-[8px] rounded-[100px]  bg-[#20C37529]`}
                    >
                      {item.product.quantity > 0 ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-[50px]">
                <div className="ShopCards-btn-otr w-[198px] !pt-[0px]">
                  <div className="ShopCards-btn-inr">
                    <img className="ShopCards-carticon" src={carticon} alt="" />
                    Add to Cart
                  </div>
                </div>

                <img
                  className="w-[32px] h-[32px] cursor-pointer"
                  src={delIcon}
                  alt=""
                  onClick={() => {
                    onSubmit(item.product.id);
                  }}
                />
              </div>
            </div>
          ))}
          {favouriteItems.length ===0 && 
            <div className="flex items-center justify-center w-full">
              <p className="text-center font-[Poppins] font-[400] text-[16px] leading-[21px] text-white">
                Record not found
              </p>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default WishList;
