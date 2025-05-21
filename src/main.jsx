import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './containers/Home.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import AuthContextProvider from './context/index.jsx'
import {UserProfile, Login} from './components'
import Pins from './containers/Pins.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<AuthContextProvider><App/></AuthContextProvider>}>
      <Route path='login' element={<Login/>}/>
      <Route path='/' element={<Home/>}>
        <Route index element={<Pins/>} /> 
        <Route path='/user-profile/:userId' element={<UserProfile/>}/>
        <Route path='/*' element={<Pins/>} />
      </Route>
    </Route>
  )
);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API_TOKEN}>
    
      <RouterProvider router={router}/>
    </GoogleOAuthProvider>
    
  </StrictMode>,
)
