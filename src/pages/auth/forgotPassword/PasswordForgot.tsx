import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordIndex: React.FC = () => {
  const { register, handleSubmit, clearErrors, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = () => {
   navigate('/forgot-password/new-password');
  };

  return (
    <>
      <div>
        <h1 className='text-base md:text-2xl font-bold text-black w-full text-left'>Forgot your password?</h1>
        <p className='text-sm md:text-base text-gray-100 font-normal w-full text-left'>Enter Your Email to continue with new password</p>
      </div>  
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-normal"
            >
             Email
            </label>
            <input
    id="email"
    type="email"
    className={`w-full bg-white rounded-md border p-2 bg-transparent h-11 ${errors.email ? 'text-red-500' : 'border-gray-300 focus:border-transparent'}`}
    placeholder="Enter Email"
    {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
      onChange: () => clearErrors('email')
    })}
  />
  {errors.email && <span className="text-red-500 text-sm">enter valid email please!</span>}
          </div>
         <button type="submit" className="w-full bg-primary-100 text-white py-2 px-4 mt-5 rounded-full hover:bg-primary-200 max-md:absolute max-md:bottom-10 max-md:right-5 max-md:max-w-[328px]">
        Submit
      </button>
      </form>

    </>
  );
};

export default ForgotPasswordIndex;