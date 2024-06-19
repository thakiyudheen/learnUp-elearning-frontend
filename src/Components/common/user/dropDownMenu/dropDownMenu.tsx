import { useAppDispatch } from '../../../../hooks/hooke';
import { logoutAction } from '../../../../redux/store/actions/auth/logoutAction';
import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading , setLoading]= useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = async () =>{
    setLoading(true)
    await dispatch(logoutAction())
  
    setLoading(false)
     navigate('/home')
    
  
    
   }

  return (
    <div className="relative inline-block text-left m-0">
      <button
        onClick={toggleMenu}
        className=""
      >
        <FaUser className='h-[2rem] text-gray-600'/>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <a
              onClick={()=>navigate('/student')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"

            >
              
              Settings
            </a>
            <a
              onClick={()=>navigate('/user-profile')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
            Profile
            </a>
            <a
              onClick={handleLogout}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
