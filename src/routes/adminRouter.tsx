import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminNavbar from '../Pages/admin/admin-nav';
import Dashboard from '../Components/admin/dashboard';
import UserTable from '../Components/admin/userManagement';
import InstructorTable from '../Components/admin/instructorManagement';
import Requests from '../Components/admin/instructorRequests';
import Category from '../Components/admin/category/Category';

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminNavbar />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<UserTable />} />
        <Route path="instructors" element={<InstructorTable />} />
        <Route path="requests" element={<Requests />} />
        <Route path="categories" element={<Category/>} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
