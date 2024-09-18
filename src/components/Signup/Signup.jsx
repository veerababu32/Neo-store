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
    <div className="w-full flex flex-row p-4 mx-auto s:flex-col xs:flex-col sm:flex-col lg:justify-around xl:container xl:p-8 2xl:container 2xl:px-0">
      <div className="flex flex-col w-1/2 s:w-auto xs:w-auto sm:w-auto">
        <h1 className="font-bold text-xl text-center text-[#BB0100] mb-2 md:text-2xl md:text-start lg:text-3xl lg:text-start xl:text-3xl xl:text-start 2xl:text-3xl 2xl:text-start">
          NeoSTORE
        </h1>
        <img
          src={LoginImg}
          alt="signup img"
          className="mx-auto s:hidden xs:hidden sm:hidden lg:pt-8 xl:py-20 2xl:py-20"
        />
      </div>
      <div className="flex justify-center items-center w-1/2 s:w-auto xs:w-auto sm:w-auto">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="h-max bg-white flex flex-col justify-center rounded-2xl w-96 py-10 px-8 s:w-fit s:p-4 xs:w-full xs:p-4 sm:w-[350px] sm:p-4 md:w-[350px] md:p-4"
          style={{ boxShadow: '0px 0px 15px 2px #0000000F' }}
        >
          <h1 className="font-bold text-2xl text-[#E91B1A] text-center">
            SIGN UP
          </h1>
          <div className="pt-4 xl:pt-10 2xl:pt-10">
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
