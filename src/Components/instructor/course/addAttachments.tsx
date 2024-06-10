import React from 'react';
import { Formik, FieldArray, Field, ErrorMessage } from 'formik';
import { FiTrash2 } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import * as Yup from 'yup';
import { useTheme } from '@/Components/ui/theme-provider';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '@/redux/store';
import { useAppSelector } from '@/hooks/hooke';

const AttachmentField: React.FC = () => {
  const {theme}= useTheme()
  const location =useLocation()
  const navigate = useNavigate()
  
  const {data } = useAppSelector((state:RootState)=> state.category) 
  const validationSchema = Yup.object().shape({
    attachments: Yup.array()
      .of(
        Yup.object().shape({
          title: Yup.string().required('Resource Title is required'),
          url: Yup.string().required('Resource URL is required'),
        })
      )
      .min(1, 'At least one attachment is required'),
  });

  const user = useAppSelector((state:RootState)=> state.user )
  console.log('this is user',user)
  const handleSubmit = (values : any ) =>{
    let allData = {...values,...location.state,instructorRef:user?.data.data._id}
     console.log('this is the all data',allData)

  }

  return (
    <div className="max-w-4xl mx-auto py-8 min-h-screen">
      <h2 className="text-white mb-4">Attachments</h2>
      <Formik
        initialValues={{ attachments: [{ title: '', url: '' }] }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}
      >
        {({ values, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FieldArray name="attachments">
              {({ push, remove }) => (
                <>
                  {values.attachments.map((_, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex-col  items-center justify-between mb-2">
                        <div className="flex-grow">
                          <Field
                            type="text"
                            placeholder="Resource URL"
                            className={`border-b border-gray-500 w-full py-2 mr-2 ${theme=='light'?'bg-white':'bg-[#1D232A]'} text-white outline-none`}
                            name={`attachments[${index}].url`}
                          />
                          <ErrorMessage name={`attachments[${index}].url`} component="small" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div className="flex-grow">
                          <Field
                            type="text"
                            placeholder="Resource Title"
                            className={`border-b border-gray-500 w-full py-2 mr-2 ${theme=='light'?'bg-white':'bg-[#1D232A]'} text-white outline-none`}
                            name={`attachments[${index}].title`}
                          />
                          <ErrorMessage name={`attachments[${index}].title`} component="small" className="text-red-500 text-sm mt-1" />
                        </div>
                        {values.attachments.length > 1 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500 mt-4"
                          >
                            <FiTrash2 size={20} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push({ title: '', url: '' })}
                    className="text-blue-500 flex items-center"
                  >
                    <AiOutlinePlus size={20} className="mr-2" />
                    Add Resource
                  </button>
                </>
              )}
            </FieldArray>
            <button type="submit" className="bg-gradient-to-r from-blue-400 mt-6 to-blue-800 rounded-[2rem] shadow-lg text-[1rem] py-2 px-8 text-white">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AttachmentField;
