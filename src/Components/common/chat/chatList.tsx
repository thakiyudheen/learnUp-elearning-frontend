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
  createNewChat: (user:any , isOnline: boolean | undefined,lastSeen:any , subscribtionType :any) =>  void; 
  isRes:boolean;
  setRes:any;
  isLoading:any;
}

const ChatList: React.FC<SidebarProps>  = ({onlineUsers, users ,createNewChat , isRes , setRes,isLoading}) => {
  const { data } = useAppSelector((state: RootState) => state.user);
  
  console.log('let',users,data,isRes)

  return (
  
    <div className={`   md:w-1/4  bg-gray-300 dark:bg-gray-800 md:block w-full dark:bg-base-100 overflow-y-scroll mt-10  `} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
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
    
     <ul className='md:mt-[1rem] p-3'>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div className="flex items-center p-4 mb-2 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg shadow-lg">
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div className="ml-4 flex-1">
              <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
              <div className="w-40 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
          ))
        ) : (
          users.map((chat: any) => (
            <li
              key={chat?.participant?._id}
              className={`flex items-center p-4 hover:bg-blue-100 dark:bg-gray-700 cursor-pointer mb-2 shadow-lg rounded-lg ${chat.active ? 'bg-blue-600 text-white' : 'bg-white'}`}
              onClick={() => { createNewChat(chat, onlineUsers?.includes(chat?.participant?._id),chat?.lastSeen,chat?.subscriptionType); setRes(true); }}
            >
              <div className='relative'>
                <img src={chat?.participant.profile?.avatar} className="w-10 h-10 rounded-full"></img>
                {onlineUsers?.includes(chat?.participant._id) && (
                  <span style={{ marginLeft: '8px', color: 'green', fontWeight: 'bold' }} className='absolute left-5 bottom-[2px] w-3 h-3 bg-[green] rounded-full'></span>
                )}
              </div>
              <div className="ml-4 flex-1 flex flex-col">
                <small className={`font-bold ${chat.active ? 'text-white' : ''} dark:text-gray-200 text-black`}>{chat?.participant.firstName}</small>
                <small className={`text-gray-500 ${chat.active ? 'text-gray-300' : ''}`}>{'This is sample message'}</small>
              </div>
              {onlineUsers?.includes(chat?.participant._id) ? <small className='text-[green]'>Online</small> : <small>Offline</small>}
              <small className={`ml-auto ${chat.active ? 'text-gray-300' : 'text-gray-500'}`}>{chat.time}</small>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ChatList;
