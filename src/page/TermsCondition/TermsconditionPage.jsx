import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import CustomButton from "../../utils/CustomButton";
import { Spin } from "antd"; // Importing Spin
import { useEffect } from "react";
import { useGetAllSettingsQuery } from "../../redux/features/setting/settingApi";

const TermsconditionPage = () => {


  const { data: privacyPolicy, isLoading, refetch } = useGetAllSettingsQuery();

  console.log(privacyPolicy?.termsAndConditions);

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
          <h1 className="text-2xl font-semibold">Terms of Conditions</h1>
        </Link>
        <Link to={"/settings/edit-terms-conditions/11"}>
          <button
            className="bg-[#038c6d] text-white flex items-center gap-2 p-2 rounded-md font-bold"
            border
          >
            <TbEdit className="size-5" />
            <span>Edit</span>
          </button>
        </Link>
      </div>

      {/* Show Spin loader if data is loading */}
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      )
        :
        (
          <div className="w-full h-full ml-3">
            <div dangerouslySetInnerHTML={{ __html: privacyPolicy?.termsAndConditions }} />
          </div>
        )
      }

      {/* Show content if data is available */}

    </section>
  );
};

export default TermsconditionPage;
