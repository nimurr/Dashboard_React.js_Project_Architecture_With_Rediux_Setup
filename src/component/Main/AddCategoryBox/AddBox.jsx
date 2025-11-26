import { useState } from "react";
import { Form } from "antd";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";

const AddSubscriptionForm = () => {
  const [formFields, setFormFields] = useState({
    subscriptionName: "",
    subscriptionPrice: "",
    items: [""], // Initial items array
  });

  const handleFieldChange = (index, value) => {
    const newItems = [...formFields.items];
    newItems[index] = value;
    setFormFields({ ...formFields, items: newItems });
  };

  const addItemField = () => {
    setFormFields({ ...formFields, items: [...formFields.items, ""] });
  };

  const removeItemField = (index) => {
    const newItems = [...formFields.items];
    newItems.splice(index, 1);
    setFormFields({ ...formFields, items: newItems });
  };

  const handleInputChange = (field, value) => {
    setFormFields({ ...formFields, [field]: value });
  };

  const onFinish = () => {
    console.log("Form Data Submitted:", formFields);
    // Add API submission logic here
  };

  return (
    <div className="w-full pb-10">
      {/* Header */}
      <div className="flex items-center gap-4 my-6">
        <Link to={"/subscription"}>
          <IoChevronBack className="size-6 text-black" />
        </Link>
        <h1 className="text-2xl font-semibold">Add Subscriptions</h1>
      </div>

      <div className="w-full md:w-2/3 mx-auto">
        <Form layout="vertical" onFinish={onFinish} className="mt-5">
          {/* Subscription Name */}
          <Form.Item label="Subscription Name">
            <input
              type="text"
              value={formFields.subscriptionName}
              onChange={(e) => handleInputChange("subscriptionName", e.target.value)}
              placeholder="Type name"
              className="w-full px-3 py-2 border border-yellow-400 rounded-lg bg-yellow-50"
            />
          </Form.Item>

          {/* Subscription Price */}
          <Form.Item label="Subscription Price">
            <input
              type="number"
              value={formFields.subscriptionPrice}
              onChange={(e) => handleInputChange("subscriptionPrice", e.target.value)}
              placeholder="Type price"
              className="w-full px-3 py-2 border border-yellow-400 rounded-lg bg-yellow-50"
            />
          </Form.Item>

          {/* Items Fields */}
          {formFields.items.map((item, index) => (
            <div key={index} className="flex items-center gap-5 mb-4">
              <Form.Item label={`Item ${index + 1}`} className="w-full">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleFieldChange(index, e.target.value)}
                  placeholder="Enter item"
                  className="w-full px-3 py-2 border border-yellow-400 rounded-lg bg-yellow-50"
                />
              </Form.Item>
              <button
                type="button"
                onClick={() => removeItemField(index)}
                className="text-yellow-500 text-xl flex justify-center items-center"
              >
                <AiOutlineMinusCircle />
              </button>
            </div>
          ))}

          {/* Add Fields Button */}
          <div className="flex items-center gap-2 mb-6">
            <button
              type="button"
              onClick={addItemField}
              className="flex items-center text-yellow-500 font-semibold"
            >
              <AiOutlinePlusCircle className="text-xl mr-1" /> Add Item
            </button>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-yellow-500 text-white px-10 py-2 rounded-lg font-semibold"
            >
              Save
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddSubscriptionForm;
