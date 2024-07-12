
import React, { useEffect, useRef } from 'react';
import { FaMicrophone, FaVideo } from "react-icons/fa6";
// import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineAudioMuted } from "react-icons/ai";
import { IoVideocamOff } from "react-icons/io5";

export const NewVideoCall = ({ remoteStream, localStream, rejectCall, toggleVideo, toggleAudio, isAudioMuted, isVideoMuted }:
    { remoteStream: any, localStream: any, rejectCall: any, toggleAudio: any, toggleVideo: any, isAudioMuted: any, isVideoMuted: any }) => {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        console.log(remoteStream, localStream);

        // Ensure the video refs are available before setting the srcObject
        if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
        if (localVideoRef.current) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [remoteStream, localStream]);

    return (
        <div className="flex flex-col md:h-[605px] md:w-[50%] top-[30%] w-[40%] lg:h-[400px] z-10 h-screen rounded-lg left-[30%]  bg-gray-700 absolute">
            {/* <div className="p-3 text-white text-center bg-gray-800 w-full">
                <IoIosArrowBack className='absolute left-5 top-6 text-[20px]' />
                <h1 className="text-lg font-bold">Kiera Thompson</h1>
                <p className="text-sm">Signal 00:01</p>
            </div> */}
            <div className="flex-1 relative">
                <video
                    ref={remoteVideoRef}
                    autoPlay
                    muted
                    className="w-full h-[400px] object-cover"
                />
                <div className="absolute md:bottom-4 bottom-7 right-4 md:w-1/4 w-2/4 md:h-2/4 h-1/4 bg-base-300 rounded-lg">
                    <video
                        ref={localVideoRef}
                        autoPlay
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
            </div>
            <div className="p-4 flex justify-center space-x-8 mb-4 absolute bottom-0 left-[30%]">
                {isVideoMuted ? (
                    <button className="p-4 bg-gray-600 rounded-full" onClick={toggleVideo}>
                        <IoVideocamOff className='text-[20px]' />
                    </button>
                ) : (
                    <button className="p-4 bg-gray-600 rounded-full" onClick={toggleVideo}>
                        <FaVideo className='text-[20px]' />
                    </button>
                )}

                {isAudioMuted ? (
                    <button className="p-4 bg-gray-600 rounded-full" onClick={toggleAudio}>
                        <AiOutlineAudioMuted className='text-[20px]' />
                    </button>

                ) : (
                    <button className="p-4 bg-gray-600 rounded-full" onClick={toggleAudio}>
                        <FaMicrophone className='text-[20px]' />
                    </button>
                )}


                <button className="p-3 bg-red-600 rounded-full" onClick={rejectCall}>
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};
