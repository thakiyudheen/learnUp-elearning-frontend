import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useAppDispatch, useAppSelector } from '../hooks/hooke';
import { logoutAction } from '@/redux/store/actions/auth/logoutAction';

type ProtectedRouteProps = {
	element: React.ReactElement;
	allowedRoles: string[];
};

const Protected: FC<ProtectedRouteProps> = ({ element, allowedRoles }) => {
	const dispatch = useAppDispatch()
	const { data } = useAppSelector((state: RootState) => state.user);
    console.log('this is userdata',data?.data)

	if (!data) {
		return <Navigate to="/home" replace />;
	}else if(data.data.isBlocked){
		dispatch(logoutAction())
	}

	const userRole = data.data.role || '';
	if (allowedRoles.includes(userRole)) {

		return element;

	} else {
		return <Navigate to="/not-authorized" replace />;
	}
};

export default Protected;
