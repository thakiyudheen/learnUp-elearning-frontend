import React from 'react';
import { useTheme } from '../../ui/theme-provider';

const Newsletter: React.FC = () => {
    let {theme}=useTheme()
  return (
    <div className={`${theme=='light'&&'bg-white'} font-Poppins md:flex items-center justify-center rounded-lg shadow-md w-100 md:h-[200px] md:p-6 p-9`}>
        <div className={`md:w-[70%] w-[95%]  shadow-md ${theme=='light'?'bg-gray-100':'bg-gray-800'} flex juctify-center flex-col md:flex-row md:justify-between items-center h-[9rem] md:h-[8rem] md:p-3 rounded-[1rem] md:ml-0 ml-[1rem] md:mt-0 mt-[2rem]`}>
      <div className="flex flex-col md:ml-[2rem] text-center md:text-start p-3 md:p-0 ">
        <h2 className="text-2xl font-bold mb-2 md:w-[20rem]">
          Find Out About The Latest Courses With The
          <span className="text-blue-500"> Academy </span>
          Newsletter
        </h2>
      </div>
       
      <div className=" flex bg-white rounded-lg h-[3rem] md:justify-evenly  items-center ml-[1rem] shadow-lg w-[17rem] md:w-[20rem] md:relative mt-2 md:mt-0 md:left-[8rem]">
        <input 
          type="email" 
          placeholder="Email Address..." 
          className="p-1 rounded-l-lg border-none bg-white"
        />
       
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg h-[60%] flex justify-center items-center relative right-[1rem] md:right-0 ">
          Submit
        </button>
      </div>
      <div className='bg-blue-500 w-[15%] h-[100%] rounded-tl-[2rem] rounded-bl-[4rem] rounded-r-lg hidden md:block'>

    </div>
      </div>
    </div>
  );
};

export default Newsletter;
