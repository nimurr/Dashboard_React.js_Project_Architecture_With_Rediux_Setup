import { IoChevronBack } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import CustomButton from "../../utils/CustomButton";
import { Spin } from "antd"; // Importing Spin  
import { useGetAllSettingsQuery } from "../../redux/features/setting/settingApi";
import { useEffect } from "react";

const PrivacyPolicyPage = () => {

  const { data: privacyPolicy, isLoading, refetch } = useGetAllSettingsQuery();

  console.log(privacyPolicy);

  useEffect(() => {
    refetch();
  }, []);


  return (
    <section className="w-full h-full min-h-screen">
      <div className="flex justify-between items-center py-5">
        <Link to="/settings" className="flex gap-4 items-center">
          <>
            <IoChevronBack className="text-2xl" />
          </>
          <h1 className="text-2xl font-semibold">Privacy Policy</h1>
        </Link>
        <Link to={'/settings/edit-privacy-policy'}>
          <button className="bg-[#038c6d] text-white flex items-center gap-2 p-2 rounded-md font-bold" border>
            <TbEdit className="size-5" />
            <span>Edit</span>
          </button>
        </Link>
      </div>

      {/* Show Spin loader if data is loading */}

      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <div className="w-full h-full ml-3">
          <div dangerouslySetInnerHTML={{ __html: privacyPolicy?.privacyPolicy }} />

        </div>
      )}

    </section>
  );
}

export default PrivacyPolicyPage;
