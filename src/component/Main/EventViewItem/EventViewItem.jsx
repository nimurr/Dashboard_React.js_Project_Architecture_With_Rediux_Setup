
import { FaAngleLeft } from "react-icons/fa";
import {Link } from "react-router-dom";
import eventImage from "../../../assets/auth/Rectangle.png"; 

const EventViewItem = () => {
 return (
      <section className="pb-5">
      <div className="flex justify-between items-center p-5 md:mr-36">
          <Link to={"/allevent"}>
           <h1 className="text-xl font-semibold flex items-center"><FaAngleLeft /> Tournament details</h1>
          </Link>
         
      </div>

      <div className="mx-auto">
         {/*  image section  */}
         <img
            src={eventImage}
            alt="eventImage"
            className="w-full md:h-[428px] h-[228px] mt-8  rounded-[16px] mx-auto"
         />

      </div>
   </section>
 );
}; 

export default EventViewItem;