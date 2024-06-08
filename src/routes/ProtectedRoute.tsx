import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useAppSelector } from '../hooks/hooke';

type ProtectedRouteProps = {
	element: React.ReactElement;
	allowedRoles: string[];
};

const Protected: FC<ProtectedRouteProps> = ({ element, allowedRoles }) => {
	const { data } = useAppSelector((state: RootState) => state.user);
    console.log('this is userdata',data?.data)

	if (!data) {
		console.log('this  is always',data)
		return <Navigate to="/home" replace />;
	}

	const userRole = data.data.role || '';
	if (allowedRoles.includes(userRole)) {

		return element;

	} else {
		return <Navigate to="/not-authorized" replace />;
	}
};

export default Protected;
