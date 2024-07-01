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
import { FaDownload, FaSpinner,FaStop  } from 'react-icons/fa';
import { audioUpload } from '@/utils/cloudinary/audioUpoad';



interface ChatWindowProps {
  messages: any[];
  currentUser: any;
  onSendMessage: (message: string, contentType?: string) => void;
  currentChat: any;
  isTyping: any;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  currentUser,
  onSendMessage,
  currentChat,
  isTyping,
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
  // audio  ---------------------------------------
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<any >(null);
  const mediaRecorderRef: any = useRef(null);
  const audioChunks: any = useRef([]);



  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event : any) => {
      audioChunks.current.push(event?.data);
    };

    mediaRecorder.onstop =async  () => {
      const audioBlob : any = new Blob(audioChunks.current, { type: 'audio/wav' });
      const url=await audioUpload(audioBlob)
      setMessage(url)
      console.log('the url ',url)
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

  const sendAudio =async  () => {
    setMessage(audioUrl)
    console.log('the main url which i want',message)
    onSendMessage(message,'audio')
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


  return (
    <>
      {currentChat ? (
        <div className="flex flex-col min-h-screen md:w-3/4">
          <div className="flex items-center justify-between border-b dark:bg-gray-800 border-gray-300 dark:border-gray-900 p-4 shadow-sm mt-[4rem]">
            <div className="flex items-center">
              <img
                src={currentChat?.profile?.avatar}
                alt="Profile"
                className="w-10 h-10 rounded-full mr-4"
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
            <CiMenuKebab />
          </div>
          <div
            className="flex-1 p-4 overflow-y-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >

            {messages.map((message: any, index: number) => (
              <div
                key={index}
                className={`chat ${getMessageSender(message) === currentUser._id ? 'chat-end' : 'chat-start'
                  }`}
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
                  // className={` ${
                  //   getMessageSender(message) === currentUser._id ? 'bg-blue-700 text-white rounded-l-full rounded-tr-full px-3 py-2 ' : 'bg-gray-500 dark:bg-gray-700 text-white rounded-r-full rounded-t-full px-3 py-2 '
                  // }`}
                  className={`${message.contentType === 'text'
                      ? getMessageSender(message) === currentUser._id
                        ? 'bg-blue-700 text-white rounded-l-full rounded-tr-full px-3 py-2'
                        : 'bg-gray-400 dark:bg-gray-700 text-white rounded-r-full rounded-t-full px-3 py-2'
                      : getMessageSender(message) === currentUser._id ? 'bg-white dark:bg-base-100 text-white rounded-l-lg rounded-tr-lg px-2 py-3'
                        : 'bg-gray-400 dark:bg-gray-700 text-white rounded-lg px-2 py-2'
                    }`}
                >
                  <div className="flex">
                  {message.contentType === 'image' ? (
  <img src={message.content} alt="Image" className="max-w-full h-[150px] rounded-lg" />
) : message.contentType === 'video' ? (
  <video src={message.content} controls className="max-w-full h-[150px] rounded-lg" />
) : message.contentType === 'file' ? (
  <div className="flex items-center p-2 border dark:border-gray-800 dark:bg-gray-800 rounded-lg">
    <FaFileAlt className="w-8 h-8 mr-2 text-[12x]" /> {/* React icon for file */}
    <div className="flex flex-col ">
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
      {/* Download */}
    </a>
  </div>
) : message.contentType === 'audio' ? (
  
  <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md">
    <img src={""} alt="Profile" className="w-5 h-5 rounded-full mr-4" />
    <audio controls src={message.content} className="mr-2 ml-2 dark:bg-gray-800" />
    {/* You can add additional controls or styling for the audio player if needed */}
  </div>
 
) : (
  message.content
)}
                  </div>

                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 flex dark:bg-gray-800 relative">
            <button
              className="mr-2 text-gray-500"
              onClick={() => setShowPopup(!showPopup)}
            >
              <FaPaperclip size={20} />
            </button>

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
            {/* {!previewUrl && (
              <>
                <input
                  type="text"
                  placeholder="Type a message here..."
                  className="flex-1 pl-5 dark:text-gray-200 border dark:border-gray-800 border-gray-300 dark:bg-gray-700 bg-gray-300 focus:outline-none text-gray-800 rounded-full"
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
                <button className="ml-2 text-gray-500" onClick={() => {  }}>
                  <FaMicrophone size={20} />
                </button>
                <button className="ml-2 bg-blue-700 text-white p-3 rounded-full" onClick={handleSend}>
                  <FaPaperPlane />
                </button>
              </>)} */}
                {!previewUrl && (
        <>
          <input
            type="text"
            placeholder="Type a message here..."
            className="flex-1 pl-5 dark:text-gray-200 border dark:border-gray-800 border-gray-300 dark:bg-gray-700 bg-gray-300 focus:outline-none text-gray-800 rounded-full"
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
        </>
      )}



          </div>
        </div>
      ) : (
        <div className='w-3/4 mt-10 flex justify-center flex-col items-center'>
          <BsChatRightQuote className='w-full text-[2rem] text-gray-400' />
          <small className='flex justify-center items-center flex-col w-full text-gray-500'>please click any user and chat ...</small>
        </div>
      )}
    </>
  );
};

export default ChatWindow;
