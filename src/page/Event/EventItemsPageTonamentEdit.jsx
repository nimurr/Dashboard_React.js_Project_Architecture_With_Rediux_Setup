import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import eventImage from "../../assets/auth/Rectangle.png";

const EventItemsPageTonamentEdit = () => {
    return (
        <section className="pb-5">
            <div className="flex justify-between items-center p-5 md:mr-36">
                <Link to={"/allevent"}>
                    <h1 className="text-xl font-semibold flex items-center"><FaAngleLeft /> Edit Tournament Details</h1>
                </Link>
            </div>

            <div className="">
                {/* Image section */}
                <img
                    src={eventImage}
                    alt="eventImage"
                    className="w-full md:h-[428px] h-[228px] mt-8 rounded-[16px] mx-auto"
                />
            </div>


            {/* Form Section */}
            <form className="bg-white p-8">



                <div className="flex items-center justify-between gap-5 my-10">
                    <h2 className="text-2xl font-semibold">Tournament Details</h2>
                    <div className="flex items-center gap-5">
                        <button className="py-2 px-10 bg-[#f1bd19] rounded">Re-Post</button>
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Tournament Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="tournamentName">
                            Tournament Name
                        </label>
                        <input
                            type="text"
                            id="tournamentName"
                            name="tournamentName"
                            placeholder="Enter Tournament Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Gaggle Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="gaggleName">
                            Enter Gaggle Name
                        </label>
                        <input
                            type="text"
                            id="gaggleName"
                            name="gaggleName"
                            placeholder="Enter Gaggle Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Tournament Type */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="tournamentType">
                            Tournament Type
                        </label>
                        <select
                            id="tournamentType"
                            name="tournamentType"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select Tournament Type</option>
                            <option value="Skins">Skins</option>
                            <option value="Stroke Play">Stroke Play</option>
                            <option value="Match Play">Match Play</option>
                        </select>
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="date">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* City */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="city">
                            City
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            placeholder="Enter City"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Number of Players */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="players">
                            Select Number of Players
                        </label>
                        <input
                            type="number"
                            id="players"
                            name="players"
                            placeholder="Enter Number of Players"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Course Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="courseName">
                            Course Name
                        </label>
                        <input
                            type="text"
                            id="courseName"
                            name="courseName"
                            placeholder="Enter Course Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Course Rating */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="courseRating">
                            Course Rating
                        </label>
                        <input
                            type="text"
                            id="courseRating"
                            name="courseRating"
                            placeholder="Enter Course Rating"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Slope Rating */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="slopeRating">
                            Slope Rating
                        </label>
                        <input
                            type="text"
                            id="slopeRating"
                            name="slopeRating"
                            placeholder="Enter Slope Rating"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* HPC From Range */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="hpcFrom">
                            HPC From Range
                        </label>
                        <input
                            type="number"
                            id="hpcFrom"
                            name="hpcFrom"
                            placeholder="Enter HPC From"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* HPC To Range */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="hpcTo">
                            HPC To Range
                        </label>
                        <input
                            type="number"
                            id="hpcTo"
                            name="hpcTo"
                            placeholder="Enter HPC To"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>


            </form>
        </section>
    );
};

export default EventItemsPageTonamentEdit;
