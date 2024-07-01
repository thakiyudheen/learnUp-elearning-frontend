

import ChatList from '@/Components/common/chat/chatList';
import ChatWindow from '@/Components/common/chat/chatWindow';
import React, { useEffect, useState } from 'react';
import { useSocket } from '@/context/socketContext';
import { useAppDispatch, useAppSelector } from '@/hooks/hooke';
import { RootState } from '@/redux/store';
import { getChatByUserIdAction } from '@/redux/store/actions/chat/getChatByUserIdAction';
import { createMessageAction } from '@/redux/store/actions/chat/createMessageAction';
import { getMessageByChatIdAction } from '@/redux/store/actions/chat/getMessageByChatIdAction';
import { FaPersonWalkingDashedLineArrowRight } from 'react-icons/fa6';

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

    const createPrivateRoomId = (id1: string, id2: string) => {
        return id1 > id2 ? id1 + "_" + id2 : id2 + "_" + id1;
    };

    const createNewChat = async (users: any, isOnline: boolean | undefined) => {
        try {
            const roomId = createPrivateRoomId(data.data._id, users?.participant?._id);

            setCurrentChat({ ...users?.participant, chatId: users?.chatId, isOnline, roomId });
            setRoomId(roomId);

            const response = await dispatch(getMessageByChatIdAction({ chat: users.chatId }));
            if (response.payload && response.payload.success) {
                setMessages(response.payload.data);
            }

            // Join the room
            if (socket) {
                socket.emit('join-room', roomId);
                console.log(`Joined room ${roomId}`);
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
        const response = await dispatch(getChatByUserIdAction({ userId: data.data._id }));
        if (response.payload && response.payload.success) {
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
        <div className="flex h-screen overflow-y-hidden">
            <ChatList onlineUsers={onlineUsers} users={participants} createNewChat={createNewChat} />
            <ChatWindow 
                messages={messages} 
                isTyping={isTyping} 
                currentChat={currentChat} 
                onSendMessage={onSendMessage} 
                currentUser={data?.data} 
            />
        </div>
    );
};

export default InstructorChat;
