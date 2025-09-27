import React, { useContext, useState } from 'react'
import { AdminContext } from '../Context/AdminContext';
import axios from 'axios'
import toast from 'react-hot-toast';
import { MentorContext } from '../Context/MentorContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  const {setAToken,backendUrl} = useContext(AdminContext);
  const {setMToken} = useContext(MentorContext); 

 const onSubmitHandler = async(event) => {
  event.preventDefault();

  try {
    if (state === "Admin") {
      const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });

      if (data.success) {
        localStorage.setItem('aToken', data.token);
        setAToken(data.token);
        toast.success("Login successful!");
        navigate('/admin-dashboard')
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } else {
       const {data} = await axios.post(backendUrl + "/api/course/login",{email,password});
       if(data.success) {
        localStorage.setItem('mToken',data.token)
        setMToken(data.token)
        navigate('/mentor-dashboard')
        console.log(data.token)
       } else{
        toast.error(data.message)
       }
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};


  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5e5e5e] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'>
          <span className='text-blue-500'>{state}</span> Login
        </p>

        {/* Email input */}
        <div className='w-full'>
          <p>Email</p>
          <input onChange={(e)=>setEmail(e.target.value)} value={email}
            className='border border-[#dadada] rounded w-full p-2 mt-1'
            type="text"
            placeholder='admin25@gmail.com'
            required
          />
        </div>

        {/* Password input */}
        <div className='w-full'>
          <p>Password</p>
          <input onChange={(e)=>setPassword(e.target.value)} value={password}
            className='border border-[#dadada] rounded w-full p-2 mt-1'
            type="password"
            placeholder='admin123'
            required
          />
        </div>

        {/* Login button */}
        <button className='bg-blue-500 text-white w-full py-2 rounded-md text-base cursor-pointer'>
          Login
        </button>

        {
          state === "Admin"
            ? <p>
                Mentor Login ?{" "}
                <span
                  className='text-blue-500 cursor-pointer underline'
                  onClick={() => setState('Doctor')}
                >
                  Click Here
                </span>
              </p>
            : <p>
                Admin Login ?{" "}
                <span
                  className='text-blue-500 cursor-pointer underline'
                  onClick={() => setState('Admin')}
                >
                  Click Here
                </span>
              </p>
        }
      </div>
    </form>
  );
};

export default Login;
