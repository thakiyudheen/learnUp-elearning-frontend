
import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { FaMicrophone } from "react-icons/fa6";
import { toast } from 'sonner'
import { FaVideo } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { useSocket } from '@/context/socketContext';
import { useLocation } from 'react-router-dom';

const PeerVideoComponent = () => {
    const [peerId, setPeerId] = useState<any>('');
    const [remotePeerId, setRemotePeerId] = useState('');
    const [peer, setPeer] = useState<any>(null);
    const localVideoRef = useRef<any>(null);
    const remoteVideoRef = useRef<any>(null);
    const [call, setCall] = useState<any>(null);
    const { socket }= useSocket()
    const location = useLocation()

    useEffect(() => {
        const newPeer = new Peer();


        newPeer.on('open', (id) => {
            setPeerId(id);
            console.log('this is the peer id ',peerId)
            socket?.emit('connectPeers', { peerId: peerId, roomId:"location.state" });
        });
         
         

        newPeer.on('call', (incomingCall) => {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
                localVideoRef.current.srcObject = stream;
                incomingCall.answer(stream);
                incomingCall.on('stream', (remoteStream) => {
                    toast.success('this is working')
                    remoteVideoRef.current.srcObject = remoteStream;
                });
                setCall(incomingCall);
            });
        });

        setPeer(newPeer);

        return () => {
            newPeer.destroy();
        };
    }, [socket]);
    
    useEffect(()=>{
        if(socket){
            socket?.on('connectedPeer',(data)=>{
                console.log('actually connected')
            })
        }
    
    },[socket])

    const callPeer = (id: any) => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            localVideoRef.current.srcObject = stream;
            const outgoingCall = peer.call(id, stream);
            outgoingCall.on('stream', (remoteStream: any) => {

                remoteVideoRef.current.srcObject = remoteStream;

            });
            setCall(outgoingCall);
        });
    };

    console.log('this is the peer id ', peerId)
    // const handleConnect = () => {
        // socket.on('connectSocket',{peerId:peerId,roomId:})
        // callPeer(remotePeerId);
    // };

    return (
        <div className="flex flex-col md:h-[605px] lg:h-[604px] h-screen bg-gray-700">
            
            <div className="p-3 text-white text-center bg-gray-800 w-full ">
                <IoIosArrowBack className='absolute left-5 top-6 text-[20px]' />
                <h1 className="text-lg font-bold">Kiera Thompson</h1>
                <p className="text-sm">Signal 00:01</p>
            </div>
            <div className="flex-1 relative">
                <video
                    ref={localVideoRef}
                    autoPlay
                    muted
                    className="w-full h-[400px] object-cover"
                />

                <div className="absolute md:bottom-4 bottom-7 right-4 md:w-1/4 w-2/4 md:h-2/4 h-1/4 bg-base-300 rounded-lg">
                    <video
                        ref={remoteVideoRef}
                        autoPlay
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
            </div>
            <div className="  p-4 flex justify-center space-x-8 mb-4">
                <button className="p-4 bg-gray-600 rounded-full">
                    <FaVideo className='text-[20px]' />
                </button>
                <button className="p-4 bg-gray-600 rounded-full">
                    <FaMicrophone className='text-[20px]' />
                </button>
                <button className="p-3 bg-red-600 rounded-full">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                </button>
            </div>
        </div>
    );

};

export default PeerVideoComponent;

