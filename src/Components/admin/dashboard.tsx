import { useAppDispatch, useAppSelector } from '@/hooks/hooke';
import { RootState } from '@/redux/store';
import { getAllInstructorsAction } from '@/redux/store/actions/admin/getAllInstructorsAction';
import { getAllStudentAction } from '@/redux/store/actions/admin/getAllStudentAction';
import  { useEffect, useState } from 'react';
import { MdOutlineAttachMoney } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoCard } from "react-icons/io5";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { getMoreEnrolledCourseAction } from '@/redux/store/actions/enrollment/getMoreEnrolledCourseAction';
import { getAllCourseAction } from '@/redux/store/actions/course/getAllCourseAction';
import { getAllPaymentAction } from '@/redux/store/actions/Payment/getAllPaymentAction';
import LoadingIndicator from '../common/skelton/loading';


const COLORS = ['#336699', 'gray', '#003366', '#FF8042'];
const Dashboard = () => {
  const { data } = useAppSelector((state: RootState) => state.user)
  const [Instructor, setInstructor] = useState<any>(null)
  const [Students, setStudents] = useState<any>(null)
  const [Profit, setProfit] = useState<any>(null)
  const [course, setCourse] = useState<any>([])
  const [ pieData,setPieData]=useState<any>([])
  const [ payment,setPayment]=useState<any>([])
  const [isLoading ,setLoading]= useState<boolean>(false)
  const dispatch = useAppDispatch()
  useEffect(() => {

    const getData = async () => {
      
      setLoading(true)
      const response: any = await dispatch(getAllInstructorsAction({}))
      const response1: any = await dispatch(getAllStudentAction({}))
      const response2 = await dispatch(getMoreEnrolledCourseAction())
      const response3 = await dispatch(getAllCourseAction({}))
      const response4=await dispatch(getAllPaymentAction({}))
      console.log('its payment data',response2.payload.data)
      console.log(response1)
      setProfit(data?.data.profit)
      if (response.payload && response.payload.success) {
        setInstructor(response.payload.data.totalItems)
        setStudents(response.payload.data.totalItems)
        setCourse(response2.payload.data)
        setPieData(response3.payload.courses)
        setPayment(response4.payload.data)
        setLoading(false)
      }
    }
    getData()

  }, [dispatch])
  const formatDate = (dateString : any ) => {
    const options :any  = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

 // Aggregate categories and their course counts
 console.log(pieData);
 
 const categoriesMap = new Map<string, { _id: string; name: string; count: number; }>();
 pieData.forEach((course:any) => {
     if (course.category) {
         const categoryId = course.category._id.toString();
         if (categoriesMap.has(categoryId)) {
             categoriesMap.get(categoryId)!.count++;
         } else {
             categoriesMap.set(categoryId, {
                 _id: categoryId,
                 name: course.category.categoryName,
                 count: 1
             });
         }
     }
 });

 const categories = Array.from(categoriesMap.values());

 console.log('this is count of that',categories)

  return (

    <div className="min-h-screen bg-gray-100 dark:bg-base-100 text-white p-4">
      {isLoading&&<LoadingIndicator/>}
      <div>
        <h1 className='font-bold mb-5 text-gray-700 dark:text-gray-400'>Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card title="Revenue" value={Profit} percentage="+55%" description="than last week" bgColor="dark:bg-gray-800 bg-white  " icon={<MdOutlineAttachMoney className='text-[25px]' />} />
        <Card title="Students" value={Students} percentage="+3%" description="than last month" bgColor="dark:bg-gray-800 bg-white" icon={<PiStudentBold className='text-[25px]' />} />
        <Card title="Instructor" value={Instructor} percentage="+1%" description="than yesterday" bgColor="dark:bg-gray-800 bg-white" icon={<FaChalkboardTeacher className='text-[25px]' />} />
        {/* <Card title="Followers" value="+91" description="Just updated" bgColor="bg-red-700" /> */}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <ChartCard title="Popular Course" data={course} />
        <ChartCardPie title="Category" data={categories} />
        {/* <ChartCard title="User Joined" /> */}
        {/* <ChartCard title="Completed Tasks" /> */}
      </div>
      <div className='dark:bg-gray-800 p-5 mt-8 rounded-lg bg-white shadow-lg'>

        <h1 className='font-bold mt-3 dark:text-gray-400 text-gray-500'>Recent Transaction</h1>
        <div className="overflow-hidden w-full mt-4 mb-4 h-[240px]">
            <div className="overflow-x-auto rounded-lg">
                <table className="table-auto w-full ">
                    <thead>
                        <tr className="dark:bg-gray-700 bg-white dark:text-gray-400 text-black dark:text-gray-400 text-center">
                            <th className='py-2'>No</th>
                            <th>User Name</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payment.map((payment :any, index:any) => (
                            <tr key={payment._id} className="text-center dark:text-gray-400 text-black py-7 border-b border-gray-300 dark:border-gray-900 dark:hover:bg-gray-800">
                                <td className='py-4'>{index + 1}</td>
                                <td>{payment.userId.firstName}</td>
                                <td>₹ {payment.amount}</td>
                                <td>{formatDate( payment.createdAt)}</td>
                                <td><div className="badge badge-primary badge-outline">{payment.status}</div></td>
                                <td className='flex justify-center items-center mt-4 text-gray-500'><IoCard className='mr-1 text-[18px] text-gray-500'/>{payment.method}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value, percentage, description, bgColor, icon }: { title: string, value: string, percentage?: string, description: string, bgColor: string, icon?: any }) => (
  <div className={`px-4 py-7 rounded-lg ${bgColor}  shadow-lg dark:text-gray-500 text-gray-600`}>

    <div className='flex items-center'>
      {icon}
      <h2 className="text-lg font-bold ml-1">{title}</h2>
    </div>

    <p className="text-2xl font-bold ml-4">{value}</p>
    {/* {percentage && <p className="text-sm">{percentage}</p>}
    <p className="text-sm">{description}</p> */}
  </div>
);

const ChartCard = ({ title, data }: { title: string, data: any }) => (
  <div className="p-4 dark:bg-gray-800 rounded-lg bg-white shadow-lg">
    <h2 className="text-lg mb-4 text-gray-500">{title}</h2>
    {/* Chart */}
    <div className="h-60 dark:bg-gray-800 bg-white rounded">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 50, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="category" dataKey="courseData.courseTitle" />
          <YAxis type="number" dataKey="count" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);
const ChartCardPie = ({ title, data }:any) => (
  <div className="p-4 dark:bg-gray-800 rounded-lg bg-white shadow-lg">
    <h2 className="text-lg mb-4 text-gray-500 dark:text-gray-300">{title}</h2>
    {/* Chart */}
    <div className="h-60 dark:bg-gray-800 bg-white rounded">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="48%"
            outerRadius={95}
            fill="#8884d8"
          >
            {data.map((entry:any, index:any) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);




export default Dashboard;
