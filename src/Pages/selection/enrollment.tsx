import React from 'react';
import SignupSVG from '../../assets/signup.svg';
import Student from '../../assets/enrollment/student.svg';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/common/user/navbar/Navbar';

const Enrollment: React.FC = () => {
  const navigate = useNavigate()
  return (
    <>
    <Navbar/>
    <div className="container mx-auto px-3 py-6 font-Poppins">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-8 mt-[3rem]">
        <div className="flex-1 text-center ">
          <img
            src={Student}
            alt="Enroll as a Student"
            className="mx-auto mb-2 h-[24rem]"
          />
          <button onClick={()=>navigate('/signup', { state: { role: "student" } })} className="bg-blue-600 text-white py-2 px-4 border-2 border-blue-600 hover:bg-blue-600 shadow-lg rounded-[2rem]">
            Enroll as a student
          </button>
        </div>
        <div className="flex-1 text-center ">
          <img
            src={SignupSVG}
            alt="Enroll as a Teacher"
            className="mx-auto mb-2 h-[24rem]"
          />
          <button onClick={()=>navigate('/signup',{ state: { role: "instructor" } })} className="bg-transparent border-2 border-blue-500 text-blue-500 py-2 px-4 rounded-[2rem] hover:bg-blue-600 shadow-lg hover:text-white">
            Enroll as a Teacher
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-[2rem]">
        <div className=" p-4 rounded-md ">
          <p className="text-center text-[12px]">
            "Join as a student to unlock a world of learning opportunities. Access a diverse range of courses, engage with interactive content, collaborate with peers, and track your progress as you embark on your educational journey."
          </p>
        </div>
        <div className=" p-4 rounded-md ">
          <p className="text-center  text-[12px]">
            "Become a part of our vibrant teaching community by enrolling as a teacher. Share your expertise, create engaging courses, interact with students, and make a meaningful impact on learners' lives. Empower the next generation of learners with your knowledge and passion."
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Enrollment;
