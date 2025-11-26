import { message } from "antd";
import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useBlockUserMutation, useGetSingleUserQuery, useUnBlockUserMutation } from "../../redux/features/user/userApi";

const UserDetails = () => {


  const { id } = useParams();

  const { data: userData } = useGetSingleUserQuery({ id })

  // console.log(userData?.data);
  const userDataFull = userData?.data;
  console.log(userDataFull);


  const [userBlock] = useBlockUserMutation();
  const [userUnBlock] = useUnBlockUserMutation();

  console.log(id);

  const handleUserRemove = async () => {

    try {

      const res = await userBlock(id);

      console.log(res);
      if (res.error) {
        message.error(res.error.data.message);
      }
      if (res.data) {
        message.success(res.data.message);
      }

    } catch (error) {
      message.error("Something went wrong");
    }

  };

  const handleUserUnBlock = async () => {
    try {

      const res = await userUnBlock(id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Link to={"/users"} className="text-2xl flex items-center mt-5">
        <FaAngleLeft /> User Details
      </Link>

      <div className="my-10 w-full md:w-2/4 mx-auto">
        {/* User Profile Section */}
        <div className="flex items-center justify-between gap-5 mb-5">
          <div className="flex items-center gap-5">
            <img
              className="w-24 h-24 rounded-full"
              src="../../../public/logo/userimage.png"
              alt="User"
            />
            <h1 className="text-2xl font-semibold">{userDataFull?.fullName}</h1>
          </div>
          <div className="flex items-center gap-5">
            <Link to={"/users"} className="border border-[#91838342] px-5 py-2 rounded-lg">Cancel</Link>
            <div>
              {
                userDataFull?.isBanned ?
                  <button onClick={handleUserUnBlock} className="bg-[#3c80e7] text-white px-5 py-2 rounded-lg">UnBlock</button>
                  :
                  <button onClick={handleUserRemove} className="bg-[#e74c3c] text-white px-5 py-2 rounded-lg">Block</button>
              }
              {/* <button onClick={handleUserRemove} className="bg-[#e74c3c] text-white px-5 py-2 rounded-lg">Block</button> */}
            </div>
          </div>
        </div>

        {/* User Details Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
            <span className="font-semibold">Name</span>
            <span>{userDataFull?.fullName}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
            <span className="font-semibold">Email</span>
            <span>{userDataFull?.email}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
            <span className="font-semibold">Status</span>
            <span>{!userDataFull?.isBanned ? "Active" : "Blocked"}</span>
          </div>
          {/* <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
            <span className="font-semibold">State</span>
            <span>Alaska</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
            <span className="font-semibold">Country</span>
            <span>USA</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
            <span className="font-semibold">Club Name</span>
            <span>Over 21</span>
          </div> */}
          <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
            <span className="font-semibold">Phone Number</span>
            <span>{userDataFull?.phoneNumber}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
            <span className="font-semibold">User Type</span>
            <span>{userDataFull?.role}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
            <span className="font-semibold">Joining Date</span>
            <span>
              {new Date(userDataFull?.createdAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric"
              })}
            </span>
          </div>
        </div>


      </div>
    </div>
  );
};

export default UserDetails;
