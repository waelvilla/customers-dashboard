import React, { useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useCustomerQuery } from 'src/redux/api/customersApi';
import { useAppSelector } from 'src/redux/hooks';
import { useNavigate } from 'react-router-dom';
import CustomerCard from './CustomerCard';

const CustomerScreen: React.FC = () => {
  const params = useParams<{ customerId: string }>();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const customerId = params.customerId || '';
  const { data, error, isLoading, isFetching } = useCustomerQuery(customerId);

  useEffect(() => {
    if (!user?.token) navigate('/login');
  }, [user]);

  if (isFetching || isLoading || !data) {
    return <CircularProgress />;
  }
  return (
    <Box>
      <CustomerCard customer={data} canEdit={user?.role === 'admin'} />
    </Box>
  );
};

export default CustomerScreen;
