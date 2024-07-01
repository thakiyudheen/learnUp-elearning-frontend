import React, { useState, useRef } from 'react';

interface VoicePlayerProps {
  audioSrc: string;
  userName: string;
  timestamp: string;
  duration: string;
}

const VoicePlayer: React.FC<VoicePlayerProps> = ({ audioSrc, userName, timestamp, duration }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-start gap-2.5">
      <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="User avatar" />
      <div className="flex flex-col gap-1 max-w-[320px]">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{userName}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{timestamp}</span>
        </div>
        <div className="p-4 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <button
              onClick={togglePlayPause}
              className="p-2 text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:ring-4 focus:ring-gray-50 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              type="button"
              aria-label="Play/Pause"
            >
              <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 12 16">
                <path d="M3 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm7 0H9a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z"/>
              </svg>
            </button>
            <svg className="w-[145px] md:w-[185px] md:h-[40px]" aria-hidden="true" viewBox="0 0 185 40">
              {/* SVG content for waveform */}
            </svg>
            <span className="text-sm text-gray-900 dark:text-white">{duration}</span>
          </div>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">Delivered</span>
      </div>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="p-2 text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-50 dark:text-white dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
          type="button"
          aria-label="More options"
        >
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 4 15">
            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
          </svg>
        </button>
        {isDropdownOpen && (
          <div ref={dropdownRef} className="absolute right-0 z-10 w-40 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reply</a></li>
              <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Forward</a></li>
              <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Copy</a></li>
              <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a></li>
              <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a></li>
            </ul>
          </div>
        )}
      </div>
      <audio ref={audioRef} src={audioSrc} />
    </div>
  );
};

export default VoicePlayer;