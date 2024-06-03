// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// const Protected = ({children}) => {
//     const navigate=useNavigate()
//    let login =false
//   return login? <>{children}</> :navigate('/login')
// }

// export default Protected

import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { UserContext } from '../Contexts/UserContext'

const Protected = ({children}) => {
    let user= JSON.parse(localStorage.getItem('user'));
    return user ?<>{children}</>  : <Navigate to="/login"/>     
    
}

export default Protected