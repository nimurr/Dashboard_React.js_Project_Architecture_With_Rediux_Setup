/* eslint-disable react/no-unescaped-entities */
import forgetPasswordImage from "/public/Auth/forgot-password.png";
import authLogo from "../../../assets/auth/auth-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Form } from "antd";
import CustomInput from "../../../utils/CustomInput";
import { HiOutlineMail } from "react-icons/hi";
import CustomButton from "../../../utils/CustomButton";
import { useForgotPasswordMutation } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const submit = async (values) => {
    try {
      const res = await forgotPassword(values);
      if (res.error) {
        toast.error(res?.error?.data?.message);
        console.log(res.error);
      }
      if (res.data) {
        toast.success(res.data.message);
        navigate(`/auth/otp/${values?.email}`);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full  h-full md:h-screen md:flex justify-around ">
      {/* <img
            src={authLogo}
            className="w-[147px] h-[152px] mx-auto md:my-20 md:mx-5"
            alt="Sign in illustration"
      /> */}
    <div className="w-full max-w-7xl mx-auto border-shadow rounded-md h-[70%] md:my-28 grid grid-cols-1 md:grid-cols-2 place-content-center px-5 py-10 gap-8 bg-white md:mx-10">
      <div>
        <img
          src={forgetPasswordImage}
          className="w-full h-[444px] mx-auto"
          alt="Forgot Password Illustration"
        />
      </div>
      <div className="mt-16">
        <div className="mb-5 space-y-5">
          <h1 className="font-semibold text-2xl flex items-center gap-2">
            <Link to="/auth/login">
              <IoIosArrowBack />
            </Link>
            Forgot Password
          </h1>
          <h1 className="text-xl">
            Enter the email address associated with your account. We'll send you
            an verification code to your email.
          </h1>
        </div>

        {/* Ant Design Form */}
        <Form
          layout="vertical"
          onFinish={submit} // Ant Design form submission
          initialValues={{ email: "" }} // Set initial form values
        >
          {/* CustomInput wrapped in Form.Item for validation */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
          >
            <CustomInput icon={HiOutlineMail} placeholder="Email" />
          </Form.Item>

          {/* CustomButton for submit */}
          <Form.Item>
            <button
              loading={isLoading}
              border
              type="submit"
              className="w-full bg-[#84df91] text-xl font-semibold text-white rounded-md py-2"
            >
              Send Verification Code
            </button>

          
          </Form.Item>
        </Form>
      </div>
    </div>
    </div>
  );
};

export default ForgetPassword;
