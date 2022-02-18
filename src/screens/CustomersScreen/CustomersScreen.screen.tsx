import React, { useState, useEffect } from 'react';
import { useCustomersQuery } from 'src/services/api';
import { Button, Typography } from '@mui/material';
import Navbar from 'src/components/Navbar';
import { Box } from '@mui/system';
import DataTable from 'src/components/DataTable';
import { UserStatus } from 'src/models/customer.model';

type DisplayUser = {
  id: string;
  name: string;
  status: UserStatus;
}
const CustomersScreen: React.FC = () => {
  const { data, error, isLoading, isFetching, isSuccess } = useCustomersQuery();
  const [displayData, setDisplayData] = useState<DisplayUser[]>([]);

  useEffect(() => {
    if (data?.length) {
      const displayableData = data.map((customer) => ({
        id: customer.customer_id.substr(0, 5),
        name: `${customer.first_name} ${customer.last_name}`,
        status: customer.status
      }));
      setDisplayData(displayableData)
    }
  }, [data]);
  return (
    <Box>
      <Typography variant="h4">Customers</Typography>
      {data && <DataTable rows={displayData} />}
    </Box>
  );
};

export default CustomersScreen;
