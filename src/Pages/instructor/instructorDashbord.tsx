import React, { useState } from 'react';
import { CgProfile } from "react-icons/cg";

import { ModeToggle } from '../../Components/ui/mode-toggle';
import { useTheme } from '../../Components/ui/theme-provider';
import { Outlet } from 'react-router-dom';
import InstructorSideNav from '../../Components/common/instructor/instructorLayout/instructorSideNav';

const instructorDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const { theme } = useTheme();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <InstructorSideNav isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <nav className={`w-full ${theme == 'light' ? 'bg-gray-200' : 'bg-gray-800'} h-[69px] shadow-md flex justify-end items-center fixed top-0 left-0 z-40`}>
        <div className='flex justify-evenly mr-[3rem] items-center'>
          <CgProfile className='text-[1.3rem] mr-5' />
          <ModeToggle />
        </div>
      </nav>
      <main className={`pt-[70px] ${isSidebarOpen ? 'ml-[16%]' : 'ml-0'}`}>
        <Outlet />
      </main>
    </>
  );
};

export default instructorDashboard;
