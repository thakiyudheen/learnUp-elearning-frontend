import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiFillBell } from "react-icons/ai";
import { FaChalkboardTeacher, FaBook, FaUserGraduate, FaSignOutAlt, FaThList } from 'react-icons/fa';
import { RxDashboard } from "react-icons/rx";
import Learnup from '../../../../assets/LearnUp.png';
import { useTheme } from '../../../ui/theme-provider';
import { motion } from 'framer-motion';
import { RiMenu4Line } from "react-icons/ri";
import { useAppDispatch } from '../../../../hooks/hooke';
import { logoutAction } from '../../../../redux/store/actions/auth/logoutAction';

interface userSideNavProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const UserSideNav: React.FC<userSideNavProps> = ({ isOpen, toggleSidebar }) => {
  const { theme } = useTheme();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const dispatch = useAppDispatch()
  const [isLoading,setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const getNavItemClass = (isActive: boolean) => {
    const baseClass = "p-4 flex items-center hover:bg-blue-600 hover:bg-opacity-10 hover:rounded-r-full cursor-pointer";
    const selectedClass = isActive ? `bg-blue-700 text-white bg-opacity-40 rounded-r-full ${theme === 'light' ? 'hover:text-black' : 'hover:text-white'}` : "";
    return `${baseClass} ${selectedClass}`;
  };

 const handleLogout = async () =>{
  setLoading(true)
  await dispatch(logoutAction())

  setLoading(false)
   navigate('/home')
  

  
 }

  return (
    <>
      <motion.nav
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? '0%' : '-100%' }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 z-50 flex flex-col md:w-[16%] justify-between h-full shadow-lg ${theme !== 'light' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
      >
        <div>
          <div className="text-2xl font-bold text-center flex justify-center items-center p-1">
            <img src={Learnup} className="w-[9rem]" alt="LearnUp Logo" />
          </div>
          <hr />
          <ul className="mt-4 text-center font-bold md:ml-3">
            <NavLink to="dashboard" className={({ isActive }) => getNavItemClass(isActive)}>
              <RxDashboard className="mr-4" />
              Dashboard
            </NavLink>
            <NavLink to="courses" className={({ isActive }) => getNavItemClass(isActive)}>
              <FaBook className="mr-4 " />
              Courses
            </NavLink>
            <NavLink to="students" className={({ isActive }) => getNavItemClass(isActive)}>
              <FaUserGraduate className="mr-4" />
              Students
            </NavLink>
            <NavLink to="instructors" className={({ isActive }) => getNavItemClass(isActive)}>
              <FaChalkboardTeacher className="mr-4" />
              Instructors
            </NavLink>
            <NavLink to="requests" className={({ isActive }) => getNavItemClass(isActive)}>
            <AiFillBell className="mr-4"/>
              requests
            </NavLink>
            <NavLink to="categories" className={({ isActive }) => getNavItemClass(isActive)}>
              <FaThList className="mr-4" />
              Categories
            </NavLink>
          </ul>
        </div>
        <ul className="text-center font-bold mb-4" onClick={handleLogout}>
          <NavLink to={''} className={`p-4 flex items-center hover:bg-blue-600 hover:bg-opacity-10 hover:rounded-r-full cursor-pointer`}>
          
            <FaSignOutAlt className="mr-4 " />
            Logout
          
          </NavLink>
        </ul>
        <button
          onClick={toggleSidebar}
          className={`md:fixed top-4 md:left-[15rem] left-[10rem] z-60 p-2 ${theme !== 'light' ? 'bg-gray-800 text-white' : ' text-black'}`}
        >
          <RiMenu4Line className={`text-[25px]  ${theme != 'light' ? 'text-white' : 'text-blue-600'}`} />
        </button>
      </motion.nav>
    </>
  );
};

export default UserSideNav;
