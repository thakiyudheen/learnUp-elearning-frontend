import React, { useEffect, useRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { FaPaperclip } from 'react-icons/fa';
import { CiMenuKebab } from "react-icons/ci";

const ChatWindow: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, []);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log(files); // Handle the selected files
  };

  return (
    <div className="flex flex-col h-screen shadow-lg md:w-3/4 mt-1">
      <div className="flex items-center justify-between border-b dark:bg-gray-800 border-gray-300 dark:border-gray-900 p-4 shadow-lg mt-[4rem]">
        <div className='flex items-center'>
            <img
            src="https://via.placeholder.com/40" // Placeholder for the profile image
            alt="Profile"
            className="w-10 h-10 rounded-full mr-4"
            />
            <div className='flex flex-col justify-evenly'>
            <h1 className='font-semibold'>Name</h1>
            <small className='text-gray-400'>last seen 10:00 pm</small>
            </div>
            
        </div>
        
        <CiMenuKebab />
        
      </div>
      <div
        className="flex-1 p-4 overflow-y-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        <div className="chat chat-end">
          <div className="chat-bubble bg-blue-700 text-white">Hey! Listen</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble bg-blue-700 text-white">
            I really like your idea, but I still think we can do more in this.
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble bg-blue-700 text-white">I will share something</div>
        </div>
        <div className="chat chat-start">
          <div className="chat-bubble bg-gray-400 text-black">
            Let's together work on this and create something more awesome.
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble bg-blue-700 text-white">Sounds perfect</div>
        </div>
        <div className="chat chat-start">
          <div className="chat-bubble bg-gray-200 text-black">
            So, can you come at my place at around 8 PM today?
          </div>
        </div>
        <div className="chat chat-start">
          <div className="chat-bubble bg-gray-200 text-black">
            So, can you come at my place at around 8 PM today?
          </div>
        </div>
        <div className="chat chat-start">
          <div className="chat-bubble bg-gray-200 text-black">
            So, can you come at my place at around 8 PM today?
          </div>
        </div>
        <div className="chat chat-start">
          <div className="chat-bubble bg-gray-200 text-black">
            So, can you come at my place at around 8 PM today?
          </div>
        </div>
        <div className="chat chat-start">
          <div className="chat-bubble bg-gray-200 text-black">
            So, can you come at my place at around 8 PM today?
          </div>
        </div>
        <div className="chat chat-start">
          <div className="chat-bubble bg-gray-200 text-black">
            So, can you come at my place at around 8 PM today?
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble bg-blue-700 text-white">I'll be there</div>
        </div>
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 flex  dark:bg-gray-800">
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
        />
        <button className="ml-2 bg-blue-700 text-white p-3 rounded-full">
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
