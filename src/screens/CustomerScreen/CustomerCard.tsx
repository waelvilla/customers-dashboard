import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
  MenuItem
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { $enum } from "ts-enum-util";
import { Customer, Gender, UserStatus } from 'src/models/customer.model';
import { StyledRowBox } from 'src/utils/styles';

const GENDERS = $enum(Gender).getKeys();
const STATUSES = $enum(UserStatus).getKeys();

export default function CustomerCard({ customer }: { customer: Customer }) {
  const [localData, setLocalData] = useState<Customer>(customer);
  const onUpdate = (key: keyof Customer, newValue: any) => {
    setLocalData({ ...localData, [key]: newValue });
  };

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
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              id="id"
              label="customer ID"
              fullWidth
              variant="standard"
              onChange={(event) => onUpdate('id', event.target.value)}
              value={localData.id}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="phoneNumber"
              label="Phone Number"
              fullWidth
              autoComplete="tel"
              variant="standard"
              onChange={(event) => onUpdate('phoneNumber', event.target.value)}
              value={localData.phoneNumber}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="firstName"
              label="First Name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              onChange={(event) => onUpdate('firstName', event.target.value)}
              value={localData.firstName}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="lastName"
              label="Last Name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              onChange={(event) => onUpdate('lastName', event.target.value)}
              value={localData.lastName}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="nationalId"
              label="National ID"
              fullWidth
              variant="standard"
              onChange={(event) => onUpdate('nationalId', event.target.value)}
              value={localData.nationalId}
            />
            <FormControlLabel
              control={
                <Checkbox color="primary" name="isIdVerified" value={localData.isIdVerified} />
              }
              label="ID has been verified"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="email"
              label="Email"
              fullWidth
              autoComplete="email"
              variant="standard"
              onChange={(event) => onUpdate('email', event.target.value)}
              value={localData.email}
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  name="isEmailVerified"
                  value={localData.isEmailVerified}
                />
              }
              label="Email has been verified"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="gender"
              select
              fullWidth
              label="Gender"
              variant="standard"
              value={localData.gender}
              onChange={(event) => onUpdate('gender', event.target.value)}>
              {GENDERS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="status"
              select
              fullWidth
              label="Status"
              variant="standard"
              value={localData.status}
              onChange={(event) => onUpdate('status', event.target.value)}>
              {STATUSES.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
