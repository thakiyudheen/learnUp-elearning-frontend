import React from 'react';
import { FaRegUser } from "react-icons/fa6"; // Import FaUserEdit icon
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosNotificationsOutline ,IoMdLogOut  ,IoIosLogOut} from "react-icons/io";

type SidebarProps = {
  onSelect: (section: string) => void;
};

const UserProfile: React.FC<SidebarProps> = ({ onSelect }) => {
  return (
    <div className="w-[14rem] m-6  rounded-lg p-8 dark:bg-gray-800 shadow-md bg-gray-100 hidden md:block mt-[6rem]">
      
      <ul className="mt-6 space-y-4">
        <li onClick={() => onSelect('profile')} className="flex transition-all duration-300 items-center hover:text-white hover:bg-blue-600 py-2 px-3 bg-opacity-10  rounded-lg space-x-2 cursor-pointer">
        <FaRegUser />
          <span>My Profile</span>
        </li>
        <li onClick={() => onSelect('settings')} className="flex transition-all duration-300 items-center rounded-lg hover:text-white hover:bg-blue-600 py-2 px-3 bg-opacity-10   cursor-pointer">
        <IoSettingsOutline /> &nbsp;
          <span>Settings</span>
        </li>
        <li onClick={() => onSelect('notifications')} className="flex transition-all duration-300 items-center rounded-lg hover:text-white hover:bg-blue-600 py-2 px-3 bg-opacity-10   cursor-pointer">
        <IoIosNotificationsOutline />&nbsp;&nbsp;
          <span>Notification</span>
        </li>
        <li className="flex items-center transition-all duration-300  hover:bg-blue-600 py-2 px-3 bg-opacity-10 hover:text-white rounded-lg  cursor-pointer">
        <IoIosLogOut />&nbsp;
          <span>Log Out</span>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
