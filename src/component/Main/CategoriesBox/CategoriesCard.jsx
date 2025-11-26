/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useDeleteCategoryMutation } from "../../../redux/features/category/categoryApi";
import Swal from "sweetalert2"; // Import SweetAlert
import { toast } from "sonner";

const CategoriesCard = ({ item }) => {
  const [deleteBox] = useDeleteCategoryMutation();
  const { id, name, image } = item;

  // Handle delete confirmation using Swal
  const showDeleteConfirm = async (boxId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this BudBox? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      handleDelete(boxId); // Proceed with deletion if confirmed
    }
  };

  const handleDelete = async (boxId) => {
    try {
      const res = await deleteBox(boxId);
      if (res.error) {
        toast.error(res.error.data.message);
        return;
      }
      if (res.data) {
        toast.success("BudBox deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete BudBox");
    }
  };

  return (
    <div>
      <div className="w-full group shadow rounded-xl">
        <img
          src={image?.url ? `${imageBaseUrl}${image.url}` : '/fallback-placeholder.jpg'}
          className="w-full h-36 md:h-44 lg:h-56 xl:h-60 object-cover rounded-md z-30 cursor-pointer bg-[#f1bd19]"
        />
        <div className="p-5 space-y-4 bg-[#fef8e8] rounded-md">
          <h1 className="text-2xl font-semibold text-center">{name}</h1>
        </div>
      </div>
      <div className="flex justify-between items-center gap-5 my-5">
        <button
          onClick={() => showDeleteConfirm(id)} // Show confirmation dialog
          className="px-3 md:px-7 py-3 border border-[#f1bd19] text-[#000] bg-[#fef8e8] rounded "
        >
          Delete
        </button>
        <Link to={`/categories/edit-box/${id}`}>
          <button className="px-3 md:px-10 py-3 bg-[#f1bd19] text-black rounded border border-[#f1bd19]">
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CategoriesCard;
