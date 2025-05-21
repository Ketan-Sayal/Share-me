import React, {useState, useEffect, useRef} from 'react'
import {HiMenu} from "react-icons/hi";
import {AiFillCloseCircle} from "react-icons/ai"
import { SideBar } from '../components';
import { Link, Outlet } from 'react-router-dom';
import logo from "../assets/logo.png"
import { useAuthContext } from '../context';

const Home = () => {
  const scrollRef = useRef(null);
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const {user} = useAuthContext();
  useEffect(()=>{
    scrollRef.current.scrollTo(0, 0);
  }, []);
  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
     <div className="hidden md:flex h-screen flex-initial">
        <SideBar closeToggle={setToggleSideBar}/>
     </div>
     <div className='flex md:hidden flex-row'>
      <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>

        <HiMenu fontSize={40} className='cursor-pointer' onClick={()=>setToggleSideBar(true)}/>
          <Link to="/">
            <img src={logo} alt="logo" className='w-28'/>
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className='w-28'/>
          </Link>
      </div>
     {toggleSideBar && (
      <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
        <div className='absolute flex justify-end p-2 w-full items-center'>
          <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={()=>{setToggleSideBar(false)}}/>
        </div>
        <SideBar closeToggle={setToggleSideBar}/>
      </div>
     )}
     </div>
     <div className='pb-2 flex-1 overflow-y-scroll h-screen' ref={scrollRef}>
        <Outlet/>
     </div>
    </div>
  )
}

export default Home
