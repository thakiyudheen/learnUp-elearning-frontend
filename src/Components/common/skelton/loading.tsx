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

const LoadingIndicator: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <dotlottie-player
        src="https://lottie.host/5a15fcda-33b9-4804-adb7-d0d45ddb5adf/6ViL1HZNqp.json"
        background="transparent"
        speed={1}
        style={{ width: '200px', height: '200px' }}
        loop
        autoplay
      ></dotlottie-player>
    </div>
  );
};

export default LoadingIndicator;


