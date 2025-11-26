/* eslint-disable react/prop-types */
import { DatePicker } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetDashboardStatusQuery } from "../../../redux/features/dashboard/dashboardApi";

const data = [
  { month: "Jan", income: 5000 },
  { month: "Feb", income: 4000 },
  { month: "Mar", income: 7000 },
  { month: "Apr", income: 8000 },
  { month: "May", income: 9000 },
  { month: "Jun", income: 10000 },
  { month: "Jul", income: 11000 },
  { month: "Aug", income: 10000 },
  { month: "Sep", income: 9000 },
  { month: "Oct", income: 14000 },
  { month: "Nov", income: 15000 },
  { month: "Dec", income: 16000 }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white p-2 border border-gray-300 rounded shadow-lg">
        <p className="label font-semibold">{`Month: ${label}`}</p>
        <p className="intro">{`Total Income: $${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }

  return null;
};

const IncomeGraphChart = () => {


   const { data, isLoading } = useGetDashboardStatusQuery();
  
    console.log(data);
  


  return (
    <section className="w-full col-span-full md:col-span-4 bg-white  rounded-lg border border-[#002831]">
      <div className="border-b border-[#002831]">
      <div className="flex justify-between items-center p-3">
        <h1 className="font-semibold">Income Ratio</h1>
        <DatePicker  picker="year" defaultOpenValue={data?.totalAmountOfEarningInDifferentTime?.year} />
      </div>
      </div>
      
      <ResponsiveContainer className="pr-4" width="100%" height={210}>
        <BarChart
          data={data?.totalAmountOfEarningInDifferentTime?.incomeData}
          margin={{
            top: 5,
            bottom: 5, 
          }}
          className="md:mt-5  md:mb-5" 
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="income" barSize={20} fill="#002831" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};

export default IncomeGraphChart;


// /* eslint-disable react/prop-types */
// import { DatePicker } from "antd";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { useGetIncomeRatioQuery } from "../../../redux/features/dashboard/dashboardApi";
// import { useState, useEffect } from "react";
// import dayjs from "dayjs";

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="custom-tooltip bg-white p-2 border border-gray-300 rounded shadow-lg ">
//         <p className="label font-semibold">{`Month: ${label}`}</p>
//         <p className="intro">{`Total Income: $${payload[0].value.toLocaleString()}`}</p>
//       </div>
//     );
//   }
//   return null;
// };

// const IncomeGraphChart = () => {
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const { data: incomeData } = useGetIncomeRatioQuery(selectedYear);
//   const [isMobile, setIsMobile] = useState(false);

  

//   const chartData = incomeData?.map((monthData) => ({
//     month: monthData.month,
//     income: monthData.totalEarnings,
//   }));


//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     handleResize(); // Check screen size on initial load
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const handleDateChange = (date) => {
//     if (date) {
//       setSelectedYear(date.year());
//     }
//   };

//   return (
//     <section className="w-full col-span-full md:col-span-4 bg-white p-5 rounded-lg border border-[#85594B]">
//       <div className="flex justify-between items-center py-3">
//         <h1 className="font-semibold">Revenue For User</h1>
//         <DatePicker
//           onChange={handleDateChange}
//           picker="year"
//           defaultValue={dayjs(selectedYear.toString())}
//         />
//       </div>
//       <ResponsiveContainer width="100%" height={350}>
//         <BarChart
//           data={chartData}
//           margin={
//             isMobile
//               ? { top: 0, right: 0, left: 0, bottom: 0 }
//               : { top: 5, right: 30, left: 10, bottom: 5 }
//           }
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" interval={0} />
//           <YAxis />
//           <Tooltip content={<CustomTooltip />} />
//           <Bar dataKey="income" barSize={20} fill="#f7cc50" />
//         </BarChart>
//       </ResponsiveContainer>
//     </section>
//   );
// };

// export default IncomeGraphChart;
