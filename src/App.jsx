import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"

function App() {

  const navigate = useNavigate();
  useEffect(()=>{
    const user = localStorage.getItem("user");
    if(!user){
      navigate('/login');
    }
    console.log("App useEffect", user);
    
  }, [])
  
  return (
    <>
      <Outlet/>
    </>
  )
}

export default App
