import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, message } from "antd";
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { useState } from "react";
import { useUpdateTramsAndConditionsAllMutation } from "../../redux/features/setting/settingApi";

const EditTermsConditions = () => {

  const [updateTramsAndCondition, { isLoading }] = useUpdateTramsAndConditionsAllMutation();

  const navigate = useNavigate();





  const [form] = Form.useForm();
  const [content, setContent] = useState(
    ""
  ); // Default content for the Terms and Conditions section

  const handleSubmit = async () => {
    console.log("Updated Terms and Conditions Content:", content);
    // Handle form submission, e.g., update the Terms and Conditions in the backend

    try {
      const res = await updateTramsAndCondition({ termsAndConditions: content }).unwrap();
      console.log(res);
      if (res?.success) {
        message.success(res?.message);
        navigate("/settings/terms-conditions");
      }
    } catch (error) {
      console.log(error);
    }



  };

  return (
    <section className="w-full h-full min-h-screen ">
      {/* Header Section */}
      <div className="flex justify-between items-center py-5">
        <Link to="/settings" className="flex gap-4 items-center">
          <>
            <IoChevronBack className="text-2xl" />
          </>
          <h1 className="text-2xl font-semibold">Terms of Conditions</h1>
        </Link>
      </div>

      {/* Form Section */}
      <div className="w-full p-6 rounded-lg shadow-md">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* React Quill for Terms and Conditions Content */}
          <Form.Item name="content" initialValue={content}>
            <ReactQuill
              value={content}
              onChange={(value) => setContent(value)}
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, 4, 5, 6, false] }], // Header dropdown
                  [{ font: [] }], // Font options
                  [{ list: "ordered" }, { list: "bullet" }], // Ordered and bullet lists
                  ["bold", "italic", "underline", "strike"], // Formatting options
                  [{ align: [] }], // Text alignment
                  [{ color: [] }, { background: [] }], // Color and background
                  ["blockquote", "code-block"], // Blockquote and code block
                  ["link", "image", "video"], // Link, image, and video upload
                  [{ script: "sub" }, { script: "super" }], // Subscript and superscript
                  [{ indent: "-1" }, { indent: "+1" }], // Indent
                  ["clean"], // Remove formatting
                ],
              }}
              style={{ height: "300px" }} // Set the increased height
            />
          </Form.Item>

          {/* Update Button */}
          <div className="flex justify-end md:mt-0 mt-40">
            <button
              // type="primary"
              // htmlType="submit"
              className="bg-[#038c6d] text-white text-xl font-semibold px-5 py-3 rounded-md md:mt-14"
            >
              Update
            </button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default EditTermsConditions;
