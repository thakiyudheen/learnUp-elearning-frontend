

import Navbar from '@/Components/common/user/navbar/Navbar';
import React, { useEffect, useState } from 'react';
import { SiTicktick } from "react-icons/si";
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/hooks/hooke';
import { RootState } from '@/redux/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { storeData } from '@/utils/localStorage';
import { createSessionAction } from '@/redux/store/actions/Payment/createSessionAction';
import Footer from '@/Components/common/user/footer/footer';

const SubscriptionPage: React.FC = () => {
  const { data } = useAppSelector((state: RootState) => state.user);
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation()

useEffect(()=>{
  console.log('this is the location',location.state)
})


  const handlePayment = async (paymentData: { type: string; amount: number | string }) => {
    try {
      if (!data?.data) {
        toast.info("Please login !! ");
        navigate('/login');
        return;
      }
      setLoading(true);
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY as string);

      const sessionData = {
        subscriptionType: paymentData.type,
        amount: paymentData.amount,
        userId: data?.data?._id,
       
      };

      const response = await dispatch(createSessionAction(sessionData));

      if (!response.payload && !response?.payload?.success) {
        toast.error('Payment error !!');
        throw new Error("Something went wrong, try again!");
      }

      storeData('payment_session', { ...response.payload.data, amount: paymentData.amount , chatId:location.state.chatId,instructorId:location.state.instructorId});

      const sessionId = response.payload.data.sessionId;
      setLoading(false);
      const result = await stripe?.redirectToCheckout({ sessionId });

      if (result?.error) {
        throw new Error(result.error.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className='w-full flex justify-center bg-white dark:bg-base-100 font-Poppins'>
        <div className="w-full max-w-4xl">
          
          <div className="flex flex-col mb-8 justify-center items-center min-h-screen w-full">
          <div className=" p-3 rounded-lg  text-center mt-[7rem] mb-3">
            <h1 className="text-[25px] font-bold mb-2 text-blue-800">Subscription</h1>
            <small className="text-lg">Choose a subscription plan that suits your needs. Our plans are designed to offer flexibility and value, ensuring you get the best out of our services. Upgrade to a plan that fits your requirements and enjoy premium features.</small>
            
          </div>
          <hr  className='bg-black mt-4 mb-3  '/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:p-0 md:p-0 p-7">
              {/* Basic Plan */}
              <motion.div
                className="p-6 bg-white relative dark:bg-gray-800 rounded-[1rem] shadow-xl border dark:border-gray-800 border-gray-200"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className=" bg-blue-600 absolute shadow-xl px-4 rounded-l-full rounded-b-lg right-0 text-white dark:text-gray-200"> <small>Best</small></div>
                <h2 className="text-[22px] font-semibold mb-4 text-center">BASIC</h2>
                <p className="mb-4 text-center text-[15px]">This plan is suitable for students across the globe</p>
                <div className="mb-4">
                  <h3 className="font-semibold text-center">Features</h3>
                  <hr className='mt-2 mb-4' />
                  <ul className="list-inside text-start space-y-2">
                    <li><small className='flex items-center'><SiTicktick className='text-blue-700 mr-2 text-[15px]' />Chat</small></li>
                    <li className="line-through"><small className='flex items-center'><SiTicktick className='text-blue-700 mr-2 text-[15px]' />Audio chat</small></li>
                    <li className="line-through"><small className='flex items-center'><SiTicktick className='text-blue-700 mr-2 text-[15px]' />Video Send</small></li>
                  </ul>
                </div>
                <div className="mt-auto text-center">
                  <span className="text-xl font-bold ">$50</span>
                  <button className="w-full mt-4 py-2 bg-blue-700 text-white rounded-[1rem]" onClick={() => handlePayment({ type: 'Basic', amount: 50 })}>Upgrade</button>
                </div>
              </motion.div>

              {/* Medium Plan */}
              <motion.div
                className="p-6 bg-white text-center dark:bg-gray-800 rounded-[1rem] shadow-xl border dark:border-gray-800 border-gray-200"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h2 className="text-[22px] font-semibold  mb-4 text-center">MEDIUM</h2>
                <p className="mb-4 text-center text-[15px]">This plan is suitable for students across the globe</p>
                <div className="mb-4">
                  <h3 className="font-semibold text-center">Features</h3>
                  <hr className='mt-2 mb-4' />
                  <ul className="list-inside text-start space-y-2">
                    <li><small className='flex items-center'><SiTicktick className='text-blue-700 mr-2 text-[15px]' />Chat</small></li>
                    <li><small className='flex items-center'><SiTicktick className='text-blue-700 mr-2 text-[15px]' />Audio Chat</small></li>
                    <li className="line-through flex items-center"><SiTicktick className='text-blue-700 mr-2' /><small>Video Send</small></li>
                  </ul>
                </div>
                <div className="mt-auto">
                  <span className="text-xl font-bold">$100</span>
                  <button className="w-full mt-4 py-2 bg-blue-700 text-white rounded-[1rem]" onClick={() => handlePayment({ type: 'Medium', amount: 100 })}>Upgrade</button>
                </div>
              </motion.div>

              {/* Advance Plan */}
              <motion.div
                className="p-6 text-center bg-white dark:bg-gray-800 rounded-[1rem] shadow-xl border dark:border-gray-800 border-gray-200"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h1 className="text-[22px] font-semibold mb-4">ADVANCE</h1>
                <p className="mb-4 text-[15px]">This plan is suitable for students across the globe</p>
                <div className="mb-4">
                  <h3 className=" text-center font-semibold">Features</h3>
                  <hr className='mt-2 mb-4 dark:bg-gray-600' />
                  <ul className="list-inside text-start space-y-2">
                    <li><small className='flex items-center'><SiTicktick className='text-blue-700 mr-2 text-[15px]' />Chat</small></li>
                    <li><small className='flex items-center'><SiTicktick className='text-blue-700 mr-2 text-[15px]' />Audio Chat</small></li>
                    <li><small className='flex items-center'><SiTicktick className='text-blue-700 mr-2 text-[15px]' />Video Send</small></li>
                  </ul>
                </div>
                <div className="mt-auto">
                  <span className="text-xl font-bold">$150</span>
                  <button className="w-full mt-4 py-2 bg-blue-700 text-white rounded-[1rem]" onClick={() => handlePayment({ type: 'Advance', amount: 150 })}>Upgrade</button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default SubscriptionPage;
