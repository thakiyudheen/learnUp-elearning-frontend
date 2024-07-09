import Navbar from '@/Components/common/user/navbar/Navbar';
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { deleteObject, getObject } from '@/utils/localStorage';
import { useAppDispatch } from '@/hooks/hooke';
import { createSubsciptionPaymentAction } from '@/redux/store/actions/Payment/createSubscriptionPaymentAction';

const SubscriptionSuccess: React.FC = () => {
  const dispatch= useAppDispatch()
  const navigate = useNavigate()
  const isFirstRun = useRef(true);
  

  useEffect(() => {
    if (isFirstRun.current) {
      console.log("useEffect triggered");
      createPayment()
      isFirstRun.current = false;
     
      
  }
    
  },[])

  const createPayment = async () => {
    const paymentSession = getObject('payment_session')
    console.log('this is sessionData', paymentSession)

    if (!paymentSession) {
      navigate('/');
      return;
    }

    const createPaymentData = {
      userId: paymentSession.userId,
      method: "card",
      status: "completed",
      amount: paymentSession.amount,
      subscriptionType: paymentSession.subscriptionType,
      chatId : paymentSession.chatId, 
      instructorId : paymentSession.instructorId
    };

    const response = await dispatch(createSubsciptionPaymentAction(createPaymentData))
    if(!response?.payload?.success){
      throw new Error('payment creation filed')
    }
    console.log('instructor id',paymentSession.instructorId)
    deleteObject('payment_session')

  }

  
  return (
    <>
      <Navbar />
      <div className=" flex items-center justify-center h-screen">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-100 dark:bg-gray-800 p-6 md:mx-auto shadow-md  rounded-lg"
        >
          <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 dark:text-white font-semibold text-center">Payment Done!</h3>
            <p className="text-gray-600 dark:text-white my-2">Thank you for completing your secure online payment.</p>
            {/* <p>Have a great day!</p> */}
            <div className="py-10 text-center">
              <a onClick={() => navigate('/home')} className="px-7 bg-blue-700 rounded-lg hover:bg-blue-800 text-white font-semibold py-2">
                GO BACK
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SubscriptionSuccess;
