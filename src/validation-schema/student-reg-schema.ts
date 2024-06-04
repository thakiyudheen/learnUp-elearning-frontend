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

// export const studentSchema = Yup.object({

//   firstName: Yup.string().required('First Name is required'),
//   lastName: Yup.string().required('Last Name is required'),
//   phone: Yup.string()
//     .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
//     .required('Phone number is required'),
//   gender: Yup.string().required('Gender is required'),
//   address: Yup.string().required('Address is required'),
//   dateOfBirth: Yup.string().required('Date of Birth is required'),
//   profession: Yup.string().required('Profession is required'),
//   qualification: Yup.string().required('Qualification is required'),
//   social: Yup.string().required('Social is required'),
  
// });

// import * as Yup from 'yup';

// Validation schema for the first step
export const FirstStepSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First Name is too short')
    .max(50, 'First Name is too long')
    .required('First Name is required'),
  lastName: Yup.string()
    .min(2, 'Last Name is too short')
    .max(50, 'Last Name is too long')
    .required('Last Name is required'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number is not valid")
    .min(10, 'Phone number is too short')
    .max(15, 'Phone number is too long')
    .required('Phone is required'),
  gender: Yup.string()
    .oneOf(['male', 'female', 'other'], 'Invalid gender')
    .required('Gender is required'),
  social: Yup.string()
    .url('Invalid URL')
    .required('Social link is required'),
});

// Validation schema for the second step
export const SecondStepSchema = Yup.object().shape({
  address: Yup.string()
    .min(5, 'Address is too short')
    .max(100, 'Address is too long')
    .required('Address is required'),
  dateOfBirth: Yup.date()
    .required('Date of Birth is required')
    .nullable()
    .typeError('Invalid Date of Birth'),
  profession: Yup.string()
    .oneOf(['student', 'working'], 'Invalid profession')
    .required('Profession is required'),
  qualification: Yup.string()
    .min(2, 'Qualification is too short')
    .max(50, 'Qualification is too long')
    .required('Qualification is required'),
});

// Combined validation schema for the whole form
export const studentSchema = Yup.object().shape({
  firstName: FirstStepSchema.fields.firstName,
  lastName: FirstStepSchema.fields.lastName,
  phone: FirstStepSchema.fields.phone,
  gender: FirstStepSchema.fields.gender,
  social: FirstStepSchema.fields.social,
  address: SecondStepSchema.fields.address,
  dateOfBirth: SecondStepSchema.fields.dateOfBirth,
  profession: SecondStepSchema.fields.profession,
  qualification: SecondStepSchema.fields.qualification,
});
