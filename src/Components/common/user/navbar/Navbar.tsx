import React, { useEffect, useState } from 'react';
import LearnUp from '../../../../assets/LearnUp.png';
import { ModeToggle } from '../../../ui/mode-toggle';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../ui/theme-provider';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooke';
import { RootState } from '../../../../redux/store';
import { RiMenu4Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { FaUser } from "react-icons/fa";
import { logoutAction } from '@/redux/store/actions/auth/logoutAction';

const Navbar: React.FC = () => {
  const { theme } = useTheme();
  const [selected, setSelected] = useState<string>('Home');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const [isLoading, setLoading] = useState<boolean>(false)

  const { data } = useAppSelector((state: RootState) => state.user)


  const handleButtonClick = (buttonName: string) => {
    setSelected(buttonName);
    setIsMenuOpen(false);
    if (buttonName == 'Home') {
      navigate('/')
    } else if (buttonName == 'Course') {
      navigate('/course-listing')
    }else if(buttonName == 'AboutUs'){
      navigate('/aboutUs')
    }
  };

  const handleLogout = async () => {
    setLoading(true)
    await dispatch(logoutAction())

    setLoading(false)
    navigate('/home')



  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    // Wrap the entire Navbar in a container with fixed position
    <div className="fixed top-0 left-0 right-0 z-50 font-Poppins ">
      <div className={`wrapper max-w-10xl  flex justify-between items-center ${theme == 'light' ? 'bg-white' : 'bg-gray-800'} h-[65px] shadow-lg font-sans relative z-10`}>
        <div className="logo">
          <img src={LearnUp} className="h-[70px] w-[150px] md:ml-[2rem]" alt="LearnUp Logo" />
        </div>
        <div className="md:hidden absolute block right-2">
          <ModeToggle />
          <button onClick={toggleMenu} className="text-xl p-2 ml-4 text-gray-700 relative top-1 focus:outline-none">
            {isMenuOpen ? <RxCross2 className='text-[25px] dark:text-gray-400' /> : <RiMenu4Line className={'text-[25px] dark:text-gray-400'} />}
          </button>
        </div>

        <AnimatePresence>
          <motion.div
            className={`fixed top-0 right-0 w-[70%] h-full ${theme == 'light' ? 'bg-white' : 'bg-gray-700'} z-9 flex flex-col items-center justify-center space-y-4 md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
            initial={{ x: '100%' }}
            animate={{ x: isMenuOpen ? '5%' : '100%' }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.5 }}
          >
             {/* 'Teach', */}
            <ul className="flex flex-col  items-center space-y-4 ">
              {['Home', 'Course', 'Contact Us', 'AboutUs'].map(buttonName => (
                <li key={buttonName} onClick={() => handleButtonClick(buttonName)} className="table hover:bg-gray-100 p-2 rounded-md w-full text-center">
                  {buttonName}
                </li>
              ))}
              {!data?.data?(<><li>
                <a onClick={() => navigate('/login')} className="text-lg font-semi-bold rounded-md px-4 py-2   text-blue-500 hover:bg-blue-500 hover:text-white hover:border-blue-500">
                  Login
                </a>
              </li>
              <li>
                <a onClick={() => navigate('/signup')} className="text-lg rounded-md px-4 py-2  text-blue-500   ">
                  Signup
                </a>
              </li></>):(
                <>
                <li className='text-sm rounded-md px-3 py-1 text-blue-600 font-bold'><a onClick={() => navigate('/student')}>Settings</a></li>
                <li  className='text-sm rounded-md px-3 py-1 text-blue-600 font-bold'><a onClick={handleLogout}> Logout</a></li>
                </>
              )}
              

            </ul>
            <div className="absolute top-1 right-5">
              <button onClick={toggleMenu} className="text-xl p-2 mr-4 top-0 text-gray-800 focus:outline-none">
                <RxCross2 className='text-[25px] dark:text-gray-400' />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
        {/* 'Teach', */}
        <ul className="hidden md:flex md:items-center md:space-x-4">
          {['Home', 'Course', 'Contact Us', 'AboutUs'].map(buttonName => (
            <li key={buttonName} className="pl-4">
              <button
                className={`text-sm rounded-md px-3 py-1 text-blue-600 font-bold ${selected === buttonName && 'bg-gray-500'} ${selected === buttonName && theme == 'light' && 'md:bg-gray-300'} ${theme == 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-700'} ${theme !== 'light' && 'bg-gray-800'} ${theme !== 'light' && 'text-white'}`}
                onClick={() => handleButtonClick(buttonName)}
              >
                {buttonName}
              </button>
            </li>
          ))}
        </ul>
        {!data?.data ? (<ul className="hidden md:flex md:items-center md:space-x-4 mr-10">
          <li className="pl-1">
            <button onClick={() => navigate('/login')} className={`text-sm font-semi-bold rounded-md px-3 py-1  border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:border-blue-500 ${theme == 'light' ? 'bg-white' : 'bg-gray-800'}`}>
              <small>Login</small>
            </button>
          </li>
          <li className="pl-1">
            <button onClick={() => navigate('/enrollment')} className="text-sm rounded-md px-3 py-1 bg-blue-500 text-white hover:bg-blue-600 border border-blue-500 hover:text-white hover:border-blue-600">
              <small>Signup</small>
            </button>
          </li>
        </ul>) : (<div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className=" m-1 hidden md:block "> <FaUser className='h-[2rem] text-gray-600' /></div>
          <ul tabIndex={0} className="dropdown-content menu dark:bg-base-100 bg-white  rounded-box z-[1] w-52 p-2 shadow">
            <li><a onClick={() => navigate('/student')}>Settings</a></li>
            <li><a onClick={handleLogout}> Logout</a></li>
          </ul>
        </div>)}
        {/* <DropdownMenu/> */}
        <div className="absolute right-3 md:relative hidden md:block">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;