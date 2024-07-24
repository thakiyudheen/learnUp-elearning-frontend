// import React from 'react';

// const LoadingIndicator: React.FC = () => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
//       <div className="w-10 h-10 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
//     </div>
//   );
// };

// export default LoadingIndicator;

import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
  
      <FaSpinner className="animate-spin mr-2 text-[35px] text-blue-900 " />
        
    </div>
  );
};

export default LoadingIndicator;


