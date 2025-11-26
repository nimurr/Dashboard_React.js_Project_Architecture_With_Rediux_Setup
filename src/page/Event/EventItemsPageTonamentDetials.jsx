
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import eventImage from "../../assets/auth/Rectangle.png";

const EventItemsPageTonamentDetials = () => {
    return (
        <section className="pb-5">
            <div className="flex justify-between items-center p-5 md:mr-36">
                <Link to={"/allevent"}>
                    <h1 className="text-xl font-semibold flex items-center"><FaAngleLeft /> Tournament details</h1>
                </Link>

            </div>

            <div className="">
                {/*  image section  */}
                <img
                    src={eventImage}
                    alt="eventImage"
                    className="w-full md:h-[428px] h-[228px] mt-8  rounded-[16px] mx-auto"
                />

            </div>


            <div className="flex items-center justify-between gap-5 my-20">
                <h2 className="text-2xl font-semibold">Tournament details</h2>
                <div className="flex items-center gap-5">
                    <button className="py-2 px-10 bg-[#f1bd19] rounded ">Approved</button>
                    <Link to={`/allevent/edit/1`} className="border py-2 px-10 border-[#f1bd19] rounded ">Edit Tournament</Link>
                    <button className="border py-2 px-10 border-[#f1bd19] rounded ">Reject</button>
                </div>
            </div>

            <div className="mb-10">
                {/* First Section */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-3">Tournament Name</h2>
                        <span>Bashar Islam</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-3">Tournament Type</h2>
                        <span>Skins</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-3">City</h2>
                        <span>Dhaka, Bangladesh</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-3">Date</h2>
                        <span>2024-05-16</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-3">Start Time</h2>
                        <span>12:00 AM</span>
                    </div>
                </div>

                <hr className="h-[2px] my-5 border-none bg-[#f1bd19]" />

                {/* Second Section */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-3">Course Name</h2>
                        <span>Sun Valley Golf Course</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-3">Course Rating</h2>
                        <span>72.9</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-3">Slope Rating</h2>
                        <span>138</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-3">Select Number of Player</h2>
                        <span>2/15</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-3">Length</h2>
                        <span>60</span>
                    </div>
                </div>
            </div>



        </section>
    );
};

export default EventItemsPageTonamentDetials;