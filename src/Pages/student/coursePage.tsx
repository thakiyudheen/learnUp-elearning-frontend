import Footer from '@/Components/common/user/footer/footer';
import Navbar from '@/Components/common/user/navbar/Navbar';
import CourseCard from '@/Components/user/course/course';
import React from 'react';

const CoursePage: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <CourseCard/>
      <Footer/>
    </div>
  );
};

export default CoursePage;
