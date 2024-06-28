import React, { useEffect, useRef, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { FaPaperclip } from 'react-icons/fa';
import { CiMenuKebab } from "react-icons/ci";
import { BsChatRightQuote } from "react-icons/bs";
import { useAppSelector } from '@/hooks/hooke';
import { RootState } from '@/redux/store';
import { useSocket } from '@/context/socketContext';


interface ChatWindowProps {
  messages: any;
  currentUser: any;
  onSendMessage: (message: string) => void;
  currentChat: any;
  isTyping:any;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  currentUser,
  onSendMessage,
  currentChat,
  isTyping,
}) => {
  const {socket} = useSocket()
  const { data } = useAppSelector((state: RootState) => state.user)
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<any>('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  console.log('the tping',data?.data._id, currentChat?._id)
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log(files);
  };

  const handleSend = () => {
    console.log(message);
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  const getMessageSender = (message: any) => {
    if (typeof message.sender === 'object') {
      return message.sender._id;
    }
    return message.sender;
  };

   // handle typing------------------------------
   const handleTyping = () =>{
    socket?.emit('isTyping',{isTyping:true,roomId:currentChat?.roomId,sender:data?.data?._id})
   }

  return (
    <>
      {currentChat ? (
        <div className="flex flex-col min-h-screen  md:w-3/4 ">
          <div className="flex items-center justify-between border-b dark:bg-gray-800 border-gray-300 dark:border-gray-900 p-4 shadow-sm mt-[4rem]">
            <div className="flex items-center">
              <img
                src={currentChat?.profile?.avatar} 
                alt="Profile"
                className="w-10 h-10 rounded-full mr-4"
              />
              <div className="flex flex-col justify-evenly">
                <h1 className="font-semibold">{currentChat?.firstName}</h1>
                <small className="text-gray-400">
                {isTyping?.isTyping
                  ? "typing..."
                  : currentChat?.isOnline
                  ? "Online"
                  :` last seen ${new Date(currentChat?.lastSeen).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } `}
              </small>
              </div>
            </div>
            <CiMenuKebab />
          </div>
          <div
            className="flex-1 p-4 overflow-y-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {messages.map((message:any, index:any ) => (
              <div
                key={index}
                className={`chat ${
                  getMessageSender(message) === currentUser._id ? 'chat-end' : 'chat-start'
                }`}
              >
                <div className="chat-image avatar">
                  <div className="w-5 rounded-full">
                    <img
                      alt="Avatar"
                      src={typeof message.sender === 'object' ? message.sender.profile.avatar : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'}
                    />
                  </div>
                </div>
                <div className="chat-header">
                  <small className={`${getMessageSender(message) === currentUser._id ?"text-end relative right-2":"text-start relative left-2" }`}>{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
                </div>
                <div
                  className={` ${
                    getMessageSender(message) === currentUser._id ? 'bg-blue-700 text-white rounded-l-full rounded-tr-full px-3 py-2 ' : 'bg-gray-500 dark:bg-gray-700 text-white rounded-r-full rounded-t-full px-3 py-2 '
                  }`}
                >
                  <div className='flex'>
                  {message.content} <br />
                  
                  </div>
                 
                </div>
                {/* <div className="chat-footer opacity-50">
                  {getMessageSender(message) === currentUser._id ? 'Seen at ' + new Date(message.createdAt).toLocaleTimeString() : 'Delivered'}
                </div> */}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 flex dark:bg-gray-800">
            <button className="mr-2 text-gray-500" onClick={() => fileInputRef.current?.click()}>
              <FaPaperclip size={20} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <input
              type="text"
              placeholder="Type a message here..."
              className="flex-1 pl-5 dark:text-gray-200 border dark:border-gray-800 border-gray-300 dark:bg-gray-700 bg-gray-300 focus:outline-none text-gray-800 rounded-full"
              value={message}
              onChange={(e) => {setMessage(e.target.value); handleTyping()}}
            />
            <button className="ml-2 bg-blue-700 text-white p-3 rounded-full" onClick={handleSend}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      ) : (
        <div className='w-3/4 mt-10 flex justify-center flex-col items-center'>
          <BsChatRightQuote className='w-full text-[2rem] text-gray-400' />
          <small className='flex justify-center items-center flex-col w-full text-gray-500'>please click any user and chat ...</small>
        </div>
      )}
    </>
  );
};

export default ChatWindow;
