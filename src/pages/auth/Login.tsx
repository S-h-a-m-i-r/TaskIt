import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import './custom-font.css'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors }, clearErrors } = useForm<FormData>();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  interface FormData {
    email: string;
    password: string;
    rememberMe?: boolean;
  }

  const onSubmit = () => {
    navigate('/');
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[388px] text-left text-black py-5 flex flex-col gap-5 rounded-lg w-full font-sans">
       <div className="space-y-2 text-[32px] font-bold">
        <h2>Welcome Back</h2>
      </div>
      <div className="space-y-2 text-[16px] font-normal mb-1">
        <p>Login in now and start using TaskIt</p>
      </div>
      <div className="space-y-2">
  <label
    htmlFor="email"
    className='block text-sm font-bold'
  >
    Email Address
  </label>
  <input
    id="email"
    type="email"
    className={`w-full bg-white rounded-md border p-2 bg-transparent h-11 ${errors.email ? 'text-red-500 focus:text-red-500' : 'text-gray-100 focus:border-transparent'}`}
    placeholder="Example@gmail.com"
    {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
      onChange: () => clearErrors('email')
    })}
  />
  {errors.email && <span className="text-red-500 text-sm">enter valid email please!</span>}
</div>
<div className="space-y-2 relative">
  <label htmlFor="password" className='block text-sm font-bold'>
    Password
  </label>
  <input
    id="password"
    type={showPassword ? "text" : "password"}
    className={`w-full bg-white rounded-md border p-2 bg-transparent h-11 ${errors.password ? 'text-red-500' : ''} asterisk-password`}
    placeholder="At least 8 characters"
    {...register('password', {
      required: 'Password is required',
      pattern: {
        value: /^(?=.*[A-Z]).{8,}$/,
        message: '*Incorrect password'
      },
      onChange: () => clearErrors('password')
    })}
  />
  <div
    className="absolute top-8 right-0 pr-3 flex items-center cursor-pointer"
    onClick={togglePasswordVisibility}
  >
    {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
  </div>
  {errors.password?.message && typeof errors.password.message === 'string' && (
    <span className="text-red-500 text-sm">{errors.password.message}</span>
  )}
</div>
      <div className='flex justify-end items-center'>
        <Link to="/forgot-password" className="text-gray-400 text-sm font-bold no-underline float-right">
          Forget password?
        </Link>
      </div>
      <button
        type="submit"
        className="w-full bg-primary-100 text-white py-2 px-4 mt rounded-full hover:bg-primary-200"
      >
        Sign in
      </button>
    </form>
  );
};

export default Login;