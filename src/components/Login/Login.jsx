import { useEffect, useState } from 'react';
import axios from 'axios';
import { login } from '../../feature/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Loader, Input } from '../index';
import { LoginImg } from '../../assets/index';
import { useForm } from 'react-hook-form';
import conf from '../../conf/conf';
import { toast, ToastContainer } from 'react-toastify';

function Login() {
  const { register, handleSubmit } = useForm();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [isCopied, setIsCopied] = useState({
    name: false,
    pass: false,
  });
  const URL = conf.reactAppBaseApi;

  useEffect(() => {
    let isMounted = true;
    const randomNum = Math.floor(Math.random() * 30);

    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${URL}/users?select=id,username,password`);
        if (isMounted && res?.data?.users && res?.data?.users.length > 1) {
          let users = res.data.users;
          setUser(users[randomNum]);
        }
      } catch (e) {
        console.log(`Error :: ${e} :: Login :: Fetch users`);
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, [URL]);

  function onSubmit(data) {
    setLoader(true);
    axios
      .post(`${URL}/auth/login`, {
        username: data.username,
        password: data.password,
      })
      .then((res) => {
        if (res?.data?.token) {
          // console.log(res.data);

          const userData = {
            username: res.data.username,
            token: res.data.token,
          };

          sessionStorage.setItem('userData', JSON.stringify(userData.username));
          sessionStorage.setItem('isAuthenticated', true);
          dispatch(login(userData));
          toast.success('User Logged In successfully!');
          navigate('/');
        }
      })
      .catch((e) => {
        console.log(`Error :: ${e} :: Login`);
        toast.error('Please check & Re-Enter the Username, Password');
      })
      .finally(() => setLoader(false));
  }

  const handleCopy = (e, val) => {
    e.preventDefault();
    if (val === 'user') {
      const user = document.querySelector('#copyUser').value;
      if (user) {
        navigator.clipboard.writeText(user);
        setIsCopied((prev) => ({ ...prev, name: true }));
      }
    } else if (val === 'pass') {
      const pass = document.querySelector('#copyPass').value;
      if (pass) {
        navigator.clipboard.writeText(pass);
        setIsCopied((prev) => ({ ...prev, pass: true }));
      }
    } else {
      console.log(`Error :: Something went wrong!!! :: Login :: handleCopy()`);
    }
  };

  return (
    <>
      <ToastContainer />
      {loader ? (
        <Loader />
      ) : (
        <div className="w-full flex flex-row p-4 mx-auto s:flex-col xs:flex-col sm:flex-col lg:justify-around xl:container xl:p-8 2xl:container 2xl:px-0">
          <div className="flex flex-col w-1/2 s:w-auto xs:w-auto sm:w-auto">
            <h1 className="font-bold text-xl text-center text-[#BB0100] mb-2 md:text-2xl md:text-start lg:text-3xl lg:text-start xl:text-3xl xl:text-start 2xl:text-3xl 2xl:text-start">
              NeoSTORE
            </h1>
            <img
              src={LoginImg}
              alt="Login img"
              className="mx-auto  s:hidden xs:hidden sm:hidden lg:pt-8 xl:py-20 2xl:py-20"
            />
          </div>
          <div className="flex justify-center items-center w-1/2 s:w-auto xs:w-auto sm:w-auto">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="h-max bg-white flex flex-col justify-center rounded-2xl w-fit p-4 xl:w-96 xl:py-10 xl:px-8 2xl:w-96 2xl:py-10 2xl:px-8"
              style={{ boxShadow: '0px 0px 15px 2px #0000000F' }}
            >
              <h1 className="font-bold text-2xl text-[#E91B1A] text-center">
                LOG IN
              </h1>
              <div className="pt-4 xl:pt-10 2xl:pt-10">
                <div>
                  <Input
                    type="text"
                    label="Username"
                    className=" mt-2"
                    placeholder="Username"
                    {...register('username', { required: true })}
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    label="Password"
                    className=" mt-2"
                    placeholder="Password"
                    {...register('password', { required: true })}
                  />
                </div>
                <div className="text-right">
                  <Link
                    to="/login"
                    className="font-normal text-xs text-[#585858] underline"
                  >
                    Forgot Password
                  </Link>
                </div>
                <div className="text-center py-8">
                  <button
                    type="submit"
                    className="w-64 bg-[#BB0100] text-white py-2"
                  >
                    Continue
                  </button>
                </div>
                <div className="text-center font-normal text-sm text-[#4F4F4F]">
                  New to NeoSTORE?{' '}
                  <Link to="/signup" className="text-base underline">
                    Sign Up
                  </Link>
                </div>
                <p className="font-bold text-[#E91B1A] text-center mt-3">
                  Hello User Please use below credentials to LOG IN
                </p>
                <div className="flex gap-4 mt-2">
                  <Input
                    type="text"
                    placeholder="username"
                    value={(user && user.username) || ''}
                    readOnly
                    id="copyUser"
                    {...register('copyUser')}
                  />
                  <button
                    className="bg-[#BB0100] text-white px-5 rounded-md"
                    onClick={
                      isCopied.name === true
                        ? null
                        : (e) => handleCopy(e, 'user')
                    }
                  >
                    {isCopied.name === true ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="flex gap-4 mt-2">
                  <Input
                    type="text"
                    placeholder="Password"
                    value={(user && user.password) || ''}
                    readOnly
                    id="copyPass"
                    {...register('copyPass')}
                  />
                  <button
                    className="bg-[#BB0100] text-white px-5 rounded-md"
                    onClick={
                      isCopied.pass === true
                        ? null
                        : (e) => handleCopy(e, 'pass')
                    }
                  >
                    {isCopied.pass === true ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
