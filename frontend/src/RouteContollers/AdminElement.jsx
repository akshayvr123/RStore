import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Contexts/UserContext'

const AdminElement = ({children}) => {
    // const {user}=useContext(UserContext)
   let user= JSON.parse(localStorage.getItem('user'));
    
  return user?.type==='admin' ?<>{children}</>:<h1>Sorry You dont have access to this page</h1>
}

export default AdminElement
