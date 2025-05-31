import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Heading from "../../../Components/Heading/pageHeading";
import Input from "../../../Components/UI/input";
import CloseIcon from "../../../images/AddToCartClose.svg";
import UploadIcon from "../../../images/uploadIcon.svg";
import { toastError, toastSuccess } from "../../../utils/toasts";
import { axiosInstance } from "../../../utils/axios";
import { useParams, useNavigate } from "react-router-dom";

const categorySchema = z.object({
  name: z.string().nonempty({ message: "Category name is required" }),
  // subCategories: z
  //   .array(
  //     z
  //       .string()
  //       .min(2, { message: "Sub-category must be at least 2 characters" })
  //       .max(50, { message: "Sub-category must be less than 50 characters" })
  //   )
  //   .min(1, { message: "At least one sub-category is required" })
  //   .max(10, { message: "Maximum 10 sub-categories allowed" }),
  categoryImage: z
    .string()
    .url({ message: "Category image must be a valid url" })
    .or(z.instanceof(File, { message: "Category image must be a file" })),
});

const AddCategory = () => {
  const { categoryId } = useParams();
  const isEdit = !!categoryId;

  const [subCategories, setSubCategories] = useState([]);
  const [newSubCategory, setNewSubCategory] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: zodResolver(categorySchema),
    // defaultValues: {
    //   name: "",
    //   subCategories: [],
    //   categoryImage: undefined
    // }
  });

  const addSubCategory = () => {
    if (newSubCategory && !subCategories.includes(newSubCategory)) {
      const updatedSubCategories = [...subCategories, newSubCategory];
      setSubCategories(updatedSubCategories);
      setValue("subCategories", updatedSubCategories, { shouldValidate: true });
      setNewSubCategory("");
    }
  };

  const removeSubCategory = (subCategory) => {
    const updatedSubCategories = subCategories.filter(
      (sc) => sc !== subCategory
    );
    setSubCategories(updatedSubCategories);
    setValue("subCategories", updatedSubCategories, { shouldValidate: true });
  };

  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setValue("categoryImage", file, { shouldValidate: true });
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreviewImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const { register, setValue, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance[isEdit ? "put" : "post"](
        `/category${isEdit ? `/${categoryId}` : ""}`,
        {
          name: data.name,
          subCategories: data.subCategories,
          image: previewImage,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("admin_auth_token")}`,
          },
        }
      );
      toastSuccess(
        isEdit
          ? "Category updated successfully!"
          : "Category added successfully!"
      );
      console.log("Category Data:", response.data);

      // Reset Form
      reset();
      setSubCategories([]);
      setNewSubCategory("");
      setPreviewImage(null);
      if (isEdit) {
        navigate("/admin/categories");
      }
    } catch (error) {
      toastError(error.response.data.message.toUpperCase());
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (isEdit) {
      (async () => {
        try {
          const response = await axiosInstance.get(`/category/${categoryId}`, {
            headers: {
              Authorization: `${localStorage.getItem("admin_auth_token")}`,
            },
          });
          const { name, subCategories, imageUrl } = response.data;
          setSubCategories(subCategories);
          setValue("name", name, { shouldValidate: true });
          setValue("subCategories", subCategories, { shouldValidate: true });
          if (imageUrl) {
            setPreviewImage(imageUrl);
            setValue("categoryImage", imageUrl, { shouldValidate: true });
          }
        } catch (error) {
          toastError(error.response.data.message.toUpperCase());
          console.error("Error:", error);
        }
      })();
    }
  }, [isEdit, categoryId]);

  const categoryImageRef = useRef(null);

  const handleImageDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setValue("categoryImage", file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue("categoryImage", file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Heading
        // heading={isEdit ? "Edit" : "Add"}
        // subHeading={"Category"}
        buttonName={"Category List"}
        link={"/admin/categories"}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 lg:grid-cols-1 gap-6 text-black"
      >
        <div className="flex flex-col justify-between bg-white shadow rounded-lg p-6">
          <div className="space-y-4">
            <Input
              register={register}
              name="name"
              label="Category Name*"
              type="text"
              placeholder="Enter Category Name"
            />
            {errors.name && (
              <p className="text-rose">{errors.name.message}</p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
              <div>
                <label className="block text-sm mb-1">Add Sub-Category</label>
                <input
                  type="text"
                  className="w-full p-[5px] rounded border-1 border-[#474C59] bg-transparent  placeholder:text-base placeholder:font-medium placeholder:text-[#ffffff]"
                  value={newSubCategory}
                  placeholder="Enter Sub-Category Name"
                  onChange={(e) => setNewSubCategory(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={addSubCategory}
                  className="w-full bg-rose px-[16px] py-[8px] rounded text-white"
                >
                  Add Sub-Category
                </button>
              </div>
            </div>

            {errors.subCategories && (
              <p className="text-rose text-sm">
                {errors.subCategories.message}
              </p>
            )}

            {subCategories.length > 0 && (
              <div>
                <label className="block text-sm mb-1">Sub-Categories*</label>
                <div className="flex flex-wrap gap-2">
                  {subCategories.map((subCategory, index) => (
                    <span
                      key={index}
                      className="bg-[#D4D4D4] text-black rounded-[4px] p-3 flex items-center"
                    >
                      {subCategory}
                      <img
                        src={CloseIcon}
                        alt="Remove"
                        className="filter brightness-0 hover:brightness-50 ml-2 cursor-pointer"
                        onClick={() => removeSubCategory(subCategory)}
                      />
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="mt-6 flex">
            <button
              type="submit"
              className="w-full bg-rose px-[16px] py-[10px] rounded text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? <div className="loader" /> : "Save"}
            </button>
          </div>
        </div>

        <div className="col-span-1 bg-white shadow rounded-lg p-6 h-max">
          <h2 className="text-xl font-semibold mb-4">Upload Category Image*</h2>

          <div className="flex flex-col items-center gap-4">
            {previewImage ? (
              <div className="relative p-2 border-1 border-[#474C59] rounded-2xl">
                <img
                  src={previewImage}
                  alt="Category"
                  className="w-[257px] h-[275px] object-cover rounded-2xl"
                />
              </div>
            ) : (
              <div
                className="px-3 py-8 border-1 border-dashed border-[#474C59] rounded-2xl flex flex-col items-center justify-center gap-4 w-full"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleImageDrop(e)}
              >
                <img src={UploadIcon} alt="Upload Icon" />
                <p className="text-sm text-center">
                  Drop your image here
                  <br />
                  or
                  <br />
                  <span
                    className="text-rose cursor-pointer"
                    onClick={() =>
                      document.getElementById("categoryImageUpload").click()
                    }
                  >
                    Click to Browse
                  </span>
                </p>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              {...register("categoryImage")}
              onChange={handleImageUpload}
              className="hidden"
              id="categoryImageUpload"
            />

            <label
              htmlFor="categoryImageUpload"
              className="w-full bg-rose px-[16px] py-[8px] rounded text-center text-white cursor-pointer"
            >
              {previewImage ? "Change Image" : "Upload Image"}
            </label>

            {errors.categoryImage && (
              <p className="text-rose text-sm">
                {errors.categoryImage.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default AddCategory;
