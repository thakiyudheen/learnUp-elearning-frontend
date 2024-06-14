import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminNavbar from '../Pages/admin/admin-nav';
import Dashboard from '../Components/admin/dashboard';
import UserTable from '../Components/admin/userManagement';
import InstructorTable from '../Components/admin/instructorManagement';
import Requests from '../Components/admin/instructorRequests';
import Category from '../Components/admin/category/Category';
import CourseRequest from '@/Components/admin/course/courses';
import CourseCard from '@/Components/user/course/course';

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminNavbar />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<UserTable />} />
        <Route path="instructors" element={<InstructorTable />} />
        <Route path="requests" element={<Requests />} />
        <Route path="categories" element={<Category/>} />
        <Route path="courses" element={<CourseRequest/>} />
        <Route path="view-course" element={ <CourseCard
        title="Web Development Masterclass - Online Certification Course"
        subtitle="Cloud Computing | Web Apps | Linux | Web Servers | DBMS | LAMP Stack | HTML | CSS | JavaScript | PHP | More"
        rating={4.6}
        ratingsCount={9918}
        studentsCount={479733}
        creator="Your Name"
        lastUpdated="9/2022"
        languages={["English (Auto)", "Spanish (Auto)"]}
        price={3099}
        currency="₹"
        features={[
          "Understand the essentials of Local and Wide Area Networks",
          "Register a domain name with Domain Providers",
          "Configure Nameservers and DNS Zone Files",
          "Configure a Production web server on popular cloud hosting platforms",
          "Setup Ubuntu on a Virtual Machine",
          "Setup a basic network",
          "Forward a domain, renew and administer a domain",
          "Create and Configure a Testing server on a local Windows or Mac system",
          "Create disk backups and install disk images on a virtual server",
          "Install and configure WAMP for Windows"
        ]}
        includes={[
          "28 hours on-demand video",
          "2 downloadable resources",
          "Access on mobile and TV",
          "Full lifetime access",
          "Certificate of completion"
        ]}
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
      />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
