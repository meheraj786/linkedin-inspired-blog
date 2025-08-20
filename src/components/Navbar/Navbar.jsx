import React, { useState } from "react";
import Container from "../../layouts/Container";
import Flex from "../../layouts/Flex";
import LogoLarge from "../../layouts/LogoLarge";
import { IoNotificationsSharp, IoRocketSharp } from "react-icons/io5";
import { TbUsers } from "react-icons/tb";
import { MdSlowMotionVideo } from "react-icons/md";
import { PiBagSimpleFill } from "react-icons/pi";
import { LuMessageSquareMore, LuPuzzle } from "react-icons/lu";
import { FaLaptop } from "react-icons/fa";
import LogoSmall from "../../layouts/LogoSmall";

import { ChevronDown, Crown, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { AiFillHome } from "react-icons/ai";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const user = useSelector((state) => state.userInfo.value);

  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  return (
    <div>
      <Container>
        <Flex className="font-primary relative  text-[12px]">
          {user ? (
            <Flex className="justify-start gap-x-1">
              <LogoSmall />
              <div className="bg-white border border-gray-400 w-[289px] rounded-full h-[34px]  flex items-center px-3 py-2">
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
          ) : (
            <div className="pt-3">
              <LogoLarge />
            </div>
          )}

          {user ? (
            <Flex className="gap-x-8  items-baseline text-gray">
              <NavLink to="/">
              <div className="hover:text-black cursor-pointer">
                <AiFillHome className="mx-auto text-[24px]" />
                <span className="text-[12px]">Home</span>
              </div>

              </NavLink>
              <div className="hover:text-black cursor-pointer">
                <TbUsers className="mx-auto  text-[24px]" />
                <span className="text-[12px]">My Network</span>
              </div>
              <div className="hover:text-black cursor-pointer">
                <PiBagSimpleFill className="mx-auto  text-[24px]" />
                <span className="text-[12px]">Jobs</span>
              </div>
              <div className="hover:text-black cursor-pointer">
                <LuMessageSquareMore className="mx-auto  text-[24px]" />
                <span className="text-[12px]">Message</span>
              </div>
              <div className="hover:text-black cursor-pointer">
                <IoNotificationsSharp className="mx-auto  text-[24px]" />
                <span className="text-[12px]">Notification</span>
              </div>
              {/* {
              data
            } */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex flex-col items-center justify-center space-x-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-6 h-6 bg-bg rounded-full flex justify-center items-center">
                {user?.photoURL ? <img src={user?.PhotoURL} className="w-full h-full object-center object-cover" alt="" /> : <span>{user?.displayName?.charAt(0).toUpperCase()}</span> }

                </div>
                <span className="text-sm flex items-center font-medium text-gray-700">
                  Me{" "}
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </button>
            </Flex>
          ) : (
            <Flex className="gap-x-8 pt-5 items-baseline text-gray">
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
              <button className="p-3 px-6 hover:bg-gray">Join now</button>
              {/* {
              data
            } */}
              <button className="p-3 px-6 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 border rounded-full border-primary text-primary">
                Sign in
              </button>
            </Flex>
          )}

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 font-primary top-full mt-2 w-[264px] bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              {/* Profile Section */}
              <div className="p-2 border-b border-gray-100">
                <div className="flex items-start space-x-3">
                  <div className="relative w-[56px] text-[30px] flex border border-bg justify-center items-center h-[56px] rounded-full">
                    {user?.photoURL ? (
                      <img
                        src={user?.photoURL}
                        className="w-full h-full object-center object-cover"
                        alt=""
                      />
                    ) : (
                      <span>{user?.displayName?.charAt(0).toUpperCase()}</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-[16px]">
                      {user?.displayName}
                    </h3>
                    <p className="text-[14px]  mt-1 leading-relaxed">
                      {user?.bio}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 mt-4">
                  <Link to="/profile">
                  <button className="flex-1 py-[2px] px-3 text-sm font-medium text-blue-600 border border-primary rounded-full hover:bg-blue-50 transition-colors">
                    View Profile
                  </button>
                  </Link>
                  <button className="flex-1 py-[2px] px-3 text-sm font-medium text-white bg-primary rounded-full hover:bg-blue-700 transition-colors">
                    Verify
                  </button>
                </div>
              </div>

              {/* Account Section */}
              <div className="py-2">
                <div className="px-4 py-2">
                  <h4 className="text-sm font-semibold text-gray-900">
                    Account
                  </h4>
                </div>

                {/* Menu Items */}
                <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                  <span className="text-sm text-gray-700">
                    Settings & Privacy
                  </span>
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
                  <h4 className="text-sm font-semibold text-gray-900">
                    Manage
                  </h4>
                </div>

                <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                  <span className="text-sm text-gray-700">
                    Posts & Activity
                  </span>
                </div>

                <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                  <span className="text-sm text-gray-700">
                    Job Posting Account
                  </span>
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
