import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, message } from "antd";
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { useEffect, useState } from "react";
import { useGetAllSettingsQuery, useUpdateAboutUsMutation } from "../../redux/features/setting/settingApi";

const EditAboutUs = () => {
  const [updateAboutUs, { isLoading }] = useUpdateAboutUsMutation();
  const { data: privacyPolicy, isFetching } = useGetAllSettingsQuery();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [content, setContent] = useState(""); // State for Quill content

  console.log(content);

  // Set default value when API data is available
  useEffect(() => {
    if (privacyPolicy?.aboutUs) {
      setContent(privacyPolicy.aboutUs);
    }
  }, [privacyPolicy]);

  const handleSubmit = async () => {
    console.log("Updated About Us Content:", content);

    try {
      const res = await updateAboutUs({ aboutUs: content }).unwrap();
      if (res?.success) {
        message.success(res?.message);
        navigate("/settings/about-us");
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to update About Us.");
    }
  };
 

  return (
    <section className="w-full h-full min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center py-5">
        <Link to="/settings" className="flex gap-4 items-center">
          <IoChevronBack className="text-2xl" />
          <h1 className="text-2xl font-semibold">About Us</h1>
        </Link>
      </div>

      {/* Form Section */}
      <div className="w-full p-6 rounded-lg shadow-md">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* React Quill for About Us Content */}
          <Form.Item name="content">
            <ReactQuill
              value={content} // Directly use content as the value
              defaultValue={content} // Default value              
              onChange={setContent} // Update state
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  [{ font: [] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["bold", "italic", "underline", "strike"],
                  [{ align: [] }],
                  [{ color: [] }, { background: [] }],
                  ["blockquote", "code-block"],
                  ["link", "image", "video"],
                  [{ script: "sub" }, { script: "super" }],
                  [{ indent: "-1" }, { indent: "+1" }],
                  ["clean"],
                ],
              }}
              style={{ height: "300px" }}
            />
          </Form.Item>

          {/* Update Button */}
          <div className="flex justify-end md:mt-16 mt-20">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#038c6d] text-white px-5 text-xl py-2 rounded-md"
              loading={isLoading || isFetching} // Show loading state
            >
              {isLoading || isFetching ? "Updating..." : "Update"}
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default EditAboutUs;
