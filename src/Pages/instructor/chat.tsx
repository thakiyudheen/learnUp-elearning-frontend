import ChatList from '@/Components/instructor/chat/chatList';
import ChatWindow from '@/Components/instructor/chat/chatWindow';
import React from 'react';

const Chat: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden ">
      <ChatList />
      <ChatWindow />
    </div>
  
  );
}

export default Chat;
