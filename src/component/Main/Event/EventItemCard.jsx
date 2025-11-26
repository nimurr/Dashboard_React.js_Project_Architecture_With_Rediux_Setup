/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { GrMapLocation } from "react-icons/gr";

const EventItemCard = ({ item, activeTab }) => {
  const { id, name, image, location, program, type, cost, deadline } = item;

  // Determine the button color based on the activeTab
  const buttonColor =
    activeTab === "Recent Tournament"
      ? "bg-[#f1bd19] text-[#ffffff]" // Yellow
      : activeTab === "Approved Tournament"
      ? "bg-blue-500 text-white" // Blue
      : "bg-gray-400 text-white"; // Gray

  return (
    <div className="w-full rounded-lg border shadow-sm bg-[#faf9f2] px-1 py-2 grid grid-cols-12 gap-2 lg:gap-5 mb-5">
      <div className="col-span-12 md:col-span-2">
        <img
          src={image.url || "/images/default.png"}
          alt={name || "Event Image"}
          className="w-full h-26 md:h-36 lg:h-46 object-cover mt-1"
        />
      </div>
      <div className="col-span-12 md:col-span-10">
        <div className="border-b-2 border-[#f1bd19] pb-3 mb-1">
          <h1 className="text-[24px] font-outfit font-medium">{name}</h1>
          <div className="flex items-center space-x-2 font-outfit font-normal text-[16px]">
            <GrMapLocation className="text-base" />
            <span>{location}</span>
          </div>
        </div>

        <div className="py-2 md:flex lg:flex items-center justify-between">
          <div>
            <h1 className="lg:text-xl font-bold text-gray-800">Program</h1>
            <div className="flex items-center space-x-2">
              <p className="bg-[#f1bd19] h-2 w-2 rounded-full"></p>
              <p className="text-sm md:text-base">{program}</p>
            </div>
          </div>

          <div>
            <h1 className="lg:text-xl font-bold text-gray-800">Type</h1>
            <div className="flex items-center space-x-2">
              <p className="bg-[#f1bd19] h-2 w-2 rounded-full"></p>
              <p className="text-sm md:text-base">{type}</p>
            </div>
          </div>

          <div>
            <h1 className="lg:text-xl font-bold text-gray-800">Cost</h1>
            <div className="flex items-center space-x-2">
              <p className="bg-[#f1bd19] h-2 w-2 rounded-full"></p>
              <p className="text-sm md:text-base">${cost}</p>
            </div>
          </div>

          <div>
            <h1 className="lg:text-xl font-bold text-gray-800">Deadline</h1>
            <div className="flex items-center space-x-2">
              <p className="bg-[#f1bd19] h-2 w-2 rounded-full"></p>
              <p className="text-sm md:text-base">{deadline}</p>
            </div>
          </div>

          <div className="flex justify-center">
            <Link to={`/allevent/recent-tournament/${id}`}>
              <button className={`px-6 py-2 rounded-lg ${buttonColor}`}>
                Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

EventItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  activeTab: PropTypes.string.isRequired,
};

export default EventItemCard;
