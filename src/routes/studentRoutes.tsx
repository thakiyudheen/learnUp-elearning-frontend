import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentDashboard from '../Pages/student/studentDashbord';
import Dashboard from '../Components/user/Dashboard/Dashboard';



const studentRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentDashboard/>}>
        <Route path="dashboard" element={<Dashboard/>} />
        
      </Route>
    </Routes>
  );
};

export default studentRoutes;
