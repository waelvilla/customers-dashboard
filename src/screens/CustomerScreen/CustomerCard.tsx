import React from 'react';
import { Card, CardHeader, CardContent, TextField, FormGroup } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Customer } from 'src/models/customer.model';

export default function CustomerCard({ customer }: { customer: Customer }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        avatar={<AccountCircleIcon fontSize="large" />}
        title={`${customer.firstName} ${customer.lastName}`}
        titleTypographyProps={{
          variant: 'h4'
        }}
      />
      <CardContent>
        <FormGroup>
          <TextField value={customer.email} />
          <TextField value={customer.gender} />
        </FormGroup>
      </CardContent>
    </Card>
  );
}
