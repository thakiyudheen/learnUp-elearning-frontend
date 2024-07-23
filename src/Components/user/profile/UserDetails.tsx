import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CiEdit } from "react-icons/ci";
import { FaSpinner } from 'react-icons/fa';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { FileUpload } from '@/utils/cloudinary/imgVideoUpload'; 
import { useAppDispatch, useAppSelector } from '@/hooks/hooke';
import { RootState } from '@/redux/store';
import { updateUserAction } from '@/redux/store/actions/user/updateUserAction';
import { getUserDataAction } from '@/redux/store/actions/auth/getUserDataAction';

const DEFAULT_AVATAR = "https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg";

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    profession: Yup.string().required('Profession is required'),
    qualification: Yup.string().required('Qualification is required'),
    phone: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    dateOfBirth: Yup.date().required('Date of birth is required')
});

const UserDetails: React.FC = () => {
    const { data } = useAppSelector((state: RootState) => state.user);
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState(data?.data?.profile?.avatar || DEFAULT_AVATAR);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useAppDispatch();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isUploading, setUploading] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await dispatch(getUserDataAction());
            if (response.payload.success) {
                setUser(response.payload.data);
                setProfileImage(response.payload.data?.profile?.avatar || DEFAULT_AVATAR);
            }
        };
        fetchUserData();
    }, [dispatch]);

    const initialValues = {
        username: user?.username || "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        profession: user?.profession || "",
        qualification: user?.qualification || "",
        phone: user?.contact?.phone || "",
        address: user?.address || "",
        dateOfBirth: user?.profile?.dateOfBirth ? format(new Date(user.profile.dateOfBirth), 'yyyy-MM-dd') : "",
        avatar: user?.avatar || "",
        gender: user?.profile?.gender || "",
        social: user?.contact?.socialMedia?.linkedIn || ""
    };

    const handleSubmit = async (values: typeof initialValues) => {
        setIsEditing(false);
        setLoading(true);

        const updatedData = {
            ...user,
            ...values,
            profile: {
                ...user.profile,
                dateOfBirth: values.dateOfBirth,
                gender: values.gender,
                avatar: values.avatar
            },
            contact: {
                ...user.contact,
                phone: values.phone,
                socialMedia: {
                    ...user.contact?.socialMedia,
                    linkedIn: values.social,
                },
            },
        };

        const response = await dispatch(updateUserAction(updatedData));
        if (response.payload.success) {
            setUser(response.payload);
            setProfileImage(response.payload.profile?.avatar);
            toast.success('Updated Successfully!');
        }
        setLoading(false);
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (file: File | null, setFieldValue: Function) => {
        if (file) {
            setUploading(true);
            try {
                const uploadedLink = await FileUpload(file);
                setFieldValue('avatar', uploadedLink.secure_url);
                setProfileImage(uploadedLink.secure_url);
                toast.success('Uploaded Successfully!');
            } catch (error) {
                toast.error('Upload failed. Please try again.');
            } finally {
                setUploading(false);
            }
        }
    };
    return (
        <div className="p-10 dark:bg-base-100 bg-gray-100 md:mt-[2rem] font-Poppins">
            <h1 className="text-xl font-semibold mb-4 ">My Profile</h1>
            <div className="flex items-center space-x-4 mt-2 mb-3 p-3   bg-gradient-to-l from-blue-800 to-gray-900 shadow-lg dark:bg-gray-800 rounded-lg">
                <div className="relative">
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="w-24 h-24 rounded-full"
                    />
                    {isEditing && (
                        <>
                            {isUploading ? (<div
                                    className="absolute inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 rounded-full  transition-opacity duration-300 cursor-pointer"
                                    onClick={handleImageClick}
                                >
                                   <FaSpinner className="animate-spin mr-2 text-[30px] text-blue-900 " />
                                </div>) : (
                                <div
                                    className="absolute inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                                    onClick={handleImageClick}
                                >
                                    <CiEdit className="text-white text-2xl" />
                                </div>)}
                        </>

                    )}

                </div>
                <div>
                    <h2 className="text-lg font-semibold">{initialValues.firstName} {initialValues.lastName}</h2>
                    <small className="text-sm text-gray-400 dark:text-gray-300">{initialValues.email}</small>
                </div>
            </div>
            <hr />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ errors, touched, setFieldValue }) => (
                    <Form className="space-y-4 mt-4 ">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3  ">
                            <div>
                                <label className="block text-sm dark:text-gray-400 font-medium">Username</label>
                                <Field
                                    name="username"
                                    type="text"
                                    disabled
                                    className={`mt-1 p-2 border text-[13px] rounded-lg border-gray-700 w-full dark:text-gray-400  bg-white focus:outline-none  dark:bg-[#1D232A]`}
                                />
                                <ErrorMessage name="username" component="small" className="text-red-500 text-[14px]" />
                            </div>
                            <Field
                                name="social"
                                type="text"
                                hidden
                                className={`mt-1 p-2 border border-gray-600 w-full focus:outline-none bg-white dark:bg-[#1D232A]`}
                            />
                            <Field
                                name="gender"
                                type="text"
                                hidden
                                className={`mt-1 p-2 border-b border-gray-600 w-full focus:outline-none bg-white dark:bg-[#1D232A]`}
                            />
                            <input
                                type="file"
                                id="profilePhotoInput"
                                accept="image/*"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={(e) => handleFileChange(e.target.files?.[0] || null, setFieldValue)}
                            />
                            <div>
                                <label className="block text-sm dark:text-gray-400 font-medium">First Name</label>
                                <Field
                                    name="firstName"
                                    type="text"
                                    disabled={!isEditing}
                                    className={`mt-1 p-2 border text-[13px] dark:text-gray-400 rounded-lg border-gray-700 w-full focus:outline-none bg-white dark:bg-[#1D232A] ${!isEditing ? 'bg-gray-100' : ''}`}
                                />
                                <ErrorMessage name="firstName" component="div" className="text-red-500 text-[14px]" />
                            </div>
                            <div>
                                <label className="block text-sm dark:text-gray-400 font-medium">Last Name</label>
                                <Field
                                    name="lastName"
                                    type="text"
                                    disabled={!isEditing}
                                    className={`mt-1 p-2 border text-[13px] dark:text-gray-400 rounded-lg border-gray-700 w-full focus:outline-none bg-white dark:bg-[#1D232A] ${!isEditing ? 'bg-gray-100' : ''}`}
                                />
                                <ErrorMessage name="lastName" component="div" className="text-red-500 text-[14px]" />
                            </div>
                            <div>
                                <label className="block text-sm dark:text-gray-400 font-medium">Email</label>
                                <Field
                                    name="email"
                                    type="email"
                                    disabled
                                    className={`mt-1 p-2 border text-[14px] dark:text-gray-400 rounded-lg border-gray-700 w-full focus:outline-none bg-white dark:bg-[#1D232A]`}
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-[14px]" />
                            </div>
                            <div>
                                <label className="block text-sm dark:text-gray-400 font-medium">Profession</label>
                                <Field
                                    name="profession"
                                    as="select"
                                    disabled={!isEditing}
                                    className={`mt-1 p-2 border text-[14px] dark:text-gray-400 rounded-lg border-gray-700 w-full focus:outline-none bg-white dark:bg-[#1D232A] ${!isEditing ? 'bg-gray-100' : ''} text-black dark:text-gray-600`}
                                >
                                    <option value="working" >working</option>
                                    <option value="student"  >student</option>
                                </Field>
                                <ErrorMessage name="profession" component="div" className="text-red-500 text-[14px]" />
                            </div>
                            <div>
                                <label className="block text-sm dark:text-gray-400 font-medium">Qualification</label>
                                <Field
                                    name="qualification"
                                    type="text"
                                    disabled={!isEditing}
                                    className={`mt-1 p-2 border dark:text-gray-400 dark:text-gray-400 text-[13px] rounded-lg border-gray-700 w-full focus:outline-none bg-white  dark:bg-[#1D232A] ${!isEditing ? 'bg-gray-100' : ''}`}
                                />
                                <ErrorMessage name="qualification" component="div" className="text-red-500 text-[14px]" />
                            </div>
                            <div>
                                <label className="block text-sm dark:text-gray-400 font-medium">Phone Number</label>
                                <Field
                                    name="phone"
                                    type="text"
                                    disabled={!isEditing}
                                    className={`mt-1 p-2 border dark:text-gray-400 text-[13px] rounded-lg border-gray-700 w-full focus:outline-none bg-white dark:bg-[#1D232A] ${!isEditing ? 'bg-gray-100' : ''}`}
                                />
                                <ErrorMessage name="phone" component="div" className="text-red-500 text-[14px]" />
                            </div>
                            <div>
                                <label className="block text-sm dark:text-gray-400 font-medium">Address</label>
                                <Field
                                    name="address"
                                    type="text"
                                    disabled={!isEditing}
                                    className={`mt-1 p-2 border dark:text-gray-400 text-[13px] rounded-lg border-gray-700 w-full focus:outline-none bg-white dark:bg-[#1D232A] ${!isEditing ? 'bg-gray-100' : ''}`}
                                />
                                <ErrorMessage name="address" component="div" className="text-red-500 text-[14px]" />
                            </div>
                            <div>
                                <label className="block dark:text-gray-400  font-medium">Date of Birth</label>
                                <Field
                                    name="dateOfBirth"
                                    type="date"
                                    disabled={!isEditing}
                                    className={`mt-1 p-2 border text-[13px] dark:text-gray-400 rounded-lg border-gray-700 w-full focus:outline-none bg-white dark:bg-[#1D232A] ${!isEditing ? 'bg-gray-100' : ''}`}
                                />
                                <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 text-[14px]" />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                // onClick={handleEditToggle}
                                onClick={() => setIsEditing(!isEditing)}
                                className="mt-4 px-4 py-1 bg-blue-600 text-white rounded-lg "
                            >
                                {isEditing ? 'Cancel' : 'Edit'}
                            </button>
                            {isEditing && (
                                <button
                                    type="submit"
                                    className="mt-4 px-4 py-1 border border-blue-600 text-blue hover:bg-blue-600 hover:text-white rounded-md transition-all duration-300"
                                >
                                    Save Changes
                                </button>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </div >
    )
};

export default UserDetails;
