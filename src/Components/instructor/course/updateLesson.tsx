import React, { useEffect, useState } from 'react';
import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik';
import { useDropzone } from 'react-dropzone';
import { FileUpload } from '@/utils/cloudinary/imgVideoUpload';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import { useTheme } from '@/Components/ui/theme-provider';
import { AddLessonSchema } from '@/validation-schema/addLessonSchema';
import { BarLoader } from 'react-spinners';
import { GrCloudUpload } from "react-icons/gr";

const DropzoneField = ({ setFieldValue, fieldName, accept, previewType, index ,defaultImageUrl } : any ) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [previewtype, setPreviewType] = useState<string | null>(null);

  useEffect(() => {
    console.log('the vdefault images', defaultImageUrl)
    
    setPreview(defaultImageUrl);
    
  }, [defaultImageUrl]);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setLoading(true); // Start loading
      try {
        const imageUrl = await FileUpload(file);
        setFieldValue(fieldName, imageUrl.secure_url);
        setPreview(URL.createObjectURL(file));
        setPreviewType(file.type.startsWith('image') ? 'image' : 'video'); 

        if(imageUrl){
        
          const duration = imageUrl.duration.toString();
          if (duration) {
            const minutes = Math.floor(duration / 60);
            const seconds = Math.floor(duration % 60);
            const durationFormatted : any = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            setFieldValue(`lessons[${index}].duration`, durationFormatted);
            console.log('its formated dura',durationFormatted)
          }
        
       }

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); 
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-gray-500 border-dashed rounded-md h-48 flex items-center justify-center"
    >
      <input {...getInputProps()} />
      {loading ? (
        <div className="flex items-center justify-center">
          <BarLoader color="#4A90E2" loading={loading} /> {/* Loading spinner */}
        </div>
      ) : preview ? (
        previewType === 'image' ? (
          <img
            src={preview}
            alt="Preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <iframe
            src={preview}
            title="Video Preview"
            className="h-full w-full object-cover border-2 border-gray-200 rounded-md"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )
      ) : (
        <>
          <GrCloudUpload className="text-bold text-[2rem] text-gray-400" />
          <br />
          <span className="text-gray-400">Click to upload</span>
        </>
      )}
    </div>
  );
};

const UpdateLesson = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const location = useLocation();
  const course = location.state.course; 

  console.log('this is lesson', course.lessons);

  // Initial form values
  const initialValues = (course : any ) => ({
    lessons: course?.lessons || [
      {
        title: '',
        description: '',
        video: null,
        objectives: [''],
        duration: '',
      },
    ],
  });
  console.log('this is update video',course.lessons[0].video)

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Add Lessons</h1>
      <Formik
        initialValues={initialValues(course)}
        validationSchema={AddLessonSchema}
        onSubmit={(values) => {
          console.log(values);
          let allData = { ...location.state.values, ...values };
          console.log('alldata',allData)
          navigate('/instructor/update-attachment', { state:{allData,course} });
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <FieldArray name="lessons">
              {({ push, remove, form }) => (
                <>
                  {form.values.lessons.map((lesson : any , index : any ) => (
                    <div key={index} className="mb-6 border-b border-gray-200 pb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-medium">Lesson {index + 1}</h2>
                        {form.values.lessons.length > 1 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500"
                          >
                            <FiTrash2 size={20} />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <div className="mb-4">
                            <Field
                              type="text"
                              placeholder="Lesson Title"
                              name={`lessons[${index}].title`}
                              className={`w-full px-2 py-1 bg-white dark:bg-[#1D232A] border-b-[1px] focus:outline-none rouded-lg ${theme != 'light' ? 'border-gray-600' : 'border-gray-800'}`} 
                            />
                            <ErrorMessage name={`lessons[${index}].title`} component="div" className="text-red-500 text-sm" />
                          </div>
                          <div className="mb-4">
                            <Field
                              type="text"
                              placeholder="Lesson Description"
                              name={`lessons[${index}].description`}
                              className={`w-full px-2 py-1 bg-white dark:bg-[#1D232A] border-b-[1px] focus:outline-none rouded-lg ${theme != 'light' ? 'border-gray-600' : 'border-gray-800'}`} 
                            />
                            <ErrorMessage name={`lessons[${index}].description`} component="div" className="text-red-500 text-sm" />
                          </div>
                          <div className="mb-4">
                            <FieldArray name={`lessons[${index}].objectives`}>
                              {({ push, remove, form }) => (
                                <>
                                  {form.values.lessons[index].objectives.map((_ : any , objIndex : any) => (
                                    <div key={objIndex} className="flex items-center mb-2">
                                      <Field
                                        type="text"
                                        name={`lessons[${index}].objectives[${objIndex}]`}
                                        placeholder="Objective"
                                        className={`w-full px-2 py-1 bg-white dark:bg-[#1D232A] border-b-[1px] focus:outline-none rouded-lg ${theme != 'light' ? 'border-gray-600' : 'border-gray-800'}`} 
                                      />
                                      {objIndex > 0 && (
                                        <button
                                          type="button"
                                          onClick={() => remove(objIndex)}
                                          className="text-red-500"
                                        >
                                          <FiTrash2 size={20} />
                                        </button>
                                      )}
                                    </div>
                                  ))}
                                  <button
                                    type="button"
                                    onClick={() => push('')}
                                    className="text-blue-500 flex items-center"
                                  >
                                    <AiOutlinePlus size={20} className="mr-2" />
                                    Add Objective
                                  </button>
                                </>
                              )}
                            </FieldArray>
                          </div>
                          {/* <div className="mb-4">
                            <Field
                              type="text"
                              placeholder="Duration"
                              name={`lessons[${index}].duration`}
                              className={`border-b-2 border-gray-500 w-full py-2 ${theme === 'light' ? 'bg-white' : 'bg-[#1D232A]'}`}
                            />
                            <ErrorMessage name={`lessons[${index}].duration`} component="div" className="text-red-500 text-sm" />
                          </div> */}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            Video Upload
                          </label>
                          <DropzoneField
                            setFieldValue={setFieldValue}
                            fieldName={`lessons[${index}].video`}
                            accept="video/*"
                            previewType={'video'}
                            index={index}
                            defaultImageUrl={course?.lessons[index]?.video||null}
                          />
                          <ErrorMessage name={`lessons[${index}].video`} component="div" className="text-red-500 text-sm" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      push({
                        title: '',
                        description: '',
                        video: null,
                        objectives: [''],
                        duration: '',
                      })
                    }
                    className="text-blue-500 flex items-center mt-4"
                  >
                    <AiOutlinePlus size={20} className="mr-2" />
                    Add Lesson
                  </button>
                </>
              )}
            </FieldArray>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-400 to-blue-800 rounded-[2rem] shadow-lg text-[1rem] py-2 px-8 text-white"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateLesson;
