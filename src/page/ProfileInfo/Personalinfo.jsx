import { Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import User_Profile from "/public/Auth/user.png";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useGetUserProfileQuery } from "../../redux/features/setting/settingApi";
import Url from "../../redux/baseApi/forImageUrl";
import { useEffect } from "react";

const Personalinfo = () => {
    const navigate = useNavigate();

    const { data: userProfile, refetch } = useGetUserProfileQuery();

    const user = userProfile?.data;
    console.log(user);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return (
        <div className="md:p-4 mt-5 sm:mt-0">
            <div>
                <Link to={"/settings"} className="flex items-center gap-2 text-xl font-semibold">
                    <MdOutlineKeyboardArrowLeft size={30} /> Profile setting
                </Link>
            </div>
            <div className="lg:flex md:flex gap-4 bg-white py-10 rounded-xl">
                <div className="lg:w-1/3 flex flex-col border border-dotted p-4 justify-center items-center gap-8">
                    <img
                        className="w-40 h-40 border p-2 rounded-full"
                        src={user?.profileImageUrl ? Url + user?.profileImageUrl : User_Profile}
                        alt="User Profile"
                    />
                    <div className="flex flex-col justify-center items-center text-center">
                        <p className="text-lg md:text-xl">{user?.role}</p>
                        <h1 className="text-2xl md:text-3xl font-medium">{user?.fullName}</h1>
                    </div>
                </div>

                <div className="lg:w-2/3 mt-8 lg:mt-0 md:px-5">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1">
                                <label
                                    htmlFor="name"
                                    className="text-lg md:text-xl font-medium"
                                >
                                    Name
                                </label>
                                <Input
                                    placeholder="First name"
                                    value={user?.fullName} // Raw text for name
                                    className="p-4 cursor-pointer text-lg md:text-xl bg-[#ebf5f5] text-black rounded w-full mt-3 outline-none"
                                    type="text"
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="flex-1">
                            <label htmlFor="email" className="text-lg md:text-xl font-medium">
                                Email
                            </label>
                            <Input
                                placeholder="Email"
                                value={user?.email}// Raw text for email
                                className="p-4 text-lg md:text-xl bg-[#ebf5f5] rounded w-full mt-3 outline-none"
                                type="text"
                                readOnly
                            />
                        </div>

                        <div className="flex-1">
                            <label htmlFor="phone" className="text-lg md:text-xl font-medium">
                                Phone Number
                            </label>
                            <Input
                                placeholder="Phone"
                                value={user?.phoneNumber}// Raw text for phone number
                                className="p-4 text-lg md:text-xl bg-[#ebf5f5] rounded w-full mt-3 outline-none"
                                type="text"
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-2 items-center md:justify-end justify-center mt-8">
                <div
                    onClick={() => navigate(`/settings/personal-info/edit`)}
                    className="w-48 !bg-[#038c6d] !text-white py-3 px-6 rounded-lg cursor-pointer flex justify-center items-center gap-2"
                >
                    <FaEdit size={17} />
                    <p>Edit Profile</p>
                </div>
            </div>
        </div>
    );
};

export default Personalinfo;
