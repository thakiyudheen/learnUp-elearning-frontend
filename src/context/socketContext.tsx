
import { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '@/hooks/hooke';
import { RootState } from '@/redux/store';

interface SocketContextProps {
  socket: Socket | null;
  sendMessage?: (message: string) => void;
}

const SocketContext = createContext<SocketContextProps>({
  socket: null,
  sendMessage: () => {},
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state: RootState) => state.user);

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (data?.data) {
      const newSocket = io(import.meta.env.VITE_SERVER_URL, { transports: ['websocket'], withCredentials:true });
      

      newSocket.on('connect', () => {
        console.log("WebSocket connected successfully", data.data);
        // newSocket.emit('onlineUsers', { userId: data.data._id });
      });

      newSocket.on('disconnect', () => {
        console.log('WebSocket disconnected');
      });

      setSocket(newSocket);

      return () => {
        if (newSocket) {
          newSocket.disconnect();
        }
      };
    }
  }, [data]);

  const sendMessage = (message: string) => {
    if (socket) {
      socket.emit('chat message', message);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};
