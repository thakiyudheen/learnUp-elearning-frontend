import React from 'react';
import Dashboard from './dashboard';
import UserManagement from './userManagement';
import InstructorMangement from './instructorManagement';

interface CenterContentProps {
  activeContent: string;
  isSidebarOpen: boolean;
}

const CenterContent: React.FC<CenterContentProps> = ({ activeContent, isSidebarOpen }) => {
  return (
    <div className={`pt-20 transition-all duration-500 ${isSidebarOpen ? 'md:ml-[16%]' : 'ml-0'}`}>
      {activeContent === 'dashboard' && <Dashboard />}
      {activeContent === 'students' && <UserManagement/>}
      {activeContent === 'nstructors' && <InstructorMangement/>}
      {/* {activeContent === 'courses' && <Courses />} */}
      {/* Add similar conditionals for other center content components */}
    </div>
  );
};

export default CenterContent;
