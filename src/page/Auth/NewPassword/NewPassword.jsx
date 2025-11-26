import changePasswordImage from "/public/Auth/update-password.png";
import authLogo from "../../../assets/auth/auth-logo.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Form } from "antd"; // Import Ant Design Form
import CustomInput from "../../../utils/CustomInput";
import CustomButton from "../../../utils/CustomButton";
import { toast } from "sonner";
import { useResetPasswordMutation } from "../../../redux/features/auth/authApi";

const NewPassword = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const jwtToken = localStorage.getItem("jwtToken");

  console.log(jwtToken);

  const submit = async (values) => {
    const { password, confirmPassword } = values;


    if (!password || !confirmPassword) {
      toast.error("Password is required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }


    try {
      const res = await resetPassword({
        jwtToken,
        newPassword: password
      });
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message);
      }
      if (res.data) {
        toast.success(res.data.message);
        navigate("/auth/login");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full   h-full md:h-screen md:flex justify-around ">
      {/* <img
            src={authLogo}
            className="w-[147px] h-[152px] mx-auto md:my-20 md:mx-5"
            alt="Sign in illustration"
      /> */}
      <div className="w-full max-w-7xl mx-auto border-shadow rounded-md h-[70%] md:my-28 grid grid-cols-1 md:grid-cols-2 place-content-center px-5 py-10 gap-8 bg-white md:mx-10">
        <div>
          <img
            src={changePasswordImage}
            className="w-full h-full mx-auto"
            alt="Change Password Illustration"
          />
        </div>
        <div className="mt-16">
          <div className="mb-5">
            <h1 className="font-semibold text-xl flex items-center gap-2">
              <Link to="/auth/login">
                <IoIosArrowBack />
              </Link>
              Update Password
            </h1>
          </div>

          {/* Ant Design Form */}
          <Form
            layout="vertical"
            onFinish={submit} // Ant Design's form submission handler
            initialValues={{ password: "", confirmPassword: "" }} // Initial values
          >
            {/* CustomInput wrapped inside Form.Item for validation */}
            <Form.Item
              label="New Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your new password",
                },
              ]}
            >
              <CustomInput isPassword type="password" placeholder="Password" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <CustomInput
                isPassword
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>

            {/* CustomButton for submission */}
            <Form.Item>
              <button className="w-full bg-[#84df91] text-xl font-semibold text-white rounded-md py-2" loading={isLoading} border >
                Update Password
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
