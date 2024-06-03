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
}

export const studentSchema = Yup.object({

  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  gender: Yup.string().required('Gender is required'),
  address: Yup.string().required('Address is required'),
  dateOfBirth: Yup.string().required('Date of Birth is required'),
  profession: Yup.string().required('Profession is required'),
  qualification: Yup.string().required('Qualification is required'),
  social: Yup.string().required('Social is required'),
  
});
