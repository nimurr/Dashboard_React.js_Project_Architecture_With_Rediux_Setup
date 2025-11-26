import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { FaAngleLeft } from "react-icons/fa";
import { Pagination } from "antd";
import EventItemCard from "./EventItemCard";

const EventItems = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("Recent Tournament");

  const tabs = ["Recent Tournament", "Approved Tournament", "History Tournament"];
  const items = [
    { id: 1, name: "Piano Star Event", type: "Big Tournament", image: { url: "https://i.ibb.co/gzTFS5h/Rectangle-34624152.png" }, program: "Piano", address: "Dhaka", cost: 100, deadline: "2024-11-20", tab: "Recent Tournament" },
    { id: 2, name: "Guitar Concert", type: "Small Tournament", image: { url: "https://i.ibb.co/gzTFS5h/Rectangle-34624152.png" }, program: "Guitar", address: "Chittagong", cost: 80, deadline: "2024-12-01", tab: "Approved Tournament" },
    { id: 3, name: "Drum Session", type: "Big Tournament", image: { url: "https://i.ibb.co/gzTFS5h/Rectangle-34624152.png" }, program: "Drums", address: "Sylhet", cost: 90, deadline: "2024-10-01", tab: "History Tournament" },
    { id: 4, name: "Flute Workshop", type: "Small Tournament", image: { url: "https://i.ibb.co/gzTFS5h/Rectangle-34624152.png" }, program: "Flute", address: "Khulna", cost: 75, deadline: "2024-11-20", tab: "Recent Tournament" },
  ];

  const filteredItems = items.filter((item) => item.tab === activeTab);

  return (
    <>
      <div className="w-full flex justify-between items-center py-4">
        <h1 className="text-2xl flex items-center">
          <FaAngleLeft /> All Tournament
        </h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#f1bd19] mb-10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setCurrentPage(1);
            }}
            className={`px-6 py-2 ${activeTab === tab ? "border-b-4 border-[#f1bd19]" : "text-black"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="w-full">
        {filteredItems.length > 0 ? (
          filteredItems.slice((currentPage - 1) * 4, currentPage * 4).map((item) => (
            <EventItemCard key={item.id} item={item} activeTab={activeTab} />
          ))
        ) : (
          <div className="text-center py-10">No events found.</div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center py-4">
        <Pagination
          current={currentPage}
          total={filteredItems.length}
          pageSize={4}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
};

export default EventItems;
