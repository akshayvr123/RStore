import React, { useState } from 'react';
import './Navbar.css'
import SearchForm from './Search';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const navigate=useNavigate()
  let user= JSON.parse(localStorage.getItem('user'));


  return (
    <nav className=" border-gray-200 dark:bg-gray-900">
      <div className=" max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* <img  src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/grocery-store-logo-design-template-26efc5e6e40131b8138308aed1bb075b_screen.jpg?ts=1599902810" className="h-8 rounded-lg" alt="Flowbite Logo" /> */}
          <span className="flowbite-text self-center text-black  font-semibold whitespace-nowrap dark:text-white">RStore</span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className=" inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
          onClick={toggleNavbar}
        >
          <span className="sr-only ">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      
     
        <div className={` w-full md:block md:w-auto ${isOpen ? 'block ' : 'hidden'}`} id="navbar-default">
          <ul className="flowbite-menu font-medium flex flex-col p-4 md:p-0  rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          
            <li onClick={()=>navigate('/')}>
              <a  className="block py-2 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</a>
            </li>
            <li onClick={()=>navigate('/cart')}>
              <a  className="block py-2 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">MyCart</a>
            </li>
            <li onClick={()=>navigate('/myorder')}>
              <a  className="block py-2 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Orders</a>
            </li>
        {   user.type==='admin'? <li onClick={()=>navigate('/admin')}>
              <a  className="block py-2 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Admin</a>
            </li>:
            <li>
            <a  className="block py-2 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Account</a>
          </li>}
          <li onClick={()=>localStorage.removeItem('user')}>
            <a  className="block py-2 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">LogOut</a>
          </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
