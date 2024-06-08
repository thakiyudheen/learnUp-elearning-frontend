import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooke';
import { RootState } from '../redux/store';

interface PublicRouteProps  {
  element: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => {
  const { data } = useAppSelector((state: RootState) => state.user);
  console.log('this is public data',data)
  return data?.data ? <Navigate to="/" replace /> : element;
  
};

export default PublicRoute;