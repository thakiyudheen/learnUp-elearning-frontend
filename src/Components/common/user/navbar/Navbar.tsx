import React, { useEffect, useState } from 'react';
import LearnUp from '../../../../assets/LearnUp.png';
import { ModeToggle } from '../../../ui/mode-toggle';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../ui/theme-provider';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooke';
import { RootState } from '../../../../redux/store';
import DropdownMenu from '../dropDownMenu/dropDownMenu';

const Navbar: React.FC = () => {
  const { theme } = useTheme();
  const [selected, setSelected] = useState<string>('Home');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const { data } = useAppSelector((state: RootState) => state.user)
 

  const handleButtonClick = (buttonName: string) => {
    setSelected(buttonName);
    setIsMenuOpen(false);
    if(buttonName=='Home'){
      navigate('/')
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    // Wrap the entire Navbar in a container with fixed position
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className={`wrapper flex justify-between items-center ${theme == 'light' ? 'bg-white' : 'bg-gray-800'} h-[65px] shadow-lg font-sans relative z-10`}>
        <div className="logo">
          <img src={LearnUp} className="h-[70px] w-[150px] md:ml-[2rem]" alt="LearnUp Logo" />
        </div>
        <div className="md:hidden absolute block right-2">
          <button onClick={toggleMenu} className="text-xl p-2  text-gray-700 focus:outline-none">
            {isMenuOpen ? '✕' : '☰'}
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
            <ul className="flex flex-col items-center space-y-4">
              {['Home', 'Course', 'Teach', 'Contact Us', 'About Us'].map(buttonName => (
                <li key={buttonName} onClick={() => handleButtonClick(buttonName)} className="table hover:bg-gray-100 p-2 rounded-md w-full text-center">
                  {buttonName}
                </li>
              ))}
              <li>
                <button onClick={() => navigate('/login')} className="text-lg font-semi-bold rounded-md px-4 py-2 bg-white border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:border-blue-500">
                  Login
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/signup')} className="text-lg rounded-md px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 border border-blue-500 hover:text-white hover:border-blue-600">
                  Signup
                </button>
              </li>
              <li>
                <ModeToggle />
              </li>
            </ul>
            <div className="absolute top-1 right-5">
              <button onClick={toggleMenu} className="text-xl p-2 mr-4 top-0 text-gray-800 focus:outline-none">
                ✕
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
        <ul className="hidden md:flex md:items-center md:space-x-4">
          {['Home', 'Course', 'Teach', 'Contact Us', 'About Us'].map(buttonName => (
            <li key={buttonName} className="pl-4">
              <button
                className={`text-sm rounded-md px-3 py-1 text-blue-600 font-bold ${selected === buttonName && 'bg-gray-500'} ${selected === buttonName && theme=='light'&&'md:bg-gray-300'} ${theme=='light'?'hover:bg-gray-200':'hover:bg-gray-700'} ${theme !== 'light' && 'bg-gray-800'  } ${theme !== 'light' && 'text-white'}`}
                onClick={() => handleButtonClick(buttonName)}
              >
                {buttonName}
              </button>
            </li>
          ))}
        </ul>
        {!data?.data?(<ul className="hidden md:flex md:items-center md:space-x-4 mr-10">
          <li className="pl-1">
            <button onClick={() => navigate('/login')} className={`text-sm font-semi-bold rounded-md px-3 py-1  border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:border-blue-500 ${theme=='light'?'bg-white':'bg-gray-800'}`}>
              Login
            </button>
          </li>
          <li className="pl-1">
            <button onClick={() => navigate('/enrollment')} className="text-sm rounded-md px-3 py-1 bg-blue-500 text-white hover:bg-blue-600 border border-blue-500 hover:text-white hover:border-blue-600">
              Signup
            </button>
          </li>
        </ul>):<DropdownMenu/>}
        <div className="absolute right-3 md:relative hidden md:block">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;