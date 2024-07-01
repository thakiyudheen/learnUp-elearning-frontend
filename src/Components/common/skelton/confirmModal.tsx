import React from 'react';
import { motion } from 'framer-motion';

const ConfirmModal = ({ message, onCancel, onConfirm }: any) => {
   
  return (
    <div className='w-full h-screen flex items-center justify-center fixed top-0 left-0 z-50 bg-black bg-opacity-50'>
      <motion.div
        className='w-96 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg p-6 relative'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <div className='text-gray-700 font-semibold dark:text-gray-400 mb-4 '>{`Are you sure ${message}?`}</div>
        <div className='flex justify-end'>
          <button
            className='  text-red-600 border hover:text-white hover:bg-red-700 border-red-700 font-semibold py px-4 rounded mr-2'
            onClick={onCancel}
          >
            <small>Cancel</small> 
          </button>
          <button
            className='border-[green]  text-[green] border hover:text-gray-400 hover:bg-[green] border[green] font-semibold py-1 px-4 rounded'
            onClick={onConfirm}
          >
           <small>OK</small> 
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmModal;
