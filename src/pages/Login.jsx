import React, { useEffect, useState } from 'react'
import Container from '../layouts/Container'
import Flex from '../layouts/Flex'
import LogoLarge from '../layouts/LogoLarge'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/userInfoSlice';
import Aos from "aos";
import "aos/dist/aos.css";


const Login = () => {
  const [name, setName]= useState("")
  const [nameErr, setNameErr]= useState("")
  const [email, setEmail]= useState("")
  const [emailErr, setEmailErr]= useState("")
  const [password, setPassword]= useState("")
  const [passwordErr, setPasswordErr]= useState("")
  const auth = getAuth();
  const navigate=useNavigate()
  const dispatch= useDispatch()
    useEffect(() => {
    Aos.init();
  }, []);

  const submitHandler=()=>{
    if (!email) {
      setEmailErr("Please enter a valid email address.")
    }
    if (!password) {
      setPasswordErr("Please enter your password.")
    }
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log(userCredential.user);
    toast.success("Login Successfull")
    dispatch(setUser(userCredential.user))
    setTimeout(() => {
      navigate("/feed")
    }, 1500);
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
    
  });
    
  }
  return (
    <div className='bg-bg font-primary w-full h-[100vh]'>
      <Toaster position='top-right'/>
      <Container>
    <Flex><LogoLarge/></Flex>
    <div data-aos="fade-up" className='bg-white p-[24px] mx-auto rounded-lg w-[40%]'>
      <h2  className='text-[32px] font-medium'>Sign in</h2>
      <div  className='mb-[16px]'>
      <label className='font-medium' htmlFor="">Email</label>
      <input value={email} onChange={(e)=>{
        setEmail(e.target.value)
        setEmailErr("")
      }} className={`border ${emailErr && "border-red-500"} outline-none p-3 mt-1 border-black w-full rounded-sm`} type="text" />
      
        <p className='text-red-500 mt-2 text-[12px]'>{emailErr}</p>
      
      </div>
            
      <div className='mb-[16px]'>
      <label className='font-medium' htmlFor="">Password</label>
      <input value={password} onChange={(e)=>{
        setPassword(e.target.value)
        setPasswordErr("")
      }} className={`border p-3 mt-1 border-black w-full ${passwordErr && "border-red-500"} outline-none rounded-sm`} type="text" />
      <p className='text-red-500 mt-2 text-[12px]'>{passwordErr}</p>
      
      </div>
      <Link className='text-primary hover:bg-blue-100 transition-colors duration-350 p-1 rounded-full'>Forgot Passowrd?</Link>
      <button onClick={submitHandler} className='py-3 mt-5 px-6 hover:bg-[#006097] transition-colors duration-250 cursor-pointer rounded-full font-semibold text-white w-full bg-primary'>Sign in</button>
    </div>
      </Container>
      <p className='text-center mt-10'>New to LinkedIn? <Link to="/signup" className='text-primary cursor-pointer'>Join now</Link></p>
    </div>
  )
}

export default Login