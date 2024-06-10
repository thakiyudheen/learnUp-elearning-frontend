import * as Yup from 'yup';

export const AddLessonSchema = Yup.object().shape({
  lessons: Yup.array().of(
    Yup.object().shape({
      title: Yup.string()
        .required('Lesson title is required')
        .min(3, 'Title must be at least 3 characters long'),
      description: Yup.string()
        .required('Lesson description is required')
        .min(10, 'Description must be at least 10 characters long'),
      video: Yup.string()
        .required('Video is required')
        .url('Video must be a valid URL'),
      objectives: Yup.array()
        .of(Yup.string().required('Objective is required'))
        .min(1, 'At least one objective is required'),
      duration: Yup.string()
        .required('Duration is required')
        .matches(/^\d+:\d{2}$/, 'Duration must be in the format MM:SS'),
    })
  ).min(1, 'At least one lesson is required'),
});
