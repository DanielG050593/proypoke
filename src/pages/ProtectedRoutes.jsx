import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes=()=>{


    const trainerName= useSelector(states=>states.trainerName)

    if(trainerName.length >=3){
        return <Outlet/>
    }else{
        return <Navigate to ='/'/>
    }
}

export default ProtectedRoutes