// import React from 'react';
// import { MdDelete } from "react-icons/md";
// import { FiEdit } from "react-icons/fi";


// const QuestionList: React.FC<any> = ({ question }) => {
//   console.log('the real',question)
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 p-1">
//       {question?.map((question : any ) => (
//         <div key={question?.questions?._id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
//         <div className='flex justify-between'>
//         <h3 className="font-bold text-lg mb-2 dark:text-gray-300 text-black">{question?.question}</h3>
//         <div className='flex items-center'>
//         <FiEdit className='mr-2 text-gray-400'/>
//         <MdDelete className='text-gray-400 text-[20px]'/>

//         </div>
//         </div>
          
//           <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Correct Answer: {question.correctAnswer}</p>
//           <ul className="space-y-2">
//             {question.options.map((option:any,index:any) => (
//               <li key={option.id} className="text-gray-700 dark:text-gray-300">
//                 {`${index+1} : ${option.text}`}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default QuestionList;

import React from 'react';
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const QuestionList: React.FC<any> = ({ question, onEdit ,onDelete,setEdit}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 p-1">
      {question?.map((question: any) => (
        <div key={question?._id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className='flex justify-between'>
            <h3 className="font-bold text-lg mb-2 dark:text-gray-300 text-black">{question?.question}</h3>
            <div className='flex items-center'>
              <FiEdit className='mr-2 text-gray-400' onClick={() => {onEdit(question); setEdit(true)}} />
              <MdDelete className='text-gray-400 text-[20px]' onClick={() => onDelete(question)}/>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Correct Answer: {question.correctAnswer}</p>
          <ul className="space-y-2">
            {question.options.map((option: any, index: any) => (
              <li key={option.id} className="text-gray-700 dark:text-gray-300">
                {`${index + 1} : ${option.text}`}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
