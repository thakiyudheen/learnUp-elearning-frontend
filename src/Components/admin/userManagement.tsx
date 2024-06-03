import { useAppDispatch } from '@/hooks/hooke';
import { getAllStudentAction } from '@/redux/store/actions/admin/getAllStudentAction';
import React, { useEffect } from 'react';

interface Product {
  name: string;
  color: string;
  category: string;
  price: number;
  noName: string;
  profession: string;
  verified: boolean;
}

const UserTable: React.FC = () => {

  const dispatch = useAppDispatch()
  const products: Product[] = [
    {
      name: 'Quantum Laptop Pro',
      color: 'Midnight Blue',
      category: 'Laptops',
      price: 2499,
      noName: 'QLP-1234',
      profession: 'Developer',
      verified: true,
    },
    {
      name: 'Techno Tablet X',
      color: 'Cosmic Gray',
      category: 'Tablets',
      price: 899,
      noName: 'TTX-5678',
      profession: 'Designer',
      verified: false,
    },
    {
      name: 'Pixel Wireless Mouse',
      color: 'Ruby Red',
      category: 'Accessories',
      price: 59,
      noName: 'PWM-9012',
      profession: 'Writer',
      verified: true,
    },
    // Add more product objects as needed
    


  ];

  useEffect(() => {
    const Students = dispatch(getAllStudentAction())
  })

  return (
    <>
    <div className="mb-6 ml-[4.3rem] mt-[2rem]">
        <h1 className="text-xl font-bold ">Users Management</h1>
    </div>
    <div className="flex w-[100%]  justify-center  h-[570px]">
    
      <div className="overflow-hidden w-[90%]">
        <table className="w-full rounded-lg  ">
          <thead>
            <tr className="bg-gray-700 text-white text-center">
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Profession</th>
              <th className="px-4 py-2">Verified</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="text-center border-b">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{product.name}</td>
                <td className="px-4 py-2 border">{product.name}</td>
                <td className="px-4 py-2 border">{product.profession}</td>
                <td className="px-4 py-2 border">{product.verified ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2 border">
                  <button className=" border hover:bg-green-600 hover:text-white border-green-600 0 text-white font-bold py-1 px-2 rounded-lg">
                    Block
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

export default UserTable;
