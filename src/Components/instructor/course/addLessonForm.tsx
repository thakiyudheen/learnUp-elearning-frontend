import React, { useState } from 'react';
import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik';
import { useDropzone } from 'react-dropzone';
import InputField from '../../common/form-input/inputField';
import { FileUpload } from '@/utils/cloudinary/imgVideoUpload';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import { useTheme } from '@/Components/ui/theme-provider';
import { AddLessonSchema } from '@/validation-schema/addLessonSchema';
import { ClipLoader,BounceLoader , BarLoader,ClimbingBoxLoader, PacmanLoader} from 'react-spinners';
import { GrCloudUpload } from "react-icons/gr";

// Initial form values
const initialValues = {
  lessons: [
    {
      title: '',
      description: '',
      video: null,
      objectives: [''],
      duration: '',
    },
  ],
};

interface DropzoneFieldProps {
  setFieldValue: (fieldName: string, file: File) => void;
  previewType :'image' | 'video';
  fieldName: string;
  accept: string;
  index:number;
}

const DropzoneField: React.FC<DropzoneFieldProps> = ({ setFieldValue, fieldName, accept , previewType,index}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading ,setLoading]=useState<boolean>(false)
  const [previewtype ,setPreviewType]=useState<string|null >(null)


  // const onDrop = async (acceptedFiles: File[]) => {
  //   const file = acceptedFiles[0];
  //   if (file) {
  //     const fileUrl = await FileUpload(file);
  //     setFieldValue(fieldName, fileUrl);
  //     setPreview(URL.createObjectURL(file));
  //   }
  // };
  const onDrop = async (acceptedFiles: File[]) => {
    console.log('this is dropped file ', acceptedFiles[0])
    const file = acceptedFiles[0];
    if (file) {
      setLoading(true); // Start loading
      try {
        const imageUrl = await FileUpload(file);
        setFieldValue(fieldName, imageUrl);
        console.log('image or video upload url', imageUrl);

        if (!imageUrl) {
          throw Error('image or video upload failed');
        }

        setPreview(URL.createObjectURL(file));
        setPreviewType(file.type.startsWith('image') ? 'image' : 'video'); 


        const videoElement = document.createElement('video');
        videoElement.src = URL.createObjectURL(file);
        videoElement.onloadedmetadata = () => {
          const duration = videoElement.duration;
          const durationFormatted = new Date(duration * 1000);
          setFieldValue(`lessons[${index}].duration`, duration);
         };
         
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
  });

  return (
    <div
    {...getRootProps()}
    className="border-2 border-gray-500 border-dashed rounded-md h-48 flex items-center justify-center"
  >
    <input {...getInputProps()} />
    {loading ? (
      <div className="flex items-center justify-center">
        <BarLoader color="#4A90E2" loading={loading}  /> {/* Loading spinner */}
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
        <span className="text-gray-400">click to upload</span>
      </>
    )}
  </div>
  );
};

const LessonForm: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const location =useLocation()

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Add Lessons</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={AddLessonSchema}
        onSubmit={(values: any) => {
          console.log(values);
          let allData = {...location.state,...values} ;
          
          navigate('/instructor/Add-attachment', { state: allData });
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <FieldArray name="lessons">
              {({ push, remove, form }) => (
                <>
                  {form.values.lessons.map((lesson: any, index: number) => (
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
                            <InputField
                              type="text"
                              placeholder="Lesson Title"
                              name={`lessons[${index}].title`}
                              background={theme === 'light' ? 'bg-white' : 'bg-[#1D232A]'}
                            />
                          </div>
                          <div className="mb-4">
                            <InputField
                              type="text"
                              placeholder="Lesson Description"
                              name={`lessons[${index}].description`}
                              background={theme === 'light' ? 'bg-white' : 'bg-[#1D232A]'}
                            />
                          </div>
                          <div className="mb-4">
                            <FieldArray name={`lessons[${index}].objectives`}>
                              {({ push, remove, form }) => (
                                <>
                                  {form.values.lessons[index].objectives.map((_: any, objIndex: number) => (
                                    <div key={objIndex} className="flex items-center mb-2">
                                      <Field
                                        type="text"
                                        name={`lessons[${index}].objectives[${objIndex}]`}
                                        placeholder="Objective"
                                        className={`border-b-2 border-gray-500 w-full py-2 mr-2 ${theme === 'light' ? 'bg-white' : 'bg-[#1D232A]'}`}
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
                          <div className="mb-4">
                            <InputField
                              type="text"
                              placeholder="Duration"
                              name={`lessons[${index}].duration`}
                              background={theme === 'light' ? 'bg-white' : 'bg-[#1D232A]'}
                            />
                          </div>
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

export default LessonForm;
