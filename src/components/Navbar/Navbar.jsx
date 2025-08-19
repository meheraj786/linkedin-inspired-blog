import React, { useState } from "react";
import Container from "../../layouts/Container";
import Flex from "../../layouts/Flex";
import LogoLarge from "../../layouts/LogoLarge";
import { IoRocketSharp } from "react-icons/io5";
import { TbUsers } from "react-icons/tb";
import { MdSlowMotionVideo } from "react-icons/md";
import { PiBagSimpleFill } from "react-icons/pi";
import { LuPuzzle } from "react-icons/lu";
import { FaLaptop } from "react-icons/fa";
import LogoSmall from "../../layouts/LogoSmall";

import { ChevronDown, Crown, Search } from 'lucide-react';

const Navbar = () => {
  
  const [isOpen, setIsOpen] = useState(false);
   const [searchText, setSearchText] = useState('');
  return (
    <div>
      <Container>
        <Flex className="font-primary relative  text-[12px]">
          {/* <LogoLarge /> */}
          <Flex className="justify-start gap-x-1">
          <LogoSmall />
                <div 
        className="bg-white border border-gray-400 w-[289px] rounded-full h-[34px]  flex items-center px-3 py-2"
      >
        <Search className="w-4 h-4 text-gray-800 mr-2 flex-shrink-0" />
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
          className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-500 bg-transparent"
        />
      </div>

          </Flex>
          <Flex className="gap-x-8  items-baseline text-gray">
            <div className="hover:text-black cursor-pointer">
              <IoRocketSharp className="mx-auto text-[24px]" />
              <span className="text-[12px]">Top Content</span>
            </div>
            <div className="hover:text-black cursor-pointer">
              <TbUsers className="mx-auto  text-[24px]" />
              <span className="text-[12px]">People</span>
            </div>
            <div className="hover:text-black cursor-pointer">
              <MdSlowMotionVideo className="mx-auto  text-[24px]" />
              <span className="text-[12px]">Learning</span>
            </div>
            <div className="hover:text-black cursor-pointer">
              <PiBagSimpleFill className="mx-auto  text-[24px]" />
              <span className="text-[12px]">Jobs</span>
            </div>
            <div className="hover:text-black cursor-pointer">
              <LuPuzzle className="mx-auto  text-[24px]" />
              <span className="text-[12px]">Games</span>
            </div>
            <div className="hover:text-black cursor-pointer">
              <FaLaptop className="mx-auto  text-[24px]" />
              <span className="text-[12px]">Get the app</span>
            </div>
            <button className="p-2">Join now</button>
            {/* {
              data
            } */}
            <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-center justify-center space-x-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <img 
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
          alt="Profile"
          className="w-6 h-6 rounded-full object-cover"
        />
        <span className="text-sm flex items-center font-medium text-gray-700">Me <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} /></span>
        
      </button>
            <button className="p-2 px-4 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 border rounded-full border-primary text-primary">
              Sign in
            </button>
          </Flex>
                        {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[264px] bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* Profile Section */}
          <div className="p-2 border-b border-gray-100">
            <div className="flex items-start space-x-3">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
                  alt="Mehraj H."
                  className="w-[56px] h-[56px] rounded-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-[16px]">Mehraj H.</h3>
                <p className="text-[14px]  mt-1 leading-relaxed">
                  I am a tech enthusiast from the Milky Way Galaxy, within the Orion Arm, orbiting the 
                  Sol (Sun) star, living on the third orbital planet named Earth, in the continent of 
                  Asia, in the country of Bangladesh.
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-2 mt-4">
              <button className="flex-1 py-[2px] px-3 text-sm font-medium text-blue-600 border border-primary rounded-full hover:bg-blue-50 transition-colors">
                View Profile
              </button>
              <button className="flex-1 py-[2px] px-3 text-sm font-medium text-white bg-primary rounded-full hover:bg-blue-700 transition-colors">
                Verify
              </button>
            </div>
          </div>

          {/* Account Section */}
          <div className="py-2">
            <div className="px-4 py-2">
              <h4 className="text-sm font-semibold text-gray-900">Account</h4>
            </div>


            {/* Menu Items */}
            <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <span className="text-sm text-gray-700">Settings & Privacy</span>
            </div>
            
            <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <span className="text-sm text-gray-700">Help</span>
            </div>
            
            <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <span className="text-sm text-gray-700">Language</span>
            </div>
          </div>

          {/* Manage Section */}
          <div className="py-2 border-t border-gray-100">
            <div className="px-4 py-2">
              <h4 className="text-sm font-semibold text-gray-900">Manage</h4>
            </div>
            
            <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <span className="text-sm text-gray-700">Posts & Activity</span>
            </div>
            
            <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <span className="text-sm text-gray-700">Job Posting Account</span>
            </div>
          </div>

          {/* Sign Out */}
          <div className="py-2 border-t border-gray-100">
            <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <span className="text-sm text-gray-700">Sign Out</span>
            </div>
          </div>
        </div>
      )}
        </Flex>

      </Container>
    </div>
  );
};

export default Navbar;



