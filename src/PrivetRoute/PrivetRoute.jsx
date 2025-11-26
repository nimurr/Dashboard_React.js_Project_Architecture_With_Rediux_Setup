import React from 'react';
import { useGetUserProfileQuery } from '../redux/features/setting/settingApi';
import { useNavigate } from 'react-router-dom';

const PrivetRoute = ({ children }) => {

    const navigate = useNavigate();

    const { data, isLoading } = useGetUserProfileQuery()

    if (isLoading) {
        return <h1 className='text-3xl font-semibold text-center text-blue-600 h-screen flex items-center justify-center'>Loading...</h1>
    }

    if (!data?.data?.email) {
        return navigate("/auth/login");
    }

    return (
        <div>
            {children}
        </div>
    );
}

export default PrivetRoute;
