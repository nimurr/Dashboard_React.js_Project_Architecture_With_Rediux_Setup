
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Welcome = () => {
  // Sample data
  const notifications = [
    { id: 1, title:"Event Calendars:", message: "Shared calendars for tracking family activities and appointments.", time: "2 Min Ago" },
    { id: 2, title:"Activity Suggestions:", message: "Recommendations for local events and activities based on interests.", time: "2 Min Ago" },
    { id: 3, title:"Resource Sharing:", message: "Sections for sharing parenting tips, local services, and educational materials.", time: "2 Min Ago" },
    { id: 4, title:"Customizable Profiles:", message: "Individual profiles for tracking personal schedules and preferences..", time: "2 Min Ago" },
  ];

  return (
    <div className="p-4">
      <Link rel="stylesheet" to="/settings">
        <h1 className="text-2xl font-bold mb-4 flex items-center"><FaAngleLeft /> Welcome page</h1>
      </Link>
      <div className="space-y-4">
        {notifications.map((item) => (
          <div key={item.id} >
            <h1 className="tex-3xl font-semibold py-2">{item.title}</h1>
            <div className="border border-[#f1bd19] rounded-md p-4 flex items-center space-x-4">
                <div className="bg-[#f1bd19] p-1 rounded-full">
                </div>
                <div>
                  <p className="font-semibold">{item.message}</p>
                </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full justify-end my-10">
        <Link to={"edit"} >
        <button className="bg-[#f1bd19] w-[120px] px-5 py-3 text-white rounded-md">Edit</button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
