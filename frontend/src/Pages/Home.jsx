import React, { useContext } from 'react'
import { UserContext } from '../Contexts/UserContext';
import Navbar from '../Components/Navbar/Navbar'
import SearchForm from '../Components/Navbar/Search';
import Corousal from '../Components/Carousal/Corousal';
import CategoryCard from '../Components/Category/CategoryCard'
import Popular from '../Components/Popular Choice/Popular';
const Home = () => {
  const {user}=useContext(UserContext)
  console.log(user);
  return (
    <div>
      <Navbar/>
      <SearchForm/>
      <Popular/>
      <CategoryCard/>
      <Corousal/>
    </div>
  )
}

export default Home
