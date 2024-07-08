import * as Yup from 'yup';

export interface FormValues {
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  address: string;
  dateOfBirth: string;
  profession: string;
  qualification: string;
  social: string;
  cv: File | null;
}

const InstructorSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  phone: Yup.string().required('Phone number is required'),
  gender: Yup.string().required('Gender is required'),
  address: Yup.string().required('Address is required'),
  dateOfBirth: Yup.string().required('Date of birth is required'),
  profession: Yup.string().required('Profession is required'),
  qualification: Yup.string().required('Qualification is required'),
  social: Yup.string().url('Invalid URL'),
  cv: Yup.mixed().required('Document is required'),
});

export default InstructorSchema ;
