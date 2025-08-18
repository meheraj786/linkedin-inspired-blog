import React, { useEffect, useState } from "react";
import Container from "../layouts/Container";
import Flex from "../layouts/Flex";
import LogoLarge from "../layouts/LogoLarge";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { getDatabase, ref, set } from "firebase/database";
import Aos from "aos";
import "aos/dist/aos.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();
  const db = getDatabase();
    useEffect(() => {
    Aos.init();
  }, []);

  const submitHandler = () => {
    if (!name) {
      setNameErr("Please enter your Name.")
    }
    if (!email) {
      setEmailErr("Please enter a valid email address.")
    }
    if (!password) {
      setPasswordErr("Please enter your password.")
    }
    if (name && email && password) {
          createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        toast.success("Signup Successfull");
        sendEmailVerification(auth.currentUser);
        updateProfile(auth.currentUser, {
          displayName: name,
        });
        set(ref(db, "users/" + userCredential.user.uid), {
          username: name,
          email: email,
          bio: "",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        toast.error("Something Went Wrong");
      });
    }

  };
  return (
    <div className="bg-bg font-primary w-full h-[100vh]">
      <Toaster position="top-right" />
      <Container>
        <Flex>
          <LogoLarge />
        </Flex>
        <h2 data-aos="fade-down" className="text-[32px] text-[#000000e6] my-6 text-center text-medium">
          Make the most of your professional life
        </h2>
        <div data-aos="fade-up" className="bg-white p-[24px] mx-auto rounded-lg w-[400px]">
          <div className="mb-[16px]">
            <label className="font-medium text-[14px]" htmlFor="">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameErr("");
              }}
              className={`border px-4 py-2 text-[16px] mt-1 border-black w-full rounded-sm outline-none ${nameErr && "border-red-500"}`}
              type="text"
            />
              <p className="text-red-500 mt-2 text-[12px]">
                {nameErr}
              </p>
          </div>

          <div className="mb-[16px]">
            <label className="font-medium text-[14px]" htmlFor="">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailErr("");
              }}
              className={`border ${emailErr && "border-red-500"} px-4 py-2 mt-1 border-black w-full outline-none rounded-sm`}
              type="text"
            />
              <p className="text-red-500 mt-2 text-[12px]">
            {emailErr}
                
              </p>
           
          </div>

          <div className="mb-[16px]">
            <label className="font-medium text-[14px]" htmlFor="">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordErr("");
              }}
              className={`border ${passwordErr && "border-red-500"} px-4 py-2 mt-1 border-black w-full outline-none rounded-sm`}
              type="text"
            />
              <p className="text-red-500 mt-2 text-[12px]">
                {passwordErr}
              </p>
          </div>
          <p className="text-gray text-center mb-4 text-[12px]">
            By clicking Agree & Join or Continue, you agree to the LinkedIn <span className="text-primary">User Agreement</span>, <span className="text-primary">Privacy Policy</span>, and <span className="text-primary">Cookie Policy</span>.
          </p>
          <button
            onClick={submitHandler}
            className="py-3 px-6 hover:bg-[#006097] transition-colors duration-250 cursor-pointer rounded-full font-semibold text-white w-full bg-primary"
          >
            Agree & Join
          </button>
          <p className="mt-10 text-[16px] text-[#000000e6] text-center">
            Already on LinkedIn?{" "}
            <Link className="text-primary" to="/login">
              Sign in
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Signup;
