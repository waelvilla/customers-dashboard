import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomersQuery } from 'src/redux/api/customersApi';
import { Alert, Box, CircularProgress, IconButton, Typography } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DataTable from 'src/components/DataTable';
import { UserStatus } from 'src/models/customer.model';
import { HeaderContainer } from './styles';

type DisplayUser = {
  id: string;
  name: string;
  status: UserStatus;
};
const AllCustomersScreen: React.FC = () => {
  const { data, error, isLoading, isFetching, refetch } = useCustomersQuery();
  const navigate = useNavigate();
  const [displayData, setDisplayData] = useState<DisplayUser[]>([]);

  useEffect(() => {
    if (data?.length) {
      const displayableData = data.map((customer) => ({
        id: customer.id,
        name: `${customer.firstName} ${customer.lastName}`,
        'phone number': customer.phoneNumber,
        email: customer.email,
        'country code': customer.countryCode,
        status: customer.status
      }));
      setDisplayData(displayableData);
    }
  }, [data]);

  const onClickCustomer = (customerId: string) => {
    navigate(`/customers/${customerId}`);
  };

  const renderData = () => {
    if (!displayData?.length) {
      return null;
    }
    return <DataTable rows={displayData} onCellClick={onClickCustomer} />;
  };

  const renderHeader = () => {
    return (
      <HeaderContainer>
        <Typography variant="h4">Customers</Typography>
        <IconButton onClick={refetch} disabled={isFetching} aria-label="reload">
          <AutorenewIcon />
        </IconButton>
        {error && (
          <Alert severity="error" color="error">
            An error occured while fetching the data, please try again or check your connection
          </Alert>
        )}
      </HeaderContainer>
    );
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      {renderHeader()}
      {renderData()}
    </Box>
  );
};

export default AllCustomersScreen;
