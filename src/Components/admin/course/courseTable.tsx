import React from 'react';
import { useNavigate } from 'react-router-dom';

interface InstructorRef {
  firstName: string;
}

interface Category {
  categoryName: string;
}

interface CourseTableProps {
  data?: any ;
  getPaginatedData: () => any;
  handleUpdate: (updateData: { isReject: boolean; _id: string; isPublished?: boolean }) => void;
}

const CourseTable: React.FC<CourseTableProps> = ({ data, getPaginatedData, handleUpdate }) => {
  const navigate = useNavigate();

  return (
    <table className="table table-zebra">
      <thead>
        <tr className="text-white bg-gray-700 text-center">
          <th>No</th>
          <th>Title</th>
          <th>Instructor Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>View</th>
          <th>Reject/Accept</th>
        </tr>
      </thead>
      <tbody>
        {getPaginatedData().map((course : any , index : any) => (
          <tr key={index} className="text-center border-b dark:hover:bg-gray-800">
            <td>{index + 1}</td>
            <td>{course.courseTitle}</td>
            <td>{course.instructorRef.firstName}</td>
            <td>{course.category.categoryName}</td>
            <td>{course.pricing === 'free' ? '0' : course.priceAmount}</td>
            <td>
              <button
                onClick={() => navigate(`/admin/view-course/`, { state: course._id })}
                className="border font-bold py-1 px-2 rounded-lg hover:bg-blue-600 hover:text-white border-blue-600 text-blue-600"
              >
                View
              </button>
            </td>
            <td>
              {!course.isReject && (
                <button
                  className={`border font-bold py-1 px-2 rounded-lg ${
                    !course.isPublished
                      ? 'hover:bg-green-600 hover:text-white border-green-600 text-green-600'
                      : 'hover:bg-gray-600 hover:text-white border-gray-600 text-gray-600'
                  }`}
                  disabled={course.isPublished}
                  onClick={() =>
                    handleUpdate({
                      isReject: false,
                      _id: course._id,
                      isPublished: true,
                    })
                  }
                >
                  {course.isPublished ? 'Accepted' : 'Accept'}
                </button>
              )}
              {!course.isPublished && (
                <button
                  className={`border font-bold py-1 px-2 ml-2 rounded-lg ${
                    course.isReject
                      ? 'hover:bg-red-600 hover:text-white border-gray-600 text-gray-600'
                      : 'hover:bg-red-600 hover:text-white border-red-600 text-red-600'
                  }`}
                  disabled={course.isReject}
                  onClick={() => handleUpdate({ isReject: true, _id: course._id })}
                >
                  {course.isReject ? 'Rejected' : 'Reject'}
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CourseTable;
