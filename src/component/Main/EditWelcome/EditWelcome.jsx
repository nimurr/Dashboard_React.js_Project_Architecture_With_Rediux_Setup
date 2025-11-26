import  { useState } from "react";
import { Form } from "antd";


import { GoDotFill } from "react-icons/go";
import CustomInput from "../../../utils/CustomInput";
import CustomButton from "../../../utils/CustomButton";
import { Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";

const EditWelcome = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true); // Show loading state
    const formdata = new FormData();
    formdata.append("name", values.budBoxName);
    formdata.append("type", values.type);

    // Simulate an async operation
    setTimeout(() => {
      console.log("Form Submitted:", values);
      setIsLoading(false); // Reset loading state
    }, 2000);
  };

  return (
    <>
     <Link rel="stylesheet" to="/settings">
        <h1 className="text-2xl font-bold mb-4 flex items-center mt-5"><FaAngleLeft />Edit Welcome page</h1>
      </Link>
      <Form form={form} layout="vertical" onFinish={onFinish} className="mt-5 ">
        <Form.Item
          label="Event Calendars:"
          name="eventcalendars"
          className="w-full"
        >
          <CustomInput icon={GoDotFill} className="border border-[#f1bd19] " placeholder="Shared calendars for tracking family activities and appointments." />
        </Form.Item>
        <Form.Item
          label="Activity Suggestions:"
          name="activitysuggestions"
          className="w-full"
        >
          <CustomInput icon={GoDotFill} className="border border-[#f1bd19] "  placeholder="Recommendations for local events and activities based on interests." />
        </Form.Item>
        <Form.Item
          label="Resource Sharing:"
          name="resourcesharing"
          className="w-full"
        >
          <CustomInput icon={GoDotFill} className="border border-[#f1bd19] text-[#f1bd19]" placeholder="Sections for sharing parenting tips, local services, and educational materials." />
        </Form.Item>
        <Form.Item
          label="Customizable Profiles:"
          name="customizable"
          className="w-full"
        >
          <CustomInput icon={GoDotFill} className="border border-[#f1bd19] "  placeholder="Individual profiles for tracking personal schedules and preferences." />
        </Form.Item>
        <div className="w-full flex justify-end">
        <button
          type="primary"
          // htmlType="submit"
          // isLoading={isLoading}
          icon={<i className="fas fa-sync-alt"></i>} // Example FontAwesome icon
          className="mt-4 w-[120px] bg-[#f1bd19] p-2 text-xl font-semibold rounded-md"
        >
          Update 
        </button>
        </div>
      </Form>
    </>
  );
};

export default EditWelcome;
