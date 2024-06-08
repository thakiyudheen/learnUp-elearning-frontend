import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Components/instructor/Dashboard/Dashboard';
import InstructorDashboard from '../Pages/instructor/instructorDashbord';

const instructorRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<InstructorDashboard/>}>
        <Route path="dashboard" element={<Dashboard />} />
       
      </Route>
    </Routes>
  );
};

export default instructorRoutes;
