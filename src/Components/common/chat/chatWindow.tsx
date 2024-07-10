import React, { useEffect, useRef, useState } from 'react';
import { CiMenuKebab } from "react-icons/ci";
import { BsChatRightQuote } from "react-icons/bs";
import { useAppSelector } from '@/hooks/hooke';
import { RootState } from '@/redux/store';
import { useSocket } from '@/context/socketContext';
import { FaPaperclip, FaPaperPlane, FaSmile, FaMicrophone, FaFileAlt, FaImage } from 'react-icons/fa';
import Picker from 'emoji-picker-react';
import { FileUpload } from '@/utils/cloudinary/imgVideoUpload';
import { PdfUpload } from '@/utils/cloudinary/uploadPdf';
import { FaDownload, FaSpinner, FaStop } from 'react-icons/fa';
import { audioUpload } from '@/utils/cloudinary/audioUpoad';
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner'
import { IoCallOutline } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import Peer from 'peerjs'
import { IoCall } from "react-icons/io5";
import { NewVideoCall } from '@/Components/instructor/chat/newVideoCall';



interface ChatWindowProps {
  messages: any[];
  currentUser: any;
  onSendMessage: (message: string, contentType?: string) => void;
  currentChat: any;
  isTyping: any;
  setRes: any;
  isRes: boolean;
  role: string;
  handleClick:any;
  isRing:boolean
  

}
// setAnswer,
// isAnswer,
// isRing,
// setRing
//   setAnswer?:any
//   isAnswer?:any,
//   isRing?:any,
//   setRing?:any
const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  currentUser,
  onSendMessage,
  currentChat,
  isTyping,
  setRes,
  isRes,
  role,
  handleClick,
  isRing
 
}) => {
  const { socket } = useSocket();
  const { data } = useAppSelector((state: RootState) => state.user);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>('');
  const [showPopup, setShowPopup] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [contentType, setContentType] = useState<string | null>(null)
  const [downloading, setDownloading] = useState(null);
  const [isAnswer,setAnswer]= useState<any>(false)

  // audio  ---------------------------------------
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<any>(null);
  const mediaRecorderRef: any = useRef(null);
  const audioChunks: any = useRef([]);
  const navigate = useNavigate()

  



  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event: any) => {
      audioChunks.current.push(event?.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob: any = new Blob(audioChunks.current, { type: 'audio/wav' });
      const url = await audioUpload(audioBlob)
      setMessage(url)
      console.log('the url ', url)
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      audioChunks.current = [];
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const sendAudio = async () => {
    setMessage(audioUrl)
    console.log('the main url which i want', message)
    onSendMessage(message, 'audio')
    setMessage('')
    setAudioUrl(null);
  };


  const handleDownloadClick = (url: any, index: any) => {
    setDownloading(index);

    // Simulate download delay
    setTimeout(() => {
      setDownloading(null);
    }, 2000);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const selected = files[0];
    setSelectedFile(selected);

    if (selected.type.startsWith('image') || selected.type.startsWith('video')) {
      const fileUrl = await FileUpload(selected);
      console.log(fileUrl.secure_url)
      setPreviewUrl(fileUrl.secure_url); // Preview image or video
      const messageType = files[0].type.startsWith('image') ? 'image' : 'video';
      setContentType(messageType)
    } else {
      const fileUrl = await PdfUpload(selected);
      setPreviewUrl(fileUrl); // Preview PDF or other document types
      setContentType('files')
    }
  };

  const handleSend = async () => {
    console.log('here reaached')
    if (selectedFile) {
      let messageToSend = '';
      if (selectedFile.type.startsWith('image') || selectedFile.type.startsWith('video')) {

        messageToSend = `${previewUrl}`;
      } else {
        const fileUrl = await PdfUpload(selectedFile);
        messageToSend = `${previewUrl}`;
      }
      onSendMessage(messageToSend, selectedFile.type.split('/')[0] == "application" ? "file" : selectedFile.type.split('/')[0]); // Send image, video, or file message
      setSelectedFile(null);
      setPreviewUrl(null);
    } else {
      if (message.trim() !== '') {
        onSendMessage(message, 'text'); // Send text message
        setMessage('');
      }
    }
  };

  const handleEmojiClick = (event: any, emojiObject: any) => {
    setMessage((prevMessage: string) => prevMessage + event.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileButtonClick = (type: 'image' | 'document') => {
    if (type === 'image') {
      fileInputRef.current?.setAttribute('accept', 'image/*');
    } else {
      fileInputRef.current?.removeAttribute('accept');
    }
    fileInputRef.current?.click();
    setShowPopup(false);
  };

  const getMessageSender = (message: any) => {
    if (typeof message.sender === 'object') {
      return message.sender._id;
    }
    return message.sender;
  };

  function formatFileSize(bytes: any) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
  }

  // handle typing------------------------------
  const handleTyping = () => {
    socket?.emit('isTyping', { isTyping: true, roomId: currentChat?.roomId, sender: data?.data?._id })
  }

  console.log('the last seen', currentChat)
  const isEligible = (role === "instructor") || (role === "student" && (currentChat?.subscriptionType === "Medium" || currentChat?.subscriptionType === "Advance"));
  return (

    <>
      {isRing &&(
        <>
        <div className='bg-black rounded-lg absolute flex  min-h-[50%] z-10 justify-center left-[30%] top-[40%] opacity-70  items-center w-2/4 '>
        Ringing...
        <div>
        {/* onClick={() => setRing(false)} */}
          <div>
            <button className='bg-[red] p-4 rounded-full absolute bottom-7 opacity-90  left-[46%]' >
              <IoCall />
            </button>
          </div>
        </div>
      </div>
      {/* <NewVideoCall localVideoStream={localStream} remoteVideoStream={remoteStream}/> */}
    </>

    )}
      
      {currentChat ? (
        <div className="flex flex-col min-h-screen md:w-3/4 w-full">
           
          <div className="flex items-center justify-between border-b dark:bg-gray-800 border-gray-300 dark:border-gray-900 p-4 shadow-sm mt-[4rem]">
            <div className="flex items-center ">
              <MdArrowBackIosNew className='text-black absolute' onClick={() => setRes(false)} />
              <img
                src={currentChat?.profile?.avatar}
                alt="Profile"
                className="w-10 h-10 rounded-full mr-3 ml-6 "
              />
              <div className="flex flex-col justify-evenly">
                <h1 className="font-semibold">{currentChat?.firstName}</h1>
                <small className="text-gray-400">
                  {isTyping?.isTyping
                    ? "typing..."
                    : currentChat?.isOnline
                      ? "Online"
                      : ` last seen ${new Date(currentChat?.lastSeen).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} `}
                </small>
              </div>
            </div>
            {currentChat.subscriptionType !== 'Advance' && role == 'student' ? (
              <button
                className='border-2 border-blue-700 text-blue-600 py-1 px-5 rounded-lg '
                onClick={() => navigate('/subscription', { state: { instructorId: currentChat?._id, chatId: currentChat?.chatId } })}
              >
                Subscribe
              </button>
            ) : (
              <div className='flex justify-between items-center'>
                {/* <CiVideoOn  className='text-[4vh] mr-5'/> */}
                {/* navigate('/peervideo', { state: currentChat?.roomId }) */}
                <FaVideo className='text-[3vh] text-gray-500 mr-5' onClick={handleClick} />
                <IoCallOutline className='text-[3vh] text-gray-500 mr-4' />
              </div>
            )}

          </div>
          <div
            className="flex-1 p-4 overflow-y-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {messages.map((message: any, index: number) => (
              <div
                key={index}
                className={`chat ${getMessageSender(message) === currentUser._id ? 'chat-end' : 'chat-start'}`}
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
                  <small className={`${getMessageSender(message) === currentUser._id ? "text-end relative right-2" : "text-start relative left-2"}`}>{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
                </div>
                <div
                  className={`${message.contentType === 'text'
                    ? getMessageSender(message) === currentUser._id
                      ? 'bg-blue-700 text-white rounded-l-full rounded-tr-full px-3 py-2'
                      : 'bg-gray-400 dark:bg-gray-700 text-white rounded-r-full rounded-t-full px-3 py-2'
                    : getMessageSender(message) === currentUser._id ? 'bg-white dark:bg-blue-600 text-white rounded-l-lg rounded-tr-lg px-1 py-1'
                      : 'bg-gray-400 dark:bg-gray-700 text-white rounded-lg px-1 py-1'
                    }`}
                >
                  <div className="flex">
                    {message.contentType === 'image' ? (
                      <img src={message.content} alt="Image" className="max-w-full h-[150px] rounded-lg" />
                    ) : message.contentType === 'video' ? (
                      <video src={message.content} controls className="max-w-full h-[150px] rounded-lg" />
                    ) : message.contentType === 'file' ? (
                      <div className="flex items-center p-2 border dark:border-gray-800 dark:bg-gray-800 rounded-lg">
                        <FaFileAlt className="w-8 h-8 mr-2 text-[12x]" />
                        <div className="flex flex-col">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            <small>{message.content.split('/').pop()}</small>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {message.contentType.toUpperCase()}
                          </div>
                        </div>
                        <a
                          href={message.content}
                          download
                          onClick={() => handleDownloadClick(message.content, index)}
                          className="flex items-center text-blue-500 underline ml-2 mt-1"
                          target='_blank'
                        >
                          {downloading === index ? (
                            <FaSpinner className="mr-1 animate-spin" />
                          ) : (
                            <FaDownload className="mr-1" />
                          )}
                        </a>
                      </div>
                    ) : message.contentType === 'audio' ? (
                      <div className="flex items-center">
                        <audio controls src={message.content} className="w-[200px]" />
                      </div>
                    ) : (
                      message.content
                    )}
                  </div>

                </div>
                {getMessageSender(message) == currentUser._id && message.recieverSeen && <small>seen</small>}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 flex dark:bg-gray-800 relative">
            {(currentChat.subscriptionType == 'Advance' && role == 'student') || role == 'instructor' ? (
              <button
                className="mr-2 text-gray-500"
                onClick={() => setShowPopup(!showPopup)}
              >
                <FaPaperclip size={20} />
              </button>
            ) : (
              <button
                className="mr-2 text-gray-500"
                onClick={() => { toast.info('Please Subscribe And Try!!') }}
              >
                <FaPaperclip size={20} />
              </button>
            )}

            {showPopup && (
              <div className="absolute bottom-16 left-4 bg-white dark:bg-gray-700 rounded-md shadow-lg p-2">
                <div className="flex flex-col space-y-2">
                  <button className="flex items-center text-gray-700 dark:text-gray-200" onClick={() => handleFileButtonClick('document')}>
                    <FaFileAlt size={20} className="mr-2" />
                    Document
                  </button>
                  <button className="flex items-center text-gray-700 dark:text-gray-200" onClick={() => handleFileButtonClick('image')}>
                    <FaImage size={20} className="mr-2" />
                    Photos & Videos
                  </button>
                </div>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            {previewUrl && (
              <div className="flex items-center w-full mt-2 justify-evenly">
                {contentType === 'image' ? (
                  <img src={previewUrl} alt="Preview" className="max-w-full h-[200px] rounded-lg" />
                ) : contentType === 'video' ? (
                  <video src={previewUrl} controls className="max-w-full h-[200px] rounded-lg" />
                ) : (
                  <div className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-400">Preview: {selectedFile?.name}</span>
                  </div>
                )}
                <div>
                  <button className="ml-2 bg-red-600 text-white py-1 px-5 rounded-md" onClick={() => { setPreviewUrl(null); setSelectedFile(null); }}>Cancel</button>
                  <button className="ml-2 bg-green-600 text-white py-1 px-5 rounded-md" onClick={handleSend}>Send</button>
                </div>
              </div>
            )}
            {!previewUrl && (
              <>
                <input
                  type="text"
                  placeholder="Type a message here..."
                  className="flex-1 pl-5 dark:text-gray-200 border py-2 dark:border-gray-800 border-gray-300 dark:bg-gray-700 bg-gray-300 focus:outline-none text-gray-800 rounded-full"
                  value={message}
                  onChange={(e) => { setMessage(e.target.value); handleTyping(); }}
                />
                <button className="ml-2 text-gray-500" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                  <FaSmile size={20} />
                </button>
                {showEmojiPicker && (
                  <div className="absolute bottom-16 right-4 bg-white dark:bg-gray-700 rounded-md shadow-lg p-2">
                    <Picker onEmojiClick={handleEmojiClick} />
                  </div>
                )}
                {isEligible ? (
                  <div className="flex items-center">
                    {audioUrl ? (
                      <div className="flex items-center">
                        <audio controls src={audioUrl} className="mr-2 ml-2" />
                        <button className="ml-2 bg-blue-700 text-white p-2 rounded-full" onClick={sendAudio}>
                          <FaPaperPlane />
                        </button>
                        <button className="ml-2 bg-red-600 text-white p-2 rounded-full" onClick={() => setAudioUrl(null)}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        {recording ? (
                          <button className="ml-2 text-red-600" onClick={stopRecording}>
                            <FaStop size={20} />
                          </button>
                        ) : (
                          <button className="ml-2 text-gray-500" onClick={startRecording}>
                            <FaMicrophone size={20} />
                          </button>
                        )}
                        <button className="ml-2 bg-blue-700 text-white p-3 rounded-full" onClick={handleSend}>
                          <FaPaperPlane />
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  // <div className='w-3/4 flex justify-center items-center flex-col'>
                  //   <TiInfo className='text-gray-400 text-[5rem]' />
                  //   <small className='text-gray-400'>Please Subscribe And Start Chatting</small>
                  //   <button
                  //     className='border-2 border-blue-700 text-blue-600 py-1 px-5 rounded-lg mt-7'
                  //     onClick={() => navigate('/subscription', { state: { instructorId: currentChat?._id, chatId: currentChat?.chatId } })}
                  //   >
                  //     Subscribe
                  //   </button>
                  // </div>
                  null
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <div className='w-3/4 mt-10 flex justify-center flex-col items-center block'>
          <BsChatRightQuote className='w-full text-[2rem] text-gray-400' />
          <small className='flex justify-center items-center flex-col w-full text-gray-500'>please click any user and chat ...</small>
        </div>
      )}
    </>
  );

};

export default ChatWindow;
