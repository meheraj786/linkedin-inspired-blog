import React, { useEffect } from "react";
import Container from "../layouts/Container";
import Flex from "../layouts/Flex";
import bannerImg from "../assets/bannerImg.svg";
import { BsGoogle } from "react-icons/bs";
import { Link } from "react-router";
import Aos from "aos";
import "aos/dist/aos.css";

const Welcome = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className="pt-[48px]  pb-[140px]">
      <Container>
        <Flex className="items-start">
          <div data-aos="fade-up" className="w-1/2">
            <h2 className="text-gray mb-[22px] text-[48px]">
              Welcome to your professional community
            </h2>
            <button className="w-[400px] flex gap-x-2 justify-center items-center text-white rounded-full py-2 bg-primary font-medium">
              {" "}
              <BsGoogle /> Continue with Google
            </button>
            <Link to="/login">
              <button className="w-[400px] cursor-pointer text-black rounded-full py-2 border font-medium mt-4 mb-6">
                {" "}
                Sign in with email
              </button>
            </Link>
            <p className="text-center mb-[33px] w-[400px] text-[10px] text-gray">
              By clicking Continue to join or sign in, you agree to LinkedIn’s
              User Agreement, Privacy Policy, and Cookie Policy.
            </p>
            <p className="text-center w-[400px]">
              New to LinkedIn?{" "}
              <Link className="text-primary font-medium" to="/signup">
                Join now
              </Link>
            </p>
          </div>
          <div data-aos="fade-up" className="w-1/2 relative h-full">
            <img
              className="w-[700px] h-[560px] absolute  top-0 -right-20"
              src={bannerImg}
              alt=""
            />
          </div>
        </Flex>
      </Container>
    </div>
  );
};

export default Welcome;
