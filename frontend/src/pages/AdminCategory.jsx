import React, { useState, useEffect } from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch } from "react-redux";

const AdminCategories = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v2/categories/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCategoriesData(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleDeleteCategory = async (categoryId) => {
    try {
      dispatch({
        type: "productDeleteRequest",
      });

      const requestOptions = {
        method: "DELETE",
      };

      const response = await fetch(`http://localhost:8000/api/v2/categories/delete-category/${categoryId}`, requestOptions);

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      dispatch({
        type: "productDeleteSuccess",
        payload: categoryId,
      });

      // Fetch updated categories data
      const updatedResponse = await fetch(`http://localhost:8000/api/v2/categories/categories`);
      const updatedData = await updatedResponse.json();
      setCategoriesData(updatedData.categories);
    } catch (error) {
      console.error("Error deleting category:", error);
      dispatch({
        type: "productDeleteFail",
        payload: error.message,
      });
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={2} />
          </div>
          <div className="w-full min-h-[45vh] pt-5 rounded flex justify-center">
            <div className="w-[97%] flex justify-center">
              <DataGrid
                rows={categoriesData.map((item) => ({
                  id: item._id,
                  title: item.title,
                  image: item.images[0].url || '',
                }))}
                columns={[
                  { field: "id", headerName: "ID", minWidth: 150, flex: 0.7 },
                  { field: "title", headerName: "Tên Danh Mục", minWidth: 130, flex: 0.7 },
                  {
                    field: "image",
                    headerName: "Ảnh",
                    minWidth: 130,
                    flex: 0.7,
                    renderCell: (params) => (
                      <img src={params.value} alt="Category" style={{ width: 50, height: 50 }} />
                    ),
                  },
                  {
                    field: "actions",
                    headerName: "Actions",
                    width: 150,
                    flex: 0.5,
                    renderCell: (params) => (
                      <div>
                        <button onClick={() => handleDeleteCategory(params.row.id)}>
                          Delete
                        </button>
                      </div>
                    ),
                  },
                ]}
                pageSize={4}
                disableSelectionOnClick
                autoHeight
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
