import React from 'react';
import { useTheme } from '../../../ui/theme-provider';

const Footer: React.FC = () => {
    const { theme } = useTheme();
  return (
    <footer className={`${theme=='light'?'bg-white':'bg-dark'}  font-Poppins p-8 md:p-8 lg:p-16  ${theme=='light'?'text-gray-700': 'md:text-gray-100'}  text-[14px] font-sans`}>
      <div className={`container mx-auto flex flex-col lg:flex-row justify-between ${theme=='light'?'bg-gray-200': 'bg-gray-800'}  md:p-[3rem] rounded-tl-[2rem] p-4 rounded-tr-[2rem]`}>
        <div className="mb-6 lg:mb-0">
          {/* <img src="/logo.png" alt="LearnUp" className="h-10 mb-4" /> Ensure the path is correct */}
          <h1 className='text-blue-600 text-[20px] font-bold w-'>learnUp</h1>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-blue-600 hover:text-blue-800">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
          <p className="text-sm mt-4">&copy; 2021 EduXco. EduX is a registered trademark of EduXco.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Courses</h3>
            <ul>
              <li><a href="#" className="hover:underline">Classroom courses</a></li>
              <li><a href="#" className="hover:underline">Virtual classroom courses</a></li>
              <li><a href="#" className="hover:underline">E-learning courses</a></li>
              <li><a href="#" className="hover:underline">Video Courses</a></li>
              <li><a href="#" className="hover:underline">Offline Courses</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Community</h3>
            <ul>
              <li><a href="#" className="hover:underline">Learners</a></li>
              <li><a href="#" className="hover:underline">Partners</a></li>
              <li><a href="#" className="hover:underline">Developers</a></li>
              <li><a href="#" className="hover:underline">Transactions</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Teaching Center</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick links</h3>
            <ul>
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">Professional Education</a></li>
              <li><a href="#" className="hover:underline">Courses</a></li>
              <li><a href="#" className="hover:underline">Admissions</a></li>
              <li><a href="#" className="hover:underline">Testimonial</a></li>
              <li><a href="#" className="hover:underline">Programs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">More</h3>
            <ul>
              <li><a href="#" className="hover:underline">Press</a></li>
              <li><a href="#" className="hover:underline">Investors</a></li>
              <li><a href="#" className="hover:underline">Terms</a></li>
              <li><a href="#" className="hover:underline">Privacy</a></li>
              <li><a href="#" className="hover:underline">Help</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t mt-6 pt-6 text-center text-[14px]">
        <a href="#" className="hover:underline">Privacy Policy</a> | <a href="#" className="hover:underline">Terms & Conditions</a>
      </div>
    </footer>
  );
};

export default Footer;
