 import React from "react";
 import { FaAngleLeft } from "react-icons/fa";
 
 const UserRequestDetails = () => {
   return (
     <div>
       <h1 className="text-2xl flex items-center mt-5">
         <FaAngleLeft /> User Details
       </h1>
 
       <div className="my-10 w-full md:w-2/4 mx-auto">
         {/* User Profile Section */}
         <div className="flex items-center gap-5 mb-5">
           <img
             className="w-24 h-24 rounded-full"
             src="../../../public/logo/userimage.png"
             alt="User"
           />
           <h1 className="text-2xl font-semibold">Md. Nerob</h1>
         </div>
 
         {/* User Details Section */}
         <div className="space-y-3">
           <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
             <span className="font-semibold">Name</span>
             <span>Alax Deo</span>
           </div>
           <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
             <span className="font-semibold">Email</span>
             <span>demo@gmail.com</span>
           </div>
           <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
             <span className="font-semibold">City</span>
             <span>Anchorage</span>
           </div>
           <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
             <span className="font-semibold">State</span>
             <span>Alaska</span>
           </div>
           <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
             <span className="font-semibold">Country</span>
             <span>USA</span>
           </div>
           <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
             <span className="font-semibold">Club Name</span>
             <span>Over 21</span>
           </div>
           <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
             <span className="font-semibold">Club Handicap</span>
             <span>15</span>
           </div>
           <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
             <span className="font-semibold">User Type</span>
             <span>User</span>
           </div>
           <div className="flex items-center justify-between py-3 border-b-2 border-[#00000042]">
             <span className="font-semibold">Joining Date</span>
             <span>16 Dec 2024</span>
           </div>
         </div>
 
         <div className="flex items-center justify-end mt-5	">
             <button className="py-2 px-10 bg-[#e74c3c] text-white rounded-lg">Cancel</button>
             <button className="py-2 px-10 ml-3 bg-[#62d49f] text-white rounded-lg">Approved</button>
         </div>
       </div>
     </div>
   );
 };
 
 export default UserRequestDetails;
 