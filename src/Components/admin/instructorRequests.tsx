import { useAppDispatch } from '../../hooks/hooke';
import React, { useEffect, useState } from 'react';
import LoadingIndicator from '../common/skelton/loading';
import { blockUnblockAction } from '../../redux/store/actions/admin/blockUnblockAction';
import { getRequestAction } from '../../redux/store/actions/admin/getRequestsAction';
import { verifyRequestAction } from '../.././redux/store/actions/admin/verifyRequestAction';
import Modal from '../modal/modal';
import { rejectRequestAction } from '../../redux/store/actions/admin/rejectRequestAction';
import { format } from 'date-fns';
import { FaCloudDownloadAlt } from "react-icons/fa";
import { PaginationControls } from '../common/skelton';
import { getAllInstructorsAction } from '@/redux/store/actions/admin/getAllInstructorsAction';

interface data {
  email: string,
  isVerified: boolean,
}
interface data1 {
  _id: string;
  isBlocked: boolean;
}

const InstructorRequest: React.FC = () => {

  const dispatch = useAppDispatch();
  const [requests, setRequests] = useState<any[]>([]);
  const [rejects, setReject] = useState<any[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isModal, setModal] = useState<boolean>(false);
  const [isRejectModal, setRejectModal] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<{ email: string; isVerified: boolean } | null>(null);
  const [ activeTab, setActiveTab] = useState<'requests'|'rejects'|'instructor'>('instructor')

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const instructorData = await dispatch(getAllInstructorsAction());
        if (getAllInstructorsAction.fulfilled.match(instructorData)) {
          setInstructors(instructorData.payload.data);
        } else {
          setError('Failed to fetch instructors');
        }
      } catch (error) {
        console.error('Failed to fetch instructors:', error);
        setError('Failed to fetch instructors');
      } finally {
        setLoading(false);
      }
    };
    fetchInstructors();
  }, [dispatch]);

  useEffect(() => {

    const fetchStudents = async () => {
      try {
        const instructorData = await dispatch(getRequestAction());
        if (getRequestAction.fulfilled.match(instructorData)) {
          setRequests(instructorData.payload.data.filter((el:any) => !el.isVerified&&!el.isRejected));
          setReject(instructorData.payload.data.filter((el:any) => el?.isReject));
          setInstructors(instructorData.payload.data.filter((el:any) => el.isVerified));
          console.log('rejected',rejects)
          console.log('requested',requests)
        } else {
          setError("Failed to fetch requests");
        }
      } catch (error) {
        console.error('Failed to fetch students:', error);
        setError('Failed to fetch students');
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(7);
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return activeTab=='requests'? requests.slice(startIndex, endIndex):activeTab=='instructor'? instructors.slice(startIndex, endIndex):rejects.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(requests.length / itemsPerPage);

  const handleRequestVerification = async (data: { email: string; isVerified: boolean }) => {
    setCurrentData(data);
    setModal(true);
  };

  const handleReject = async (data: { email: string; isVerified: boolean }) => {
    setCurrentData(data);
    setRejectModal(true);
  };

  const onConfirmReject = async () => {
    if (!currentData) return;
    setRejectModal(false);
    const response = await dispatch(rejectRequestAction(currentData));
    if (rejectRequestAction.fulfilled.match(response)) {
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.email === currentData.email
            ? { ...request, isReject: true }
            : request
        )
      );
    }
  };

  const handleBlock = async (data: data1) => {
    const response = await dispatch(blockUnblockAction(data));
    if (blockUnblockAction.fulfilled.match(response)) {
      setInstructors((prevInstructors) =>
        prevInstructors.map((instructor) =>
          instructor._id === data._id
            ? { ...instructor, isBlocked: data.isBlocked }
            : instructor
        )
      );
    }
  };


  const onConfirm = async () => {
    if (!currentData) return;
    try {
      setModal(false);
      const response = await dispatch(verifyRequestAction(currentData));
      console.log('Request verification working');
      if (verifyRequestAction.fulfilled.match(response)) {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.email === currentData.email
              ? { ...request, isVerified: currentData.isVerified }
              : request
          )
        );
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  const onCancel = () => {
    setModal(false);
    setRejectModal(false);
  };

  return (
    <>
      <div className="mb-6 ml-[4.3rem] mt-[2rem]">
        <h1 className="text-xl font-bold ">Instructor Management</h1>
      </div>
      {isModal && (
        <Modal
          onConfirm={onConfirm}
          onCancel={onCancel}
          message={"Are you sure to accept"}
        />
      )}
      {isRejectModal && (
        <Modal
          onConfirm={onConfirmReject}
          onCancel={onCancel}
          message={"Are you sure to Reject"}
        />
      )}
      <div className="flex ml-[4rem] mb-4">
          <div role="tablist" className="tabs tabs-boxed bg-gray-200 dark:bg-gray-700">
            <a role="tab" onClick={() => setActiveTab('instructor')} className={`tab ${activeTab === 'instructor' && 'tab-active'}`}>Instrucotrs</a>
            <a role="tab" onClick={() => setActiveTab('rejects')} className={`tab ${activeTab === 'rejects' && 'tab-active'}`}>Rejected</a>
            <a role="tab" onClick={() => setActiveTab('requests')} className={`tab ${activeTab === 'requests' && 'tab-active'}`}>Requests</a>
          </div>
        </div>
      <div className="flex w-[100%] justify-center h-[570px]">
        {isLoading && <LoadingIndicator />}
        <div className="overflow-x-auto w-[90%] rounded-lg">
          {activeTab=='requests'?
          (<table className="table w-full ">
            <thead>
              <tr className="bg-gray-700 text-white text-center">
                <th></th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">CV</th>
                <th className="px-4 py-2">Requests</th>
              </tr>
            </thead>
            <tbody>
              {getPaginatedData().map((request, index) => (
                <tr key={index} className="text-center border-b">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{request?.firstName}</td>
                  <td className="px-4 py-2 border">{request?.email}</td>
                  <td className="px-4 py-2 border">{format(new Date(request?.createdAt), 'yyyy-MM-dd')}</td>
                  <td className="px-4 py-2 border">
                    <a
                      href={request.cv}
                      download
                      className="text-blue-600 hover:underline flex items-center justify-center py-1 border rounded-lg border-blue-500"
                    >
                      <FaCloudDownloadAlt className='text-blue-700 text-[20px]' />
                    </a>
                  </td>
                  <td className="px-4 py-2 border">
                    {!request.isReject && (
                      <button
                        className={`border font-bold py-1 px-2 rounded-lg ${!request?.isVerified
                          ? 'hover:bg-green-600 hover:text-white border-green-600 text-green-600'
                          : 'hover:bg-gray-600 hover:text-white border-gray-600 text-gray-600'
                          }`}
                        disabled={request?.isVerified}
                        onClick={() =>
                          handleRequestVerification({
                            email: request.email,
                            isVerified: !request.isVerified,
                          })
                        }
                      >
                        {request?.isVerified ? 'Accepted' : 'Accept'}
                      </button>
                    )}
                    {!request.isVerified && (
                      <button
                        className={`border font-bold py-1 px-2 ml-2 rounded-lg ${!request?.isReject
                          ? 'hover:bg-red-600 hover:text-white border-red-600 text-red-600'
                          : 'hover:bg-red-900 hover:text-white border-red-900 text-red-900'
                          }`}
                        disabled={request.isReject}
                        onClick={() => handleReject({ email: request.email, isVerified: true })}
                      >
                        {request.isReject ? 'Rejected' : 'Reject'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>): activeTab=='rejects'?
          (<table className="table w-full ">
            <thead>
              <tr className="bg-gray-700 text-white text-center">
                <th></th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">CV</th>
                <th className="px-4 py-2">Requests</th>
              </tr>
            </thead>
            <tbody>
              {getPaginatedData().map((request, index) => (
                <tr key={index} className="text-center border-b">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{request?.firstName}</td>
                  <td className="px-4 py-2 border">{request?.email}</td>
                  <td className="px-4 py-2 border">{format(new Date(request?.createdAt), 'yyyy-MM-dd')}</td>
                  <td className="px-4 py-2 border">
                    <a
                      href={request.cv}
                      download
                      className="text-blue-600 hover:underline flex items-center justify-center py-1 border rounded-lg border-blue-500"
                    >
                      <FaCloudDownloadAlt className='text-blue-700 text-[20px]' />
                    </a>
                  </td>
                  <td className="px-4 py-2 border">
                    {!request.isReject && (
                      <button
                        className={`border font-bold py-1 px-2 rounded-lg ${!request?.isVerified
                          ? 'hover:bg-green-600 hover:text-white border-green-600 text-green-600'
                          : 'hover:bg-gray-600 hover:text-white border-gray-600 text-gray-600'
                          }`}
                        disabled={request?.isVerified}
                        onClick={() =>
                          handleRequestVerification({
                            email: request.email,
                            isVerified: !request.isVerified,
                          })
                        }
                      >
                        {request?.isVerified ? 'Accepted' : 'Accept'}
                      </button>
                    )}
                    {!request.isVerified && (
                      <button
                        className={`border font-bold py-1 px-2 ml-2 rounded-lg ${!request?.isReject
                          ? 'hover:bg-red-600 hover:text-white border-red-600 text-red-600'
                          : 'hover:bg-red-900 hover:text-white border-red-900 text-red-900'
                          }`}
                        disabled={request.isReject}
                        onClick={() => handleReject({ email: request.email, isVerified: true })}
                      >
                        {request.isReject ? 'Rejected' : 'Reject'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>):
          (<table className="table w-full ">
            <thead>
              <tr className="bg-gray-700 text-white text-center">
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Profile</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Profession</th>
                <th className="px-4 py-2">Verified</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {getPaginatedData().map((instructor, index) => (
                <tr key={index} className="text-center border-b">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex items-center justify-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={instructor.profile?.avatar} alt="Profile Avatar" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2 border">{instructor?.firstName}</td>
                  <td className="px-4 py-2 border">{instructor?.email}</td>
                  <td className="px-4 py-2 border">{instructor.profession}</td>
                  <td className="px-4 py-2 border">{`${instructor.isVerified ? 'Yes' : 'No'}`}</td>
                  <td className="px-4 py-2 border">
                    <button
                      className={`border font-bold py-1 px-2 rounded-lg ${
                        instructor.isBlocked
                          ? 'hover:bg-green-600 hover:text-white border-green-600 text-green-600'
                          : 'hover:bg-red-600 hover:text-white border-red-600 text-red-600'
                      }`}
                      onClick={() => handleBlock({ _id: instructor._id, isBlocked: !instructor.isBlocked })}
                    >
                      {instructor.isBlocked ? 'Unblock' : 'Block'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>)
          

        }

          
          <PaginationControls currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </div>
      </div>
    </>
  );
};

export default InstructorRequest;
