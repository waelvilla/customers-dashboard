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
const initialActivePage = 1;
const AllCustomersScreen: React.FC = () => {
  const [activePage, setActivePage] = useState<number>(initialActivePage);
  const { data, error, isLoading, isFetching, refetch } = useCustomersQuery(activePage);
  const navigate = useNavigate();
  const [displayData, setDisplayData] = useState<DisplayUser[]>([]);

  useEffect(() => {
    if (data?.customers?.length) {
      const displayableData = data?.customers.map((customer) => ({
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

  useEffect(() => {
    if (activePage !== initialActivePage) {
      refetch();
    }
  }, [activePage]);

  const onClickCustomer = (customerId: string) => {
    navigate(`/customers/${customerId}`);
  };

  const renderData = () => {
    if (!data || !displayData?.length) {
      return null;
    }
    const { page, totalPages } = data;

    return (
      <DataTable
        setPage={(newPage) => setActivePage(newPage)}
        count={totalPages}
        page={page}
        rows={displayData}
        onCellClick={onClickCustomer}
      />
    );
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
