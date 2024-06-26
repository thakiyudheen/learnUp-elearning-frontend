import React, { useState, useEffect } from 'react';
import { Formik, FieldArray, Field, ErrorMessage } from 'formik';
import { FiTrash2 } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import * as Yup from 'yup';
import { useTheme } from '@/Components/ui/theme-provider';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '@/redux/store';
import { useAppDispatch, useAppSelector } from '@/hooks/hooke';
import LoadingIndicator from '@/Components/common/skelton/loading';
import { PdfUpload } from '@/utils/cloudinary/uploadPdf';
import { updateAllCourseAction } from '@/redux/store/actions/course/updateAllCourseAction';

const UpdateAttachment: React.FC = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [pdfUrls, setPdfUrls] = useState<string[]>([]);

  const { data } = useAppSelector((state: RootState) => state.category);
  const validationSchema = Yup.object().shape({
    attachments: Yup.array()
      .of(
        Yup.object().shape({
          title: Yup.string().required('Resource Title is required'),
          url: Yup.mixed().required('PDF file is required'),
        })
      )
      .min(1, 'At least one attachment is required'),
  });

  const user = useAppSelector((state: RootState) => state.user);

  const handleSubmit = async (values: any) => {
    console.log('attachments', values);
    setLoading(true);
    console.log('instructor id', user?.data?.data?._id);
    let allData = { ...values, ...location.state.allData,_id:location.state.course._id, instructorRef: user?.data?.data?._id || 'usernotFound' };
    console.log('the every data ',allData)
    const response = await dispatch(updateAllCourseAction(allData));
    console.log('response', response.payload.data);
    if (response.payload && response.payload.data) {
      setLoading(false);
      navigate('/instructor/courses');
    }
  };

  useEffect(() => {
    if (location.state.course.attachments) {
      setPdfUrls(location.state.course.attachments.map((attachment: any) => attachment.url));
    }
  }, [location.state.course.attachments]);

  console.log('attachments',location.state.course.attachments)

  return (
    <div className="max-w-4xl mx-auto py-8 min-h-screen">
      <h2 className="text-white mb-4">Attachments</h2>
      <Formik
        initialValues={{ attachments: location.state.course.attachments || [{ title: '', url: null }] }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            {isLoading && <LoadingIndicator />}
            <FieldArray name="attachments">
              {({ push, remove }) => (
                <>
                  {values.attachments.map((attachment : any, index : any ) => (
                    <div key={index} className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-grow mr-2">
                          <Field
                            type="text"
                            placeholder="Resource Title"
                            className={`border-b border-gray-500 w-full py-2 ${theme === 'light' ? 'bg-white text-black' : 'bg-[#1D232A]'}  outline-none`}
                            name={`attachments[${index}].title`}
                          />
                          <ErrorMessage name={`attachments[${index}].title`} component="small" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div className="flex-grow ml-2">
                          <div className="border border-dashed border-gray-500 p-4 w-full text-center cursor-pointer">
                            <input
                              type="file"
                              accept="application/pdf"
                              onChange={async (event: any) => {
                                const file = event?.currentTarget?.files[0];
                                if (file) {
                                  const url = await PdfUpload(file);
                                  setFieldValue(`attachments[${index}].url`, url);
                                  setPdfUrls((prev) => {
                                    const newUrls = [...prev];
                                    newUrls[index] = url;
                                    return newUrls;
                                  });
                                }
                              }}
                              className="hidden"
                              id={`file-upload-${index}`}
                            />
                            <label htmlFor={`file-upload-${index}`} className="cursor-pointer text-gray-300">
                              Drag & drop or click to upload
                            </label>
                            {pdfUrls[index] && (
                              <iframe
                                src={pdfUrls[index]}
                                title={`PDF Preview ${index}`}
                                className="mt-2 w-full h-32 border"
                              ></iframe>
                            )}
                          </div>
                          <ErrorMessage name={`attachments[${index}].url`} component="small" className="text-red-500 text-sm mt-1" />
                        </div>
                        {values.attachments.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              remove(index);
                              setPdfUrls((prev) => prev.filter((_, i) => i !== index));
                            }}
                            className="text-red-500 mt-4 ml-3"
                          >
                            <FiTrash2 size={20} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push({ title: '', url: null })}
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

export default UpdateAttachment;
