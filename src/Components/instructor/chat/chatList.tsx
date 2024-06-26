import { useSocket } from '@/context/socketContext';
import { useAppDispatch, useAppSelector } from '@/hooks/hooke';
import { RootState } from '@/redux/store';
import { getChatByUserIdAction } from '@/redux/store/actions/chat/getChatByUserIdAction';
import React, {  useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const ChatList = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state: RootState) => state.user);
  const { socket } = useSocket();
  const [onlineUsers, setOnlineUsers] = useState<any>([]);
  const [participants, setParticipants] = useState<any[]>([]);

  useEffect(()=>{
    getData()
  },[dispatch])

  
  const getData = async () =>{
    console.log('this is workign')
    const response: any = await dispatch(getChatByUserIdAction({ userId: data.data._id }));

    if (response.payload && response.payload.success) {
      console.log('this is created chat working...', response.payload.data);

      // Extract unique participants along with chat IDs, excluding the current user's ID
      const uniqueParticipants = new Set<string>();
      const otherParticipants = response.payload.data.reduce((acc: any[], chat: any) => {
        chat.participants.forEach((participant: any) => {
          if (participant._id !== data.data._id && !uniqueParticipants.has(participant._id)) {
            uniqueParticipants.add(participant._id);
            acc.push({ chatId: chat._id, participant });
          }
        });
        return acc;
      }, []);

      setParticipants(otherParticipants);
      console.log('Filtered participants with chat IDs:', otherParticipants);
    }
  }


  useEffect(() => {
    if (socket) {
      const handleOnlineUsers = (data: any) => {
        console.log('Received online users:', data);
        setOnlineUsers(data);
      };

      socket.on('getOnlineUser', handleOnlineUsers);

      return () => {
        socket.off('getOnlineUser', handleOnlineUsers);
      };
    }
  }, [socket]);

    
    console.log('tthe user',onlineUsers)
  return (
    <div className="w-1/4 bg-gray-100 md:block hidden dark:bg-gray-800 shadow-lg overflow-y-scroll    " style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
      <div className="p-2 sticky top-0   mt-[5rem]">
        <div className="relative">
          <FaSearch className="absolute top-2 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full  py-1 px-10 border bg-white dark:bg-gray-700 dark:border-gray-700 border-white shadow-lg rounded-full focus:outline-none"
          />
        </div>
      </div>
      <ul className='md:mt-[1rem] p-3 '>
        {participants.map((chat:any) => (
          <li
            key={chat._id}
            className={`flex items-center p-4 hover:bg-blue-100 dark:bg-gray-900 cursor-pointer mb-2 shadow-lg rounded-lg ${
              chat.active ? 'bg-blue-600 text-white' : 'bg-white'
            }`}
          >
            <div className='relative'>
            <img src={chat?.participant.profile?.avatar} className="w-10 h-10  rounded-full"></img >
            {onlineUsers.includes(chat?.participent?._id) && (
              <span style={{ marginLeft: '8px', color: 'green', fontWeight: 'bold' }} className='absolute left-5 bottom-[2px] w-3 h-3 bg-green-700 rounded-full'></span>
            )}
            </div>
           
            <div className="ml-4 flex-1 flex flex-col">
              <small className={`font-bold ${chat.active ? 'text-white' : ''} dark:text-gray-200 text-black`}>{chat?.participant.firstName}</small>
              <small className={`text-gray-500 ${chat.active ? 'text-gray-300' : ''}`}>{'This is sample measage'}</small>
            </div>
            {onlineUsers.includes(chat?.participant._id)?<small className='text-[green]'>Online</small>:<small>Offline</small>}
            <small className={`ml-auto ${chat.active ? 'text-gray-300' : 'text-gray-500'}`}>{chat.time}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
