import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useCustomerQuery } from 'src/services/customersApi';
import CustomerCard from './CustomerCard';

const CustomerScreen: React.FC = () => {
  const params = useParams<{ customerId: string }>();
  const customerId = params.customerId || '';
  const { data, error, isLoading, isFetching } = useCustomerQuery(customerId);

  if (isFetching || isLoading || !data) {
    return <CircularProgress />;
  }
  return (
    <Box>
      <CustomerCard customer={data} />
    </Box>
  );
};

export default CustomerScreen;
