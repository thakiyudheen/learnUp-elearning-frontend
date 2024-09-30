// SkeletonCard.tsx
import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="min-w-md dark:bg-gray-800 bg-white rounded-lg overflow-hidden m-3 shadow-lg transform transition-transform hover:scale-105  md:h-[26rem] border dark:border-gray-800 cursor-pointer animate-pulse">
      <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
      <div className="px-6 py-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
        <div className="flex flex-col justify-between flex-grow space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 mr-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
          </div>
          <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
