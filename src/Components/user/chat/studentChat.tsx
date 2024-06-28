// import ChatList from '@/Components/common/chat/chatList';
// import ChatWindow from '@/Components/common/chat/chatWindow';
// import React, {  useEffect, useState } from 'react';
// import { useSocket } from '@/context/socketContext';
// import { useAppDispatch, useAppSelector } from '@/hooks/hooke';
// import { RootState } from '@/redux/store';
// import { getChatByUserIdAction } from '@/redux/store/actions/chat/getChatByUserIdAction';

// const StudentChat: React.FC = () => {
//     const dispatch = useAppDispatch();
//     const { data } = useAppSelector((state: RootState) => state.user);
//     const { socket } = useSocket();
//     const [onlineUsers, setOnlineUsers] = useState<any>([]);
//     const [participants, setParticipants] = useState<any[]>([]);

//     useEffect(()=>{
//         getData()
//       },[dispatch])
    
      
//       const getData = async () =>{
//         console.log('this is workign')
//         const response: any = await dispatch(getChatByUserIdAction({ userId: data.data._id }));
    
//         if (response.payload && response.payload.success) {
//           console.log('this is created chat working...', response.payload.data);
    
//           // Extract unique participants along with chat IDs, excluding the current user's ID
//           const uniqueParticipants = new Set<string>();
//           const otherParticipants = response.payload.data.reduce((acc: any[], chat: any) => {
//             chat.participants.forEach((participant: any) => {
//               if (participant._id !== data.data._id && !uniqueParticipants.has(participant._id)) {
//                 uniqueParticipants.add(participant._id);
//                 acc.push({ chatId: chat._id, participant });
//               }
//             });
//             return acc;
//           }, []);
    
//           setParticipants(otherParticipants);
//           console.log('Filtered participants with chat IDs:', otherParticipants);
//         }
//       }
    
//     useEffect(() => {
//         if (socket) {
//           const handleOnlineUsers = (data: any) => {
//             console.log('Received online users:', data);
//             setOnlineUsers(data);
//           };
    
//           socket.on('getOnlineUser', handleOnlineUsers);
    
//           return () => {
//             socket.off('getOnlineUser', handleOnlineUsers);
//           };
//         }
//       }, [socket]);

//       const creteNewChat = () =>{

//       }

//   return (
//     <div className="flex h-screen overflow-hidden ">
//       <ChatList onlineUsers={onlineUsers} users={participants} createNewChat={creteNewChat} />
//       <ChatWindow />
//     </div>
  
//   );
// }

// export default StudentChat;
