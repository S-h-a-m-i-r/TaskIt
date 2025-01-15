import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

const Signup = () => {
  const { register, handleSubmit,watch, formState: { errors }, clearErrors } = useForm<FormData>();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  interface FormData {
    email: string;
    password: string;
    confirm_password: string;
  }

  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  const password = watch('password');
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[388px] text-left text-black py-5 flex flex-col gap-5 rounded-lg w-full font-sans">
       <div className="space-y-2 text-[32px] font-bold">
        <h2>Create an account</h2>
      </div>
      <div className="space-y-2 text-[16px] font-normal mb-1">
        <p>Create now your account for free. And start using TaskIt Today.</p>
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
    className={`w-full bg-white rounded-md border p-2 bg-transparent h-11 ${errors.email ? 'text-red-500' : ''}`}
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
          className={`w-full bg-white rounded-md border p-2 bg-transparent h-11 ${errors.password ? 'text-red-500' : ''}`}
          placeholder="At least 8 characters"
          {...register('password', {
            required: 'Password is required',
            pattern: {
              value: /^(?=.*[A-Z]).{8,}$/,
              message: 'Password must be at least 8 characters long and contain at least one uppercase letter'
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


<div className="space-y-2 relative">
  <label htmlFor="password" className='block text-sm font-bold'>
    Confirm Password
  </label>
  <input
          id="confirm_password"
          type={showPassword ? "text" : "password"}
          className={`w-full bg-white rounded-md border p-2 bg-transparent h-11 ${errors.confirm_password ? 'text-red-500' : ''}`}
          placeholder="Confirm your password"
          {...register('confirm_password', {
            required: 'Please confirm your password',
            validate: value => value === password || 'Passwords do not match',
            onChange: () => clearErrors('confirm_password')
          })}
        />
  <div
    className="absolute top-8 right-0 pr-3 flex items-center cursor-pointer"
    onClick={togglePasswordVisibility}
  >
    {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
  </div>
  {errors.confirm_password?.message && typeof errors.confirm_password.message === 'string' && (
          <span className="text-red-500 text-sm">{errors.confirm_password.message}</span>
        )}
</div>
      <button
        type="submit"
        className="w-full bg-primary-100 text-white py-2 px-4 mt rounded-md hover:bg-primary-200"
      >
        Sign Up
      </button>
    </form>
  );
};

export default Signup;