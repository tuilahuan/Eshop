import React, { useState } from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { createCategory } from "../redux/actions/category";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Xử lý thay đổi hình ảnh
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Xử lý khi form được submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });

    newForm.append("title", title);

    try {
      await dispatch(createCategory({ title, images }));
      alert("Thêm Thành công");
      // Reload the page after successful addition
      setTimeout(() => {
        window.location.reload();
      }, 0); // Reload after 2 seconds (you can adjust the time)
    } catch (error) {
      console.error("Error adding category:", error);
      // Handle error if necessary
    }
  };

  return (
    <div>
      <div className="w-full flex">
        <form onSubmit={handleSubmit}>
          <br />
          <div>
            {/* Input nhập tên danh mục */}
            <label className="pb-2">
              Tên Danh Mục <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={title}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Mời bạn nhập tên danh mục"
            />
          </div>
          <br />
          <div>
            {/* Input chọn hình ảnh */}
            <label className="pb-2">
              Upload Images <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name=""
              id="upload"
              className="hidden"
              multiple
              onChange={handleImageChange}
            />
            <div className="w-full flex items-center flex-wrap">
              {/* Icon thêm hình ảnh */}
              <label htmlFor="upload">
                <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
              </label>
              {/* Hiển thị hình ảnh đã chọn */}
              {images &&
                images.map((image, index) => (
                  <img
                    src={image}
                    key={index}
                    alt={`Image-${index}`}
                    className="h-[120px] w-[120px] object-cover m-2"
                  />
                ))}
            </div>
            <br />
            <div>
              {/* Button tạo mới */}
              <input
                type="submit"
                value="Thêm danh mục"
                onClick={handleSubmit()}
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
