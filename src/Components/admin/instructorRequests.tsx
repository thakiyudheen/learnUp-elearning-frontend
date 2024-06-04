import { useAppDispatch } from '../../hooks/hooke';
import React, { useEffect, useState } from 'react';
import LoadingIndicator from '../common/skelton/loading';
import { blockUnblockAction } from '../../redux/store/actions/admin/blockUnblockAction';
import { getRequestAction } from '../../redux/store/actions/admin/getRequestsAction';
import { verifyRequestAction } from '../.././redux/store/actions/admin/verifyRequestAction';
import Modal from '../modal/modal';

interface data {
  email : string ,
  isVerified : boolean ,
}



const InstructorRequest: React.FC = () => {

  const dispatch = useAppDispatch()
  const [requests, setRequests] = useState<any[]>([]);
  const [ error, setError] = useState< string | null >(null);
  const [ isLoading , setLoading] = useState< boolean >(true);

  

 

 
  useEffect(() => {

    const fetchStudents = async () => {
      try {
        const instructorData = await dispatch(getRequestAction());
        
        
				if (getRequestAction.fulfilled.match( instructorData  )) {

					setRequests(instructorData.payload.data);

				} else {

					setError("Failed to fetch requests");

				}
      } catch (error) {

        console.error('Failed to fetch students:', error);

        setError('Failed to fetch students');

      } finally {
        setLoading(false)
      }
    };

    fetchStudents();
  }, [dispatch]);

 const handleRequestVerification =async (data : {email : string , isVerified : boolean}) => {
    try {

      const response = await dispatch(verifyRequestAction(data))
      console.log('thiamm workign')
      if(verifyRequestAction.fulfilled.match(response)){
        setRequests((prevRequests) =>
          prevRequests.map((Requests) =>
            Requests.email === data.email
              ? { ...Requests, isVerified: data.isVerified }
              : Requests
          )
        );
      }
    } catch (error : any ) {

    }
 }
 const onConfirm=()=>{
  
 }
  

  return (
    <>
    <div className="mb-6 ml-[4.3rem] mt-[2rem]">
        <h1 className="text-xl font-bold ">Instructor Management</h1>
    </div>
    {/* <Modal onConfirm={ok} onCancel={ok} message={"Are you sure to accept "}/> */}
    <div className="flex w-[100%]  justify-center  h-[570px]">
    { isLoading && <LoadingIndicator/> }
      <div className="overflow-hidden w-[90%]">
        <table className="w-full rounded-lg  ">
          <thead>
            <tr className="bg-gray-700 text-white text-center">
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Profession</th>
              <th className="px-4 py-2">cv</th>
              <th className="px-4 py-2">requests</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(( request ,index) => (
              <tr key={index} className="text-center border-b">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{request?.firstName}</td>
                <td className="px-4 py-2 border">{request?.email}</td>
                <td className="px-4 py-2 border">{request?.profession}</td>
                <td className="px-4 py-2 border">{`${request?.isVerified?'Yes':'No'}`}</td>
                <td className="px-4 py-2 border">
                <button
                  className={`border font-bold py-1 px-2 rounded-lg ${
                    !request?.isVerified
                      ? 'hover:bg-green-600 hover:text-white border-green-600 text-green-600'
                      : 'hover:bg-red-600 hover:text-white border-red-600 text-red-600'
                  }`}
                  onClick={() => handleRequestVerification({email:request.email,isVerified: !request.isVerified})}
                >
                  {request?.isVerified ? 'Revoke' : 'Accept'}
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default InstructorRequest;
