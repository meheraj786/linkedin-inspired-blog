import React from "react";
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

const Navbar = () => {
  return (
    <div>
      <Container>
        <Flex className="font-primary py-[6px] text-[12px]">
          {/* <LogoLarge /> */}
          <LogoSmall />
          <Flex className="gap-x-8  items-baseline text-gray">
            <div className="hover:text-black cursor-pointer">
              <IoRocketSharp className="mx-auto mb-1 text-[24px]" />
              <span>Top Content</span>
            </div>
            <div className="hover:text-black cursor-pointer">
              <TbUsers className="mx-auto mb-1 text-[24px]" />
              <span>People</span>
            </div>
            <div className="hover:text-black cursor-pointer">
              <MdSlowMotionVideo className="mx-auto mb-1 text-[24px]" />
              <span>Learning</span>
            </div>
            <div className="hover:text-black cursor-pointer">
              <PiBagSimpleFill className="mx-auto mb-1 text-[24px]" />
              <span>Jobs</span>
            </div>
            <div className="hover:text-black cursor-pointer">
              <LuPuzzle className="mx-auto mb-1 text-[24px]" />
              <span>Games</span>
            </div>
            <div className="hover:text-black cursor-pointer">
              <FaLaptop className="mx-auto mb-1 text-[24px]" />
              <span>Get the app</span>
            </div>
            <button className="p-3">Join now</button>
            <button className="p-3 px-5 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 border rounded-full border-primary text-primary">
              Sign in
            </button>
          </Flex>
        </Flex>
      </Container>
    </div>
  );
};

export default Navbar;
