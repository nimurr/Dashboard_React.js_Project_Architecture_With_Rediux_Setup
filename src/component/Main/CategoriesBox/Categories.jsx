import React, { useState } from "react";
import { Modal, Input, message, Pagination } from "antd";
import { FaPlus } from "react-icons/fa";
import categoryImage from "/public/category/category.png"; // Update this path as necessary
import { useAddCategoryMutation, useDeleteCategoryMutation, useGetAllCategoriesQuery, useUpdateCategoryMutation } from "../../../redux/features/category/categoryApi";
import Url from "../../../redux/baseApi/forImageUrl";

const Categories = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);


  const [addCatagories] = useAddCategoryMutation();
  const [editCatagories, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const { data: allCategories, isLoading } = useGetAllCategoriesQuery();
  const allMain = allCategories?.data;


  const [deleteCategory] = useDeleteCategoryMutation();
  // console.log(allCategories?.data);





  const [categories, setCategories] = useState([
    { id: 1, name: "Real Estate", image: categoryImage },
    { id: 2, name: "Technology", image: categoryImage },
    { id: 3, name: "Health", image: categoryImage },
    { id: 4, name: "Education", image: categoryImage },
    { id: 5, name: "Finance", image: categoryImage },
    { id: 6, name: "Sports", image: categoryImage },
    { id: 7, name: "Lifestyle", image: categoryImage },
    { id: 8, name: "Food", image: categoryImage },
  ]);

  const showAddModal = () => {
    setCategoryName("");
    setImage(null);
    setIsAddModalVisible(true);
  };

  const showEditModal = (category) => {
    setCurrentCategory(category);
    setCategoryName(category?.name);
    setImage(category?.imageUrl);
    setId(category?.id);

    setIsEditModalVisible(true);

    // console.log(category);



  };

  const closeAddModal = () => {
    setIsAddModalVisible(false);
    setCategoryName("");
    setImage(null);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
    setCategoryName("");
    setImage(null);
    setCurrentCategory(null);
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!categoryName) {
      message.error("Please enter a category name!");
      return;
    }
    if (!image) {
      message.error("Please upload an image!");
      return;
    }


    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("image", image);

    try {

      const res = await addCatagories(formData).unwrap();

      console.log(res);
      if (res.error) {
        message.error(res.error.data.message);
      }

      if (res.success) {
        message.success("Category added successfully!");
        closeAddModal();
      }


    } catch (error) {
      console.error(error?.data?.message);
      message.error(error?.data?.message);
    }



  };

  const handleEditCategory = async (e) => {
    e.preventDefault();

    const form = e.target;

    const formData = new FormData();
    const image2 = form?.image?.files[0];
    if (image2) {
      formData.append("image", image2);
    }
    const categoryName2 = form?.categoryName?.value;
    if (categoryName2) {
      formData.append("name", categoryName2);
    }
    formData.append("id", id);
    console.log(id + " " + categoryName + " " + image2);


    try {

      const res = await editCatagories({ data: formData });
      console.log(res);
      if (res?.data?.error) {
        message.error(res?.data?.error?.data?.message);
      }
      if (res?.data?.success) {
        message.success(res?.data?.message);
      }

    } catch (error) {
      console.log('error');
      console.log(error);
    }


    // setCategories(updatedCategories);
    // closeEditModal();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedCategories = categories.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleDeleteCategory = async (categoryId) => {
    console.log(categoryId?.id);

    try {

      const res = await deleteCategory(categoryId?.id).unwrap();

      console.log(res);
      // message.success(res?.message);

      if (res) {
        message.success(res?.message);
      }


    } catch (error) {
      console.log(error);
    }

  }

  return (
    <section>
      <div className="w-full md:flex justify-end items-center py-6">
        <button
          className="px-2 md:px-5 py-3 text-xl bg-[#038c6d] text-white flex justify-center items-center gap-1 rounded md:mb-0"
          onClick={showAddModal}
        >
          <FaPlus className="text-xl font-semibold text-white" /> Add Category
        </button>
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5">
        {allMain?.map((category) => (
          <div key={category?.id} className="border-shadow pb-5 rounded-lg overflow-hidden">
            <img className="w-full max-h-[250px]" src={Url + category?.imageUrl} alt="Category" />
            <div>
              <h2 className="my-5 text-3xl font-semibold text-center">{category?.name}</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 px-5">
              <button
                className="w-full py-3 px-6 border border-[#038c6d] rounded-lg"
                onClick={() => handleDeleteCategory(category)}
              >
                Delete
              </button>
              <button
                className="w-full py-3 px-6 border bg-[#038c6d] text-white rounded-lg"
                onClick={() => showEditModal(category)}
              >
                Edit Category
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="flex justify-center mt-10">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={categories.length}
          onChange={handlePageChange}
        />
      </div> */}

      {/* Add Modal */}
      <Modal title="Add Category" visible={isAddModalVisible} onCancel={closeAddModal} footer={null}>
        <form onSubmit={handleAddCategory} action="">
          <div className="my-5">
            <span className="mb-3 font-semibold text-base">Category Name</span>
            <Input
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          <div className="my-5 w-full">
            <span className="mb-3 font-semibold text-base block">Category Image</span>
            <input
              type="file"
              accept="image/*"
              className="block w-full border-dashed border-gray-300 rounded-lg p-2"
              onChange={handleFileChange}
            />
          </div>

          <button className="w-full py-3 bg-[#038c6d] text-white rounded-lg" onClick={handleAddCategory}>
            Add Category
          </button>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal title="Edit Category" visible={isEditModalVisible} onCancel={closeEditModal} footer={null}>

        <form onSubmit={handleEditCategory} action="">
          <div className="my-5">
            <span className="mb-3 font-semibold text-base">Category Name</span>
            <Input
              placeholder="Enter category name"
              value={categoryName}
              name="categoryName"
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          <div className="my-5 w-full">
            <span className="mb-3 font-semibold text-base block">Category Image</span>
            <img src={Url + image} alt="" />
            <input
              type="file"
              accept="image/*"
              name="image"
              className="block w-full border-dashed border-gray-300 rounded-lg p-2" onChange={handleFileChange}
            />


          </div>

          <button className="w-full py-3 bg-[#038c6d] text-white rounded-lg" >
            Edit Category
          </button>
        </form>
      </Modal>
    </section>
  );
};

export default Categories;
