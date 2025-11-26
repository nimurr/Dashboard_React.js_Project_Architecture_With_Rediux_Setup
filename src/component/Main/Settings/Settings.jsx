/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Form, message, Modal, Switch } from "antd";
import { MdKeyboardArrowRight } from "react-icons/md";
import OTPInput from "react-otp-input";
// import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../../utils/CustomInput";
import CustomButton from "../../../utils/CustomButton";
import { useState } from "react";
import { useChangePasswordMutation } from "../../../redux/features/auth/authApi";

const Settings = () => {
  // const { user } = useSelector(state => state?.auth) 
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelTitle, setModelTitle] = useState("");
  const [otp, setOtp] = useState("");
  const [form] = Form.useForm();
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  const settingsItem = [
    // {
    //   title: "Personal Information",
    //   path: "personal-info",
    // },
    {
      title: "Personal Information",
      path: "personal-info",
    },
    {
      title: "Change password",
      path: "change-password",
    },

    {
      title: "Privacy Policy",
      path: "privacy-policy",
    },
    {
      title: "Terms & Conditions",
      path: "terms-conditions",
    },
    {
      title: "About us",
      path: "about-us",
    },
    {
      title: "FAQ",
      path: "all-faq",
    },
  ];

  const handleNavigate = (value) => {
    if (value === "notification") {
      return;
    }
    else if (value === "change-password") {
      setModelTitle("Change password");
      setIsModalOpen(true);
    } else {
      navigate(`/settings/${value}`);
    }
  };

  const [updatePassword] = useChangePasswordMutation();
  const handleChangePassword = async (values) => {

    const { oldPassword, newPassword } = values;
    console.log("oldPassword", oldPassword, "newPassword", newPassword);
    const formData = {
      oldPassword,
      newPassword
    }

    try {

      const res = await updatePassword(formData).unwrap();
      console.log(res);
      if (res?.code) {
        // navigate('')
        message.success(res?.message);
        setIsModalOpen(false);
      }

    } catch (error) {
      console.log(error);
    }



  };
  const handleForgetPassword = async (values) => {
    forgotPassword(values);
  };
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    verifyOtp({
      code: otp,
      email: user?.email,
    });
  };
  const handleResetPassword = async (values) => {
    changePassword({ email: user?.email, password: values?.password });
  };
  return (
    <section className="w-full py-6">
      {settingsItem.map((setting, index) => (
        <div
          key={index}
          className="w-full p-4 mb-2 text-sm rounded-lg bg-[#e6eff0] hover:bg-transparent hover:border-[#038c6d] border flex items-center justify-between cursor-pointer "
          onClick={() => handleNavigate(setting.path)}
        >
          <h2 className="text-xl">{setting.title}</h2>
          <h2>
            {setting.path === "notification" ? (
              <Switch defaultChecked onChange={onChange} />
            ) : (
              <MdKeyboardArrowRight size={40} />
            )}
          </h2>
        </div>
      ))}
      <Modal
        title={
          <div
            onClick={() => setIsModalOpen(false)}
            className="flex items-center cursor-pointer text-black"
          >
            <h1 className="text-xl  font-medium  mb-5">{modelTitle}</h1>
          </div>
        }
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
        centered
      >
        {modelTitle === "Change password" && (
          <div className="w-full px-5 ">
            <p className="text-[14px] mb-[14px]">
              Your password must be 8-10 character long.
            </p>
            <Form
              form={form}
              name="dependencies"
              autoComplete="off"
              style={{
                maxWidth: 600,
              }}
              layout="vertical"
              className="space-y-4 fit-content object-contain"
              onFinish={handleChangePassword}
            >
              <Form.Item
                name="oldPassword"
                rules={[
                  {
                    required: true,
                    message: "Please Input Your Old Password!",
                  },
                ]}
              >
                <CustomInput placeholder="Enter Your old Password" isPassword />
              </Form.Item>

              <Form.Item
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please Input Your New Password!",
                  },
                ]}
              >
                <CustomInput placeholder="Set Your New Password" isPassword />
              </Form.Item>

              {/* Field */}
              <Form.Item
                name="reenterPassword"
                dependencies={["newPassword"]}
                rules={[
                  {
                    required: true,
                    message: "Please Input Your Re-enter Password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <CustomInput placeholder="Re-enter password" isPassword />
              </Form.Item>
              {/* <p className=" text-secondary font-medium">
                <button onClick={() => setModelTitle("Forget password")}>
                  <h1 className="underline text-blue-500"> Forget Password</h1>
                </button>
              </p> */}
              <Form.Item className="w-full">
                <button className="w-full bg-[#038c6d] text-white p-3 text-xl font-semibold rounded-md">Update Password</button>
              </Form.Item>
            </Form>
          </div>
        )}
        {modelTitle === "Forget password" && (
          <div className="w-full px-5">
            <Form
              initialValues={{
                remember: true,
              }}
              onFinish={handleForgetPassword}
              className="space-y-7 fit-content object-contain"
            >
              <div className="">
                <h1 className="pb-3 text-xl">Enter the email address associated with your account. We'll send you an verification code to your email. </h1>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <CustomInput type="email" placeholder="Enter your email" />
                </Form.Item>
              </div>
              <Form.Item>
                <button className="w-full bg-[#038c6d] text-white p-3 text-xl font-semibold rounded-md">Send verification code</button>
              </Form.Item>
            </Form>
          </div>
        )}
        {modelTitle === "Verify Code" && (
          <div className="px-[60px] pb-[60px] bg-primary">
            <form onSubmit={handleVerifyOtp}>
              <p className="text-[16px] mb-[14px]">
                We'll send a verification code to your email. Check your inbox and enter the code here..
              </p>
              <div className="">
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  inputStyle={{
                    height: "50px",
                    background: "transparent",
                    width: "50px",
                    border: "1px solid #95C343",
                    marginRight: "20px",
                    outline: "none",
                  }}
                  renderInput={(props) => <input {...props} />}
                />
                <p className="flex items-center justify-between mt-2 mb-6">
                  Didn’t receive code?
                  <button className="font-medium text-">Resend</button>
                </p>
              </div>
              <button className="w-full bg-[#038c6d] text-white p-3 text-xl font-semibold rounded-md">Verify </button>
            </form>
          </div>
        )}
        {modelTitle === "Reset Password" && (
          <div className="px-[60px] pb-[60px] bg-primary">
            <Form
              form={form}
              name="dependencies"
              autoComplete="off"
              style={{
                maxWidth: 600,
              }}
              layout="vertical"
              className="space-y-4 fit-content object-contain"
              onFinish={handleResetPassword}
            >
              <Form.Item
                name="new_password"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <CustomInput placeholder="New Password" isPassword />
              </Form.Item>

              {/* Field */}
              <Form.Item
                name="confirm_password"
                dependencies={["new_password"]}
                rules={[
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("new_password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <CustomInput placeholder="Confirm Password" isPassword />
              </Form.Item>
              <Form.Item>
                <button className="w-full bg-[#038c6d] text-white p-3 text-xl font-semibold rounded-md">Update password</button>
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Settings;
