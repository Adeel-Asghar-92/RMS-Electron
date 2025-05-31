import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../../utils/toasts";
import Heading from "../../../Components/Heading/pageHeading";
import Input from "../../../Components/UI/input";
import Select from "../../../Components/UI/Select/Select";
import CloseIcon from "../../../images/AddToCartClose.svg";
import UploadIcon from "../../../images/uploadIcon.svg";
import { axiosInstance } from "../../../utils/axios";
import Loader from "../../../Components/UI/Loaders/loader";
import DeleteIcon from "../../../images/delete.svg";

// Zod Schema for validation
const productSchema = z
  .object({
    name: z.string().min(1, "Product name is required"),
    categoryId: z.string().min(1, "Category is required"),
    shopId: z.string().min(1, "Shop ID is required"),
    isDeal: z.boolean().default(false),
    isStockAble: z.boolean().default(false),
    isShowcase: z.boolean().default(true),
    price: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => val > 1, "Price must be greater than 1"),
    description: z.string().optional(),
    unit: z.enum(["pc", "plt", "mL", "l", "g", "kg"]),
    plateType: z.enum(["full", "half"]).nullable().optional(),
    parentProduct: z.string().optional(),
    tax: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => val >= 0 && val <= 100, "Tax must be between 0 and 100"),
    stock: z
      .string()
      .transform((val) => Number(val))
      .optional(),
    images: z.array(z.string()).nonempty("At least one image is required"),
    dealProducts: z
      .array(
        z.object({
          productId: z.string().min(1, "Product ID is required"),
          quantity: z
            .string()
            .transform((val) => Number(val))
            .refine((val) => val > 0, "Quantity must be greater than 0"),
        })
      )
      .optional(),
  })
  .superRefine((data, ctx) => {
    
    if (data.isStockAble && !data.stock) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Stock is required",
        path: ["stock"],
      });
    }
  });

const AddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [shops, setShops] = useState([]);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      isDeal: false,
      unit: "",
      tax: "0",
      price: 1,
      isStockAble: false,
      isShowcase: true,
    },
  });

  const isDeal = watch("isDeal");
  const isStockAble = watch("isStockAble");
  const isShowcase = watch("isShowcase");
  const plateType = watch("plateType");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("admin_auth_token");
        const response = await axiosInstance.get("/products/allProducts", {
          headers: { Authorization: token },
        });
        setProducts(response.data);
      } catch (error) {
        toastError("Failed to fetch products");
      }
    };

    // if (isDeal) {
    fetchProducts();
    // }
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const token = localStorage.getItem("admin_auth_token");
        const [categoriesResponse, shopsResponse] = await Promise.all([
          axiosInstance.get("/category/allCategories", {
            headers: { Authorization: token },
          }),
          axiosInstance.get("/shop/allShops", {
            headers: { Authorization: token },
          }),
        ]);

        setCategories(categoriesResponse.data);
        setShops(shopsResponse.data);
      } catch (error) {
        toastError("Failed to fetch initial data");
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchProductDetails = async () => {
        try {
          const response = await axiosInstance.get(`/products/${id}`, {
            headers: {
              Authorization: localStorage.getItem("auth_token"),
            },
          });
          const product = response.data;

          Object.keys(product).forEach((key) => {
            setValue(
              key,
              typeof product[key] === "number"
                ? product[key].toString()
                : product[key]
            );
          });

          if (product.images) {
            setUploadedImages(product.images.map((img) => img.url));
            setValue(
              "images",
              product.images.map((img) => img.url)
            );
          }
          setValue("isShowcase", product.isShowcase);
          setValue("isStockAble", product.isStockAble);
          if (product.dealProducts.length > 0) {
            setValue("dealProducts", product.dealProducts);
            setValue("isDeal", true);
          }
        } catch (error) {
          toastError("Failed to fetch product details");
        }
      };

      fetchProductDetails();
    }
  }, [id, setValue]);

  const addDealProductField = () => {
    const currentFields = watch("dealProducts") || [];
    setValue("dealProducts", [
      ...currentFields,
      { productId: "", quantity: "" },
    ]);
  };

  const removeDealProductField = (index) => {
    const currentFields = watch("dealProducts") || [];
    setValue(
      "dealProducts",
      currentFields.filter((_, i) => i !== index)
    );
  };

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    setImageUploadLoading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        const base64Image = await new Promise((resolve) => {
          reader.onloadend = () => {
            resolve(reader.result);
          };
        });
        const response = await axiosInstance.post("/upload", {
          image: base64Image,
        });
        return response.data.url;
      });

      const imageUrls = await Promise.all(uploadPromises);
      setUploadedImages((prev) => [...prev, ...imageUrls]);
      setValue("images", [...uploadedImages, ...imageUrls]);
      toastSuccess("Images uploaded successfully");
    } catch (error) {
      toastError("Failed to upload images");
    } finally {
      setImageUploadLoading(false);
    }
  };

  const removeImage = async (imageToRemove) => {
    setImageUploadLoading(true);
    try {
      const imageId = imageToRemove.split("/").pop().split(".")[0];
      
      await axiosInstance.delete(`/upload/${imageId}`, {
        data: {
          folder: "product",
        },
      });
      setUploadedImages((prev) => prev.filter((img) => img !== imageToRemove));
      setValue(
        "images",
        uploadedImages.filter((img) => img !== imageToRemove)
      );
      toastSuccess("Image removed successfully");
    } catch (error) {
      toastError("Failed to remove image");
    }
    setImageUploadLoading(false);
  };

  const onSubmit = async (data) => {
    try {
      delete data.isDeal;
      if (data.unit !== "plt") delete data.plateType;
      const payload = {
        ...data,
        images: uploadedImages.map((image) => ({ image })),
        stock: data?.stock ? data.stock : 0,
      };
      const endpoint = id ? `/products/${id}` : "/products";
      const method = id ? "put" : "post";

      await axiosInstance[method](endpoint, payload, {
        headers: {
          Authorization: localStorage.getItem("admin_auth_token"),
        },
      });

      toastSuccess(`Product ${id ? "updated" : "added"} successfully`);
      navigate("/admin/products");
    } catch (error) {
      toastError(`Failed to ${id ? "update" : "add"} product`);
    }
  };
console.log("errors", errors);

  return (
    <>
      <Heading
        // heading={id ? "Edit" : "Add"}
        // subHeading="Product"
        buttonName="Product List"
        link="/admin/products"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 lg:grid-cols-1 gap-6">
          <div className="col-span-3 lg:col-span-1 bg-white text-black shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Product Information</h2>
            <div className="space-y-4">
              <Input
                label="Product Name"
                name="name"
                register={register}
                type="text"
                placeholder="Enter Product Name"
                error={errors}
              />
              <div className="grid grid-cols-3 md:grid-cols-1 gap-4">
                <Select
                  label="Shop"
                  name="shopId"
                  control={control}
                  placeholder="Select Shop"
                  options={shops.map((shop) => ({
                    value: shop._id,
                    label: shop.name,
                  }))}
                />
                <Select
                  label="Category"
                  name="categoryId"
                  control={control}
                  placeholder="Select Category"
                  options={categories.map((cat) => ({
                    value: cat._id,
                    label: cat.name,
                  }))}
                />
                {/* <Select
                  label="Unit"
                  name="unit"
                  control={control}
                  placeholder="Select Unit"
                  options={[
                    { value: "pc", label: "Piece" },
                    { value: "plt", label: "Plate" },
                    { value: "mL", label: "Milliliter" },
                    { value: "l", label: "Liter" },
                    { value: "g", label: "Gram" },
                    { value: "kg", label: "Kilogram" },
                  ]}
                /> */}
                <Select
                  label="Parent Product (Optional)"
                  name="parentProduct"
                  control={control}
                  placeholder="Select"
                  options={products.map((product) => ({
                    value: product._id,
                    label: product.name,
                  }))}
                />
              </div>

              <div className="grid grid-cols-3 md:grid-cols-1 gap-4">
                <Input
                  label="Stock"
                  name="stock"
                  register={register}
                  type="number"
                  placeholder="Enter Stock"
                  error={errors}
                />
                <Input
                  label="Price"
                  name="price"
                  register={register}
                  type="number"
                  placeholder="Enter Price"
                  error={errors}
                />
                <Input
                  label="Tax (%)"
                  name="tax"
                  register={register}
                  type="number"
                  placeholder="Enter Tax Percentage"
                  error={errors}
                />
              </div>

              <div className="grid grid-cols-3 md:grid-cols-1 gap-4">
                <Select
                  label="Unit"
                  name="unit"
                  control={control}
                  placeholder="Select Unit"
                  options={[
                    { value: "pc", label: "Piece" },
                    { value: "plt", label: "Plate" },
                    { value: "mL", label: "Milliliter" },
                    { value: "l", label: "Liter" },
                    { value: "g", label: "Gram" },
                    { value: "kg", label: "Kilogram" },
                  ]}
                />
                {watch("unit") === "plt" && (
                  <div className="flex items-end gap-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        {...register("plateType")}
                        value="full"
                        className="radio-button"
                        checked={plateType === "full"}
                      />
                      <label>Full Plate</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        {...register("plateType")}
                        value="half"
                        className="radio-button"
                        checked={plateType === "half"}
                      />
                      <label>Half Plate</label>
                    </div>
                  </div>
                )}
                <div className="flex items-end gap-2">
                  <input
                    type="checkbox"
                    {...register("isShowcase")}
                    className={`login-checkbox ${isShowcase ? "checked" : ""}`}

                    // className="login-checkbox"
                  />
                  <label>Display in Show Case</label>
                </div>
                <div className="flex items-end gap-2">
                  <input
                    type="checkbox"
                    {...register("isStockAble")}
                    className={`login-checkbox ${isStockAble ? "checked" : ""}`}

                    // className="login-checkbox"
                  />
                  <label>Is Stock Able</label>
                </div>
                <div className="flex items-end gap-2">
                  <input
                    type="checkbox"
                    {...register("isDeal")}
                    className={`login-checkbox ${isDeal ? "checked" : ""}`}

                    // className="login-checkbox"
                  />
                  <label>Make Deal</label>
                </div>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-1 gap-4"></div>
              {isDeal && (
                <div className="mt-4 space-y-4">
                  <h3 className="text-lg font-semibold">Deal Products</h3>
                  {(watch("dealProducts") || []).map((_, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 gap-4 items-end"
                    >
                      <Select
                        label="Product"
                        name={`dealProducts.${index}.productId`}
                        control={control}
                        placeholder="Select Product"
                        options={products.map((product) => ({
                          value: product._id,
                          label: product.name,
                        }))}
                      />
                      <Input
                        label="Quantity"
                        name={`dealProducts.${index}.quantity`}
                        register={register}
                        type="number"
                        placeholder="Enter Quantity"
                        error={errors?.dealProducts?.[index]}
                      />
                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={() => removeDealProductField(index)}
                          className="p-1 text-sm hover:bg-slate-100 rounded-full"
                        >
                          <img src={DeleteIcon} width={30} />
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addDealProductField}
                    className="bg-[#FD4960] text-white px-4 py-2 rounded-lg"
                  >
                    Add Product
                  </button>
                </div>
              )}

              <div>
                <label className="block text-sm mb-1">Description</label>
                <textarea
                  {...register("description")}
                  className="w-full p-[5px] rounded border-1 border-[#474C59] bg-transparent"
                  rows="3"
                  placeholder="Enter product description"
                />
                {errors.description && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-1 bg-white text-black shadow rounded-lg p-6 h-max">
            <h2 className="text-xl font-semibold mb-4">Product Images</h2>
            {imageUploadLoading && <Loader />}
            <div className="flex flex-wrap gap-4">
              {uploadedImages.map((image, index) => (
                <div
                  key={index}
                  className="relative p-2 border-1 border-secondary rounded-2xl xsm:w-[100%]"
                >
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-[157px] h-[100%] object-cover rounded-2xl xsm:w-[100%]"
                  />
                  <img
                    src={CloseIcon}
                    alt="Remove"
                    onClick={() => removeImage(image)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full w-[24px] h-[24px] cursor-pointer"
                  />
                </div>
              ))}

              {uploadedImages.length === 0 && (
                <div className="px-3 py-8 border-1 border-dashed border-[#474C59] rounded-2xl flex flex-col items-center justify-center gap-4 xsm:w-[100%]">
                  <img src={UploadIcon} alt="Upload" />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="imageUpload"
                  />
                  <label htmlFor="imageUpload" className="cursor-pointer">
                    <p className="text-sm text-center">
                      Drop your image here
                      <br />
                      or
                      <br />
                      <span className="text-[#FD4960]">Click to Browse</span>
                    </p>
                  </label>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-between flex-wrap gap-6">
              <button
                type="submit"
                className="flex-1 bg-[#FD4960] text-white px-[31px] py-[14px] rounded-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="loader"></span>
                ) : id ? (
                  "Update"
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddProduct;
