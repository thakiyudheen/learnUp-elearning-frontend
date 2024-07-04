// import React, { useEffect, useState } from 'react';
// import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { useLocation } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '@/hooks/hooke';
// import { createAssessmentAction } from '@/redux/store/actions/assessment/createAssesmentAction';
// import { RootState } from '@/redux/store';
// import { ToastContainer, toast } from 'react-toastify';
// import QuestionList from './QuestionList';
// import { getAllAssessmentAction } from '@/redux/store/actions/assessment/getAllAssessment';
// import LoadingIndicator from '@/Components/common/skelton/loading';
// ;

// interface Option {
//   id: string;
//   text: string;
// }

// interface Question {
//   courseId: string;
//   question: string;
//   correctAnswer: string;
//   options: Option[];
// }



// const validationSchema = Yup.object({


//   question: Yup.string().required('Question is required'),
//   correctAnswer: Yup.string().required('Correct answer is required'),
//   options: Yup.array()
//     .of(
//       Yup.object({
//         text: Yup.string().required('Option text is required')
//       })
//     )
//     .min(4, 'There must be exactly 4 options')
//     .max(4, 'There must be exactly 4 options')
// });

// const AddAssessment: React.FC = () => {

//   const {data} = useAppSelector((state:RootState)=>state.user)
//   const location = useLocation()
//   const dispatch = useAppDispatch()
//   const [question,setQuestions] = useState<any>([])
//   const [isLoading,setLoading]=useState<boolean>(false)

//   const handleSubmit = async (values: any ) => {
//     setLoading(true)
//     values.instructorId  = data?.data?._id

//     const response =await dispatch(createAssessmentAction(values))
//     if (response.payload.success) {
//       console.log('Form values:', response.payload.data);
//       setQuestions([...response.payload.data.questions].reverse());
//       console.log('thissi s updat',question)

//     }

//     setLoading(false)
//     toast.success("Added sussfully")

//   };

//   useEffect(()=>{
//     const getData =async () =>{
//       const response = await dispatch(getAllAssessmentAction({courseId:location?.state}))
//       if(response.payload.success){
//         setQuestions(response.payload.data[0].questions.reverse())
//       }
//     }
//     getData()
//   },[dispatch])




//   const initialValues: Question = {
//     courseId:location?.state||"",
//     question: '',
//     correctAnswer: '',
//     options: [
//       { id: 'opt1', text: '' },
//       { id: 'opt2', text: '' },
//       { id: 'opt3', text: '' },
//       { id: 'opt4', text: '' }
//     ]
//   };

//   return (
//     <div className='p-8 '>
//     <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-800 shadow-lg text-white rounded-lg">

//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ values }) => (
//           <Form className="space-y-6 w-full max-w-4xl mx-auto     dark:shadow-none  rounded-lg p-5">
//             {isLoading && <LoadingIndicator/>}
//              <h1 className='font-bold text-black dark:text-gray-300'>Add Exam</h1>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="col-span-1">
//                 <label htmlFor="text" className="block dark:text-gray-300 text-black">Question</label>
//                 <Field
//                   id="question"
//                   name="question"
//                   placeholder="Enter the question"
//                   className="mt-1 p-2 w-full border-b border-gray-600 dark:bg-gray-800 bg-white text-gray-300 focus:outline-none focus:border-blue-500"
//                 />
//                 <ErrorMessage name="question" component="small" className="text-red-500 text-sm" />
//               </div>

//               <div className="col-span-1">
//                 <label htmlFor="correctAnswer" className="block dark:text-gray-300 text-black">Correct Answer</label>
//                 <Field
//                   id="correctAnswer"
//                   name="correctAnswer"
//                   placeholder="Enter the correct answer"
//                   className="mt-1 p-2 w-full border-b border-gray-600 dark:bg-gray-800 bg-white dark:text-gray-500 text-black focus:outline-none focus:border-blue-500"
//                 />
//                 <ErrorMessage name="correctAnswer" component="small" className="text-red-500 text-sm" />
//               </div>
//             </div>

//             <FieldArray name="options">
//               {() => (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {values.options.map((option, index) => (
//                     <div key={index} className="col-span-1">
//                       <label htmlFor={`options.${index}.text`} className="block dark:text-gray-300 text-black">
//                         Option {index + 1}
//                       </label>
//                       <Field
//                         id={`options.${index}.text`}
//                         name={`options.${index}.text`}
//                         placeholder={`Option ${index + 1}`}
//                         className="mt-1 p-2 w-full border-b border-gray-600 dark:bg-gray-800 bg-white dark:text-gray-500 text-black focus:outline-none focus:border-blue-500"
//                       />
//                       <ErrorMessage name={`options.${index}.text`} component="small" className="text-red-500 text-sm" />
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </FieldArray>
//             <div className='flex justify-end '>
//             <button type="submit" className="mt-6 py-1 px-4 bg-blue-700  text-white rounded hover:bg-blue-700">
//               Add Question
//             </button>
//             </div>


//           </Form>
//         )}
//       </Formik>

//     </div>
//      <QuestionList question={question} />
//     </div>
//   );
// };

// export default AddAssessment;

import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/hooke';
import { createAssessmentAction } from '@/redux/store/actions/assessment/createAssesmentAction';
import { RootState } from '@/redux/store';
import { ToastContainer, toast } from 'react-toastify';
import QuestionList from './QuestionList';
import { getAllAssessmentAction } from '@/redux/store/actions/assessment/getAllAssessment';
import LoadingIndicator from '@/Components/common/skelton/loading';
import { deleteAssessmentAction } from '@/redux/store/actions/assessment/deleteAssessmentAction';
import { updateAssessmentAction } from '@/redux/store/actions/assessment/updateAssessmentAction';

interface Option {
  id: string;
  text: string;
}

interface Question {
  isEdit?:boolean;
  courseId: string;
  question: string;
  correctAnswer: string;
  options: Option[];
}

const validationSchema = Yup.object({
  question: Yup.string().required('Question is required'),
  correctAnswer: Yup.string().required('Correct answer is required'),
  options: Yup.array()
    .of(
      Yup.object({
        text: Yup.string().required('Option text is required')
      })
    )
    .min(4, 'There must be exactly 4 options')
    .max(4, 'There must be exactly 4 options')
});

const AddAssessment: React.FC = () => {
  const { data } = useAppSelector((state: RootState) => state.user);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [questions, setQuestions] = useState<any>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isEdit, setEdit] = useState<boolean>(false)

  const handleSubmit = async (values: any) => {
    setLoading(true);
    values.instructorId = data?.data?._id;
    if(!isEdit){
      const response = await dispatch(createAssessmentAction(values));
      if (response.payload.success) {
        console.log('Form values:', response.payload.data);
        setQuestions([...response.payload.data.questions].reverse());
       
        setLoading(false);
        toast.success("Added successfully")
      }
    }else{
      const response = await dispatch(updateAssessmentAction(values));
      if (response.payload.success) {
        console.log('Form values:', response.payload.data);
        setQuestions([...response.payload.data.questions].reverse());
        console.log('thissi s updat', questions);
        setEdit(false)
        setEditingQuestion(null);
        
    setLoading(false);
    toast.success("updated successfully")
      }
    }

   
;
  };

  useEffect(() => {
    const getData = async () => {
      const response = await dispatch(getAllAssessmentAction({ courseId: location?.state }));
      if (response.payload.success) {
        setQuestions(response.payload.data[0].questions.reverse());
      }
    };
    getData();
  }, [dispatch]);

  const handleEdit = (question: Question) => {
    setEdit(true)
    console.log('real',isEdit)
    setEditingQuestion({...question,isEdit:isEdit,courseId:location?.state});
  };
  const handleCancel = () => {
    setEdit(false)
    setEditingQuestion(null);
  };
  const handleDelete =async (question:any) => {
    const response = await dispatch(deleteAssessmentAction({_id:question._id,courseId:location.state}))
    if(response?.payload&&response?.payload?.success){
      setQuestions((prevQuestions: any) => prevQuestions.filter((q: any) => q._id !== question._id));
      toast.success("Question deleted successfully");
    }else{
      toast.error('minimum 3 questions is needed!!')
    }

   
  };



  const initialValues: Question = editingQuestion || {
    isEdit:isEdit,
    courseId: location?.state || "",
    question: '',
    correctAnswer: '',
    options: [
      { id: 'opt1', text: '' },
      { id: 'opt2', text: '' },
      { id: 'opt3', text: '' },
      { id: 'opt4', text: '' }
    ]
  };

  return (
    <div className='p-8 '>
      <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-800 shadow-lg text-white rounded-lg">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form className="space-y-6 w-full max-w-4xl mx-auto dark:shadow-none rounded-lg p-5">
              {isLoading && <LoadingIndicator />}
              <h1 className='font-bold text-black dark:text-gray-300'>Add Exam</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label htmlFor="text" className="block dark:text-gray-300 text-black">Question</label>
                  <Field
                    id="question"
                    name="question"
                    placeholder="Enter the question"
                    className="mt-1 p-2 w-full border-b border-gray-600 dark:bg-gray-800 bg-white text-gray-300 focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage name="question" component="small" className="text-red-500 text-sm" />
                </div>

                <div className="col-span-1">
                  <label htmlFor="correctAnswer" className="block dark:text-gray-300 text-black">Correct Answer</label>
                  <Field
                    id="correctAnswer"
                    name="correctAnswer"
                    placeholder="Enter the correct answer"
                    className="mt-1 p-2 w-full border-b border-gray-600 dark:bg-gray-800 bg-white dark:text-gray-500 text-black focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage name="correctAnswer" component="small" className="text-red-500 text-sm" />
                </div>
              </div>

              <FieldArray name="options">
                {() => (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {values.options.map((option, index) => (
                      <div key={index} className="col-span-1">
                        <label htmlFor={`options.${index}.text`} className="block dark:text-gray-300 text-black">
                          Option {index + 1}
                        </label>
                        <Field
                          id={`options.${index}.text`}
                          name={`options.${index}.text`}
                          placeholder={`Option ${index + 1}`}
                          className="mt-1 p-2 w-full border-b border-gray-600 dark:bg-gray-800 bg-white dark:text-gray-500 text-black focus:outline-none focus:border-blue-500"
                        />
                        <ErrorMessage name={`options.${index}.text`} component="small" className="text-red-500 text-sm" />
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>
              <div className='flex justify-end '>
                {isEdit &&
                  (<div className='mr-3 mt-7'>
                    <a className='py-1 px-6 border border-[red] text-[red] rounded-lg flex items-center' onClick={handleCancel}>cancel</a>
                  </div>)}


                <button type="submit" className="mt-6 py-1 px-4 bg-blue-700 text-white rounded-lg hover:bg-blue-700">
                  {editingQuestion ? "Update Question" : "Add Question"}
                </button>

              </div>

            </Form>
          )}
        </Formik>
      </div>
      <QuestionList question={questions} onEdit={handleEdit} onDelete={handleDelete} setEdit={setEdit} />
    </div>
  );
};

export default AddAssessment;

