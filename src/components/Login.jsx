import React, { useState } from 'react'
import {  useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import {FcGoogle} from 'react-icons/fc'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import axios from 'axios';
import { client } from '../client'

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
          setLoading(true);
          const userInfo = await axios.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } },
          );
          

          const {name, sub, picture }= userInfo.data;
          localStorage.setItem('user', JSON.stringify(userInfo.data));
          const doc = {
            _id:sub,
            _type:'user',
            userName:name,
            image:picture
          }// sanity document
          client.createIfNotExists(doc).then(()=>{
            setLoading(false);
            navigate("/", {replace:true});// no back button
          });
        },
      });

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video src={shareVideo}
        type='video/mp4'
        loop
        controls={false}
        muted
        autoPlay
        className='w-full h-full object-cover'
        />
        <div className='absolute flex flex-col top-0 right-0 justify-center items-center left-0 bottom-0 bg-blackOverlay w-full h-full'>
            <div className='p-5'>
                <img src={logo} alt="logo" width="130px" />
            </div>
            <div className='shadow-2xl'>
                    <button 
                    disabled={loading}
                    className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
                    onClick={()=>login()}
                    ><FcGoogle/> Sign in with Google</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login
