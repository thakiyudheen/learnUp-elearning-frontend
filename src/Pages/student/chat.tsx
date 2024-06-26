import ChatList from '@/Components/user/chat/chatList';
import ChatWindow from '@/Components/user/chat/chatWindow';
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
