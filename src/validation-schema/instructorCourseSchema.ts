import * as Yup from 'yup';

// Validation schema
export const instructorCourseSchema = Yup.object().shape({
    courseTitle: Yup.string().required('Course Title is required'),
    subTitle: Yup.string().required('subTitle is required'),
    level: Yup.string().required('level is required'),
    description: Yup.string().required('Description is required'),
    language: Yup.string().required('language is required'),
    courseThumbnail: Yup.mixed().required('Course Thumbnail is required'),
    videoTrailer: Yup.mixed().required('Video Trailer is required'),
  });
export const instructorCourseSchema2 = Yup.object().shape({
    courseTitle: Yup.string().required('Course Title is required'),
    subTitle: Yup.string().required('subTitle is required'),
    level: Yup.string().required('level is required'),
    description: Yup.string().required('Description is required'),
    language: Yup.string().required('language is required'),
    priceAmount:Yup.number().required('Price Amount is required').min(1, 'Price must be at least $1'),
    courseThumbnail: Yup.mixed().required('Course Thumbnail is required'),
    videoTrailer: Yup.mixed().required('Video Trailer is required'),
  });