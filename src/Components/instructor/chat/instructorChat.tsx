import ChatList from '@/Components/common/chat/chatList';
import ChatWindow from '@/Components/common/chat/chatWindow';
import React, { useEffect, useState } from 'react';
import { useSocket } from '@/context/socketContext';
import { useAppDispatch, useAppSelector } from '@/hooks/hooke';
import { RootState } from '@/redux/store';
import { getChatByUserIdAction } from '@/redux/store/actions/chat/getChatByUserIdAction';
import { createMessageAction } from '@/redux/store/actions/chat/createMessageAction';
import { getMessageByChatIdAction } from '@/redux/store/actions/chat/getMessageByChatIdAction';
import { TiInfo } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';


const InstructorChat: React.FC = () => {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state: RootState) => state.user);
    const { socket } = useSocket();
    const [onlineUsers, setOnlineUsers] = useState<any>([]);
    const [participants, setParticipants] = useState<any[]>([]);
    const [chats, setChats] = useState<any[]>([]);
    const [messages, setMessages] = useState<any[]>([]);
    const [currentChat, setCurrentChat] = useState<any>(null);
    const [roomId, setRoomId] = useState<string | null>(null);
    const [isTyping, setTyping] = useState<any>(null);
    const [isResponsive,setResponsive]=useState<boolean>(false)
    const [isRes,setRes]=useState<boolean>(false)
    const [isLoading,setLoading]=useState<boolean>(false)
    const  navigate = useNavigate()


    const createPrivateRoomId = (id1: string, id2: string) => {
        return id1 > id2 ? id1 + "_" + id2 : id2 + "_" + id1;
    };

    const createNewChat = async (users: any, isOnline: boolean | undefined,lastSeen:any,subscriptionType:any) => {
        try {
            
            console.log('create chat ',subscriptionType)
            const roomId = createPrivateRoomId(data.data._id, users?.participant?._id);

           
            
            setCurrentChat({ ...users?.participant, chatId: users?.chatId, isOnline, roomId, lastSeen,subscriptionType });
            setRoomId(roomId);

            const response = await dispatch(getMessageByChatIdAction({ chat: users.chatId }));
            if (response.payload && response.payload.success) {
                setMessages(response.payload.data);
            }

            // Join the room
            if (socket) {
                socket.emit('join-room', roomId);
                console.log(`Joined room ${roomId}`);
                socket?.emit('seen-message', { sender: currentChat._id, chat: users?.chatId });
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const handleOnlineUsers = (data: any) => {
            setOnlineUsers(data);
        };

        if (socket) {
            socket.on('getOnlineUser', handleOnlineUsers);
            socket.emit('onlineUsers', { userId: data.data._id });
            getData();
        }

        return () => {
            if (socket) {
                socket.off('getOnlineUser', handleOnlineUsers);
            }
        };
    }, [socket, dispatch]);

    const getData = async () => {
        setLoading(true)
        const response = await dispatch(getChatByUserIdAction({ userId: data.data._id }));
        if (response.payload && response.payload.success) {
            console.log('the chat is ', response.payload.data)
            const sortedData = response.payload.data.sort((a: any, b: any) => {
                return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
              });
            const uniqueParticipants = new Set<string>();
            const otherParticipants = sortedData.reduce((acc: any[], chat: any) => {
                chat.participants.forEach((participant: any) => {
                    if (participant._id !== data.data._id && !uniqueParticipants.has(participant._id)) {
                        uniqueParticipants.add(participant._id);
                        acc.push({ chatId: chat._id, participant ,lastSeen: chat?.lastSeen,updatedAt:chat?.updatedAt,subscriptionType:chat?.subscriptionType});
                    }
                });
                return acc;
            }, []);

            const sortedChats = otherParticipants.sort((a: any, b: any): number => {
                return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
              });
            setParticipants(sortedChats);
            setLoading(false)
        }
    };

    useEffect(() => {
        if (socket && currentChat) {
            const handleMessageReceive = (message: any) => {
                console.log('Message received:', message);
                console.log(message.sender, currentChat._id)

                if(message.sender === currentChat._id){
                    message.sender = currentChat
                    
                }else{
                    message.sender = data.data
                }
                console.log(message)
                setMessages((prevMessages) => [...prevMessages, message]);


                // Mark the message as seen
                // if (message.sender !== data.data._id) {
                //     console.log('its working tehn what is theprooblrm')
                //     socket.emit('seen-message', { _id: message.sender._id, chat: currentChat.chatId });
                // }
            };

            const handleTypingEvent = (data: any) => {
                if (data.sender === currentChat._id) {
                    setTyping({ isTyping: true, sender: data.sender });
                    setTimeout(() => {
                        setTyping({ isTyping: false, sender: data.sender });
                    }, 2000);
                }
            };

            socket.on('receive-message', handleMessageReceive);
            socket.on('isTyping', handleTypingEvent);

            return () => {
                socket.off('receive-message', handleMessageReceive);
                socket.off('isTyping', handleTypingEvent);
            };
        }
    }, [socket, currentChat]);

    const onSendMessage = async (message: string,contentType?:string) => {
        console.log('the real sender',data.data)
        if (roomId && currentChat && data?.data?._id) {
            const newMessage = {
                chat: currentChat?.chatId,
                sender: data?.data?._id,
                content: message,
                roomId,
                contentType:contentType
            };
            socket?.emit("send-message", newMessage);
            await dispatch(createMessageAction(newMessage));
        }
    };

    return (
        <div className="flex h-screen overflow-y-hidden dark:bg-base-300">
            
            <ChatList onlineUsers={onlineUsers} users={participants} createNewChat={createNewChat} isRes={isResponsive} setRes={setResponsive} isLoading={isLoading} />
            {data.data.role=='instructor'?
                (<ChatWindow 
                    messages={messages} 
                    isTyping={isTyping} 
                    currentChat={currentChat} 
                    onSendMessage={onSendMessage} 
                    currentUser={data?.data} 
                    isRes={isRes}
                    setRes={setRes}
                    role={'instructor'}
                    
                />): data.data.role=='student'&& currentChat?.subscriptionType!='none' ?
                (<ChatWindow 
                    messages={messages} 
                    isTyping={isTyping} 
                    currentChat={currentChat} 
                    onSendMessage={onSendMessage} 
                    currentUser={data?.data} 
                    isRes={isRes}
                    setRes={setRes}
                    role={'student'}
                    
                />):(
                    <div className='w-3/4  flex justify-center  items-center flex-col'>
                       <TiInfo className='text-gary-400 text-gray-600 text-[5rem] ' />
                       <small className='text-gray-400'>Please Subscibe And Start Chating</small>
                        <button className='border-2 border-blue-700 text-blue-600 py-1 px-5 rounded-lg mt-7' onClick={()=> navigate('/subscription',{state:{instructorId:currentChat?._id,chatId:currentChat?.chatId}})}> Subscribe</button>
                    </div>
                )
            }
            
        </div>
    );
};

export default InstructorChat;


