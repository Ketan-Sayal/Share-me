import React, {useState} from 'react'
import { Navbar, CreatePin, Feed, PinDetail, Search, UserProfile } from '../components'
import { Route, Routes } from 'react-router-dom';

function Pins() {
  const [searchTerm, setSearchTerm]=useState("");
  return (
    <div className='px-2 md:px-5'>
      <div className='bg-gray-50'>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </div>
      <div className='h-full'>
        <Routes>
          <Route path='/' element={<Feed/>}/>
          <Route path='/category/:categoryId' element={<Feed/>}/>
          <Route path='/pin-detail/:pinId' element={<PinDetail/>}/>
          <Route path='/pin-detail/:pinId/user-profile/:userId' element={<UserProfile/>}/>
          <Route path='/category/:categoryId/user-profile/:userId' element={<UserProfile/>}/>
          <Route path='/create-pin' element={<CreatePin/>}/>
          <Route path='/search' element={<Search searchTerm={searchTerm}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default Pins
