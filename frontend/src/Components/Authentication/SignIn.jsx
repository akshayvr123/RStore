import axios from 'axios';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { loginsuccess} from '../ToastStatus/ToastStatus'; 


const SignIn = () => {
    const [admin, setAdmin] = useState(false);
    const [secret,setSecret]=useState('')
    const [email,setEmail]=useState('')
    const [password,setpassword]=useState('')
    const green = "focus:outline-none text-white bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800";
    const light = "ml-[-9px] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700";
    const {setUser}=useContext(UserContext)
    const navigate=useNavigate()
    const BASE_URL=import.meta.env.VITE_BACKEND_BASE_URL
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const {data}=await axios.post(`${BASE_URL}/api/user/login`,{
                key:secret,
                type:admin ? 'admin':'user',
                email:email,
                password:password
            })
            setUser(data)
            console.log(data);
            localStorage.setItem('user', JSON.stringify(data));
            loginsuccess()
            if(data.type==='admin'){
                navigate('/admin')
            }else{

                navigate('/')
            }
        } catch (error) {
            console.log(error);
           alert(error?.response?.data?.error) 
        }
      
    }
    return (
        <section 
            className="dark:bg-gray-900 h-max" 
            style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/healthy-food-background-healthy-vegan-vegetarian-food_876282-1433.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className='pt-5 ml-5 flex flex-cols items-start justify-start'>
                <button onClick={() => setAdmin(false)} type="button" className={`${admin ? light : green} `}>User</button>
                <button onClick={() => setAdmin(true)} type="button" className={`${admin ? green : light} `}>Admin</button>
            </div>
            <div className="flex flex-col items-center mt-6 px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white ">
                    <img className="w-6 h-6 mr-2 rounded-lg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuVFdP5IFkSzubt25r2HW-utcqJ0paxcEONWwH-CzSrQ&s" alt="logo" />
                    RStore
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign In to your account
                        </h1>
                        <form onSubmit={(e)=>handleSubmit(e)} className="space-y-4 md:space-y-6" action="#">
                            {
                                admin &&     <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Secret key</label>
                                <input 
                                    onChange={(e)=>setSecret(e.target.value)}
                                    type="text" 
                                    name="text" 
                                    id="text" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="enter admin secret key" 
                                    required 
                                />
                            </div>
                            }
                        
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input 
                                    onChange={(e)=>setEmail(e.target.value)}
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="name@company.com" 
                                    required 
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input 
                                    onChange={(e)=>setpassword(e.target.value)}
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    placeholder="••••••••" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    required 
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input 
                                            id="remember" 
                                            aria-describedby="remember" 
                                            type="checkbox" 
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" 
                                            required 
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <button 
                                type="submit" 
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Sign In
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don't have an account yet? <a onClick={()=>navigate('/signup')} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignIn;
