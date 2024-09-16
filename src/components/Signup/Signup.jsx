import { Link } from 'react-router-dom';
import { Input } from '../index';
import { LoginImg } from '../../assets/index';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

function Signup() {
  const { register } = useForm();
  const [status, setStatus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(true);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row lg:justify-around p-4 xl:container xl:mx-auto xl:p-8 2xl:px-0">
      <div className="flex flex-col xl:w-1/2">
        <h1 className="font-bold text-xl text-center text-[#BB0100] mb-2 md:text-2xl lg:text-3xl xl:text-start">
          NeoSTORE
        </h1>
        <img
          src={LoginImg}
          alt="signup img"
          className="hidden lg:inline-block lg:pt-8 xl:py-20 xl:mx-auto"
        />
      </div>
      <div className="flex justify-center items-center xl:w-1/2">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="h-max bg-white flex flex-col justify-center rounded-2xl w-fit p-4 md:w-[350px] xl:w-96 xl:py-10 xl:px-8"
          style={{ boxShadow: '0px 0px 15px 2px #0000000F' }}
        >
          <h1 className="font-bold text-2xl text-[#E91B1A] text-center">
            SIGN UP
          </h1>
          <div className="pt-4 xl:pt-10">
            <Input
              className=" mt-2"
              label="New Account Register"
              placeholder="First Name"
              {...register('firstname', { required: true })}
            />
            <Input
              className=" mt-2"
              placeholder="Last Name"
              {...register('lastname')}
            />
            <Input
              className=" mt-2"
              placeholder="Email"
              {...register('email', { required: true })}
            />
            <Input
              className=" mt-2"
              type="password"
              placeholder="Password"
              {...register('password', { required: true })}
            />
            <div className="flex items-center pt-8">
              <input
                type="checkbox"
                className="h-4 w-4 accent-[#BB0100]"
                {...register('checkbox')}
              />
              <span className="font-normal text-sm text-[#706A6A] leading-none pl-2">
                I agree to the terms & conditions.
              </span>
            </div>
            <div className="text-center py-8">
              <button
                type="submit"
                onClick={status ? null : (e) => handleSubmit(e)}
                className="w-64 bg-[#BB0100] text-white py-2"
              >
                Continue
              </button>
            </div>
            {status && (
              <p className="font-bold text-[#E91B1A] text-center my-3">
                Hey user! sorry for the convenience you can't create a
                account...
              </p>
            )}
            <div className="text-center font-normal text-sm text-[#4F4F4F]">
              Already have an account?{' '}
              <Link to="/login" className="text-base underline">
                Log In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
