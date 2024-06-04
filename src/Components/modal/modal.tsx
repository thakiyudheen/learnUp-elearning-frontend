import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface ModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  message:string
}

const Modal: React.FC<ModalProps> = ({ onConfirm, onCancel, message }) => {
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    hidden: { opacity: 0, scale: 0.9 },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-40 flex min-h-full items-center overflow-x-hidden overflow-y-auto transition"
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 h-full w-full cursor-pointer bg-black/50"
          onClick={onCancel}
          aria-hidden="true"
        />

        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="relative m-auto max-w-sm cursor-pointer p-4 transition pointer-events-none w-full"
        >
          <div className="relative mx-auto max-w-sm cursor-default rounded-xl bg-white py-2 pointer-events-auto dark:bg-gray-800 w-full">
            <button
              type="button"
              className="absolute top-2 right-2 rtl:left-2 rtl:right-auto"
              onClick={onCancel}
              tabIndex={-1}
            >
              <svg
                className="h-4 w-4 cursor-pointer text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Close</span>
            </button>

            <div className="p-2 space-y-2">
              <div className="p-4 text-center space-y-2 dark:text-white">
                {/* <h2 className="text-xl font-bold tracking-tight">{message}</h2> */}
                <p className="text-gray-500 text-white">{message}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="px-2 border-t dark:border-gray-700" aria-hidden="true" />
              <div className="px-6 py-2">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-2">
                  <button
                    type="button"
                    className="inline-flex min-h-[2.25rem] items-center justify-center gap-1 rounded-lg border bg-white px-4 py-1 text-sm font-medium text-gray-800 transition-colors outline-none border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-inset focus:ring-offset-2 focus:ring-primary-600 focus:border-primary-600 focus:bg-primary-50 focus:text-primary-600 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:border-gray-500 dark:focus:ring-offset-0 dark:focus:border-primary-400 dark:focus:bg-gray-800 dark:focus:text-primary-400"
                    onClick={onCancel}
                  >
                    <span className="flex items-center gap-1">Cancel</span>
                  </button>

                  <button
                    type="button"
                    className="inline-flex min-h-[2.25rem] items-center justify-center gap-1 rounded-lg border bg-red-600 px-4 py-1 text-sm font-medium text-white shadow transition-colors outline-none border-transparent hover:bg-red-500 focus:ring-2 focus:ring-inset focus:ring-offset-2 focus:ring-white focus:bg-red-700 focus:ring-offset-red-700 dark:focus:ring-offset-0"
                    onClick={onConfirm}
                  >
                    <span className="flex items-center gap-1">Confirm</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;