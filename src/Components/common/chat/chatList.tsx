import { useAppSelector } from '@/hooks/hooke';
import { RootState } from '@/redux/store';
import React, {  useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';



interface SidebarProps {
  users: any[];
  onlineUsers: {
      userId: string;
      socketId: string;
  }[] | undefined;
  createNewChat: (user:any , isOnline: boolean | undefined) =>  void; 
}

const ChatList: React.FC<SidebarProps>  = ({onlineUsers, users ,createNewChat}) => {
  const { data } = useAppSelector((state: RootState) => state.user);
    console.log('online users',onlineUsers)
  return (
    <div className="w-1/4 bg-gray-300 dark:bg-gray-800 md:block hidden dark:bg-base-100 overflow-y-scroll mt-10   " style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
     <div className='bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-600 shadow-lg'>
     <div className="p-5 sticky top-5 mt-[1.5rem] ">
        <div className="relative">
          <FaSearch className="absolute top-2 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full  py-1 px-10 border bg-gray-200 dark:bg-gray-700 dark:border-gray-700 border-white rounded-full focus:outline-none"
          />
        </div>
      </div>
     </div>
    
      <ul className='md:mt-[1rem] p-3 '>
        {users.map((chat:any) => (
          <li
            key={chat?.participant?._id}
            className={`flex items-center p-4 hover:bg-blue-100 dark:bg-gray-900 cursor-pointer mb-2 shadow-lg rounded-lg ${
              chat.active ? 'bg-blue-600 text-white' : 'bg-white'
            }`}
            
            onClick={()=>{ createNewChat(chat,onlineUsers?.includes(chat?.participant?._id) )}}
          >
            <div className='relative'>
            <img src={chat?.participant.profile?.avatar} className="w-10 h-10  rounded-full"></img >
            {onlineUsers?.includes(chat?.participant._id)&& (
              <span style={{ marginLeft: '8px', color: 'green', fontWeight: 'bold' }} className='absolute left-5 bottom-[2px] w-3 h-3 bg-[green] rounded-full'></span>
            )}
            </div>
           
            <div className="ml-4 flex-1 flex flex-col">
              <small className={`font-bold ${chat.active ? 'text-white' : ''} dark:text-gray-200 text-black`}>{chat?.participant.firstName}</small>
              <small className={`text-gray-500 ${chat.active ? 'text-gray-300' : ''}`}>{'This is sample measage'}</small>
            </div>
            {onlineUsers?.includes(chat?.participant._id)?<small className='text-[green]'>Online</small>:<small>Offline</small>}
            <small className={`ml-auto ${chat.active ? 'text-gray-300' : 'text-gray-500'}`}>{chat.time}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
