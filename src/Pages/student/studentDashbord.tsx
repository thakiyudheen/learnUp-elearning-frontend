import React, { useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { ModeToggle } from '../../Components/ui/mode-toggle';
import { useTheme } from '../../Components/ui/theme-provider';
import { Outlet, useNavigate } from 'react-router-dom';
import UserSideNav from '../../Components/common/user/userLayout/userSideNav';
import { TiHome } from "react-icons/ti";

const StudentDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { theme } = useTheme();
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <UserSideNav isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <nav className={`w-full ${theme == 'light' ? 'bg-white ' : 'bg-gray-800'} h-[69px] shadow-md flex justify-end items-center fixed top-0 left-0 z-40`}>
        <div className='flex justify-evenly mr-[3rem] items-center'>
          {/* <CgProfile className='text-[1.3rem] mr-5' /> */}
          <TiHome className='mr-5 text-[3vh] dark:text-gray-500 text-gray-600' onClick={()=>navigate('/home')}/>
          <ModeToggle />
        </div>
      </nav>
      <main className={`pt-[10px] min-h-screen ${isSidebarOpen ? 'ml-[16%]' : 'ml-0'}`}>
        <Outlet />
      </main>

    </>
  );
};

export default StudentDashboard;