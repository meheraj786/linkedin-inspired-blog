import React from "react";
import { FaRegNewspaper } from "react-icons/fa";
import { IoMdTv } from "react-icons/io";
import { MdGroups } from "react-icons/md";
import { PiBookmarkSimpleFill } from "react-icons/pi";

const ProfileInfoSidebar = () => {
  
  return (
    <div className="flex flex-col">
      <div className="bg-white w-[225px] rounded-[8px]">
        <div className="top">
          <div className="cover relative rounded-t-[8px] bg-blue-400 h-[58px] w-full">
            <div className="bg-green-500 left-[16px] -bottom-[44px] absolute w-[72px] h-[72px] rounded-full"></div>
          </div>
        </div>
        <div className="bottom px-[16px] pb-[16px] mt-[48px]">
          <h3 className="text-[20px] font-semibold">Meheraj Hosen</h3>
          <p className="text-[12px] line-clamp-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores
            ad corrupti distinctio saepe ab ut amet dignissimos explicabo ipsa
            labore.
          </p>
          <p className="text-[12px] mb-2 mt-1 text-gray">Dhaka</p>
          <p className="text-[12px] text-gray">Working At</p>
        </div>
      </div>
      <div className="bg-white p-4 mt-2 w-[225px] rounded-[8px]">
        <p className="text-[12px] mb-3">Profile Views</p>
        <p className="text-[12px]">View All Analytics</p>
      </div>
            <div className="bg-white p-4 mt-2 w-[225px] rounded-[8px]">
        <p className="text-[12px] flex items-center"> <PiBookmarkSimpleFill className="mr-2" /> Save Items</p>
        <p className="text-[12px] flex items-center my-4"> <MdGroups className="mr-2" />
Groups</p>
        <p className="text-[12px] flex items-center my-4"> <FaRegNewspaper className="mr-2" />
Newsletter</p>
        <p className="text-[12px] flex items-center"> <IoMdTv className="mr-2"/>
Events</p>
      </div>
    </div>
  );
};

export default ProfileInfoSidebar;
