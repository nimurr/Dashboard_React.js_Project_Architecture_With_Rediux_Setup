import { FaDatabase } from "react-icons/fa";
import { PiCurrencyCircleDollar, PiUsers, PiUsersThreeFill } from "react-icons/pi";
import { useGetDashboardStatusQuery } from "../../../redux/features/dashboard/dashboardApi";
const Status = () => {
  const { data, isLoading } = useGetDashboardStatusQuery();



  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-5">
      <div className="flex justify-between items-center p-5 rounded-lg border-2 border-gray-200">
        <div className="size-20 p-3 flex justify-center items-center rounded-full bg-[#002831] text-white  ">
          <PiUsersThreeFill className="size-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-center text-4xl font-semibold text-[#222222]">
            {data?.totalNumberOfUser || "0"}
          </h1>
          <h1>Total User</h1>
        </div>
      </div>
      <div className="flex justify-between items-center p-5 rounded-lg border-2 border-gray-200">
        <div className="size-20 p-3 flex justify-center items-center rounded-full bg-[#002831] text-white   ">
          <PiCurrencyCircleDollar className="size-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-center text-4xl font-semibold text-[#222222]">
            ${data?.totalAmountOfEarnings?.amount || "0"}
          </h1>
          <h1>Total Donation </h1>
        </div>
      </div>
    </div>
  );
};

export default Status;
