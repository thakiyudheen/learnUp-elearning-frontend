import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooke';
import { RootState } from '../redux/store';

interface HomeRoutes  {
  element: React.ReactNode;
}

const HomeRoutes: React.FC<HomeRoutes> = ({ element }) => {
  const { data } = useAppSelector((state: RootState) => state.user);
  
  
  if(data?.data && data?.data.role =='student'){
    return element
  }else if(data?.data && data?.data.role !='student'){
    return <Navigate to="/" replace />
  }else{
    return element
  }
};

export default HomeRoutes;