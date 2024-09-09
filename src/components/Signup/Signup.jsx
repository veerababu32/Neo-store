import { Link } from 'react-router-dom';
import { Container, Input } from '../index';
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
    <Container>
      <div className="flex justify-around items-center py-4">
        <div className="w-1/2 flex flex-col">
          <h1 className="font-bold text-3xl pl-20 text-[#BB0100]">NeoSTORE</h1>
          <img src={LoginImg} alt="Login img" className="py-20 mx-auto" />
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="h-max bg-white flex flex-col justify-center rounded-2xl w-fit px-8 py-10"
            style={{ boxShadow: '0px 0px 15px 2px #0000000F' }}
          >
            <h1 className="font-bold text-2xl text-[#E91B1A] text-center">
              SIGN UP
            </h1>
            <div className="pt-12 w-96">
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
              <div className="text-center pt-12 pb-8">
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
    </Container>
  );
}

export default Signup;
