import { useContext, createContext, useState, useEffect } from "react";
import { userQuery } from "../utils/data";
import { client } from "../client";
import { useLocation, useNavigate } from "react-router-dom";
const AuthContext = createContext({
    user:{},
    setUser:()=>{}
});

const AuthContextProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation(); 
    useEffect(()=>{
        const user = localStorage.getItem("user")!==undefined?JSON.parse(localStorage.getItem("user")):null;
        setUser(user);

        const query = userQuery(user?.sub);
        client.fetch(query).then((data)=>{
            setUser(data[0]);
        })

    }, [location.pathname, navigate])

    return(
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;

export const useAuthContext = ()=>{
    return useContext(AuthContext);
}