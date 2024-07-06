

import Navbar from '@/Components/common/user/navbar/Navbar';
import React, { useState } from 'react';
import { SiTicktick } from "react-icons/si";
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/hooks/hooke';
import { RootState } from '@/redux/store';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify'
import { loadStripe } from '@stripe/stripe-js'
import { storeData } from '@/utils/localStorage';
import { createSessionAction } from '@/redux/store/actions/Payment/createSessionAction';

const SubscriptionPage: React.FC = () => {

  const {data} = useAppSelector((state:RootState)=> state.user)
  const [isLoading,setLoading]= useState<boolean>(false)
  const navigate= useNavigate()
  const dispatch = useAppDispatch()

   // handle payment ----------------------------------

   const handlePayment = async (paymentData:{type:string,amount:number|string}) => {
    try {


        if (!data?.data) {
            toast.info("Please login !! ")
            navigate('/login')
            return;
        }
        setLoading(true)
        const stripe = await loadStripe(
            import.meta.env.VITE_STRIPE_PUBLIC_KEY as string
        );

        const sessionData = {
            subscriptionType: paymentData.type,
            amount: paymentData.amount,
            userId: data?.data?._id,
        };

        const response = await dispatch(createSessionAction(sessionData))

        if (!response.payload && !response?.payload?.success) {
            toast.error('Payment error !!')
            throw new Error("Something went wrong, try again!");

        }


        console.log('its res from session', response.payload.data)
        // store local storage about session info--------
        storeData('payment_session', { ...response.payload.data,  amount: paymentData.amount })

        const sessionId = response.payload.data.sessionId;

        setLoading(false)
        const result = await stripe?.redirectToCheckout({ sessionId });

        if (result?.error) {

            throw new Error(result.error.message)
        }
    } catch (error: any) {
        toast.error(error.messsage)
    }
}

  return (
    <>
      <Navbar />
      <div className='w-full mt-10'>
        <h1 className='text-white'>Subscription</h1>
      </div>
      <div className='w-full flex justify-center bg-gray-100 dark:bg-base-100 font-Poppins'>
      
        <div className="flex justify-center items-center min-h-screen w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Basic Plan */}
            <motion.div
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-xl font-bold mb-4 text-center">BASIC</h2>
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
                <button className="w-full mt-4 py-2 bg-blue-700 text-white rounded-md">Upgrade</button>
              </div>
            </motion.div>

            {/* Medium Plan */}
            <motion.div
              className="p-6 bg-white text-center dark:bg-gray-800 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-xl font-bold mb-4 text-center">MEDIUM</h2>
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
                <button className="w-full mt-4 py-2 bg-blue-700 text-white rounded-md">Upgrade</button>
              </div>
            </motion.div>

            {/* Advance Plan */}
            <motion.div
              className="p-6 text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h1 className="text-xl font-bold mb-4">ADVANCE</h1>
              <p className="mb-4 text-[15px]">This plan is suitable for students across the globe</p>
              <div className="mb-4">
                <h3 className="font-semibold text-center">Features</h3>
                <hr className='mt-2 mb-4' />
                <ul className="list-inside text-start space-y-2">
                  <li><small className='flex items-center'><SiTicktick className='text-blue-700 mr-2 text-[15px]' />Chat</small></li>
                  <li><small className='flex items-center'><SiTicktick className='text-blue-700 mr-2 text-[15px]' />Audio Chat</small></li>
                  <li><small className='flex items-center'><SiTicktick className='text-blue-700 mr-2 text-[15px]' />Video Send</small></li>
                </ul>
              </div>
              <div className="mt-auto">
                <span className="text-xl font-bold">$150</span>
                <button className="w-full mt-4 py-2 bg-blue-700 text-white rounded-md" onClick={()=> handlePayment({type:'Advance',amount:150})}>Upgrade</button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;

