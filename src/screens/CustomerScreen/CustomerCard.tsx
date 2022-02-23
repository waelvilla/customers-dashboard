import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Typography,
  Box,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import { $enum } from 'ts-enum-util';
import { Customer } from 'src/models/customer.model';
import { Gender, UserStatus } from 'src/types';
import Modal from 'src/components/Modal';
import locale from 'src/locale/en.json';

const { CustomerScreen: text, general: generalText } = locale;

const GENDERS = $enum(Gender).getKeys();
const STATUSES = $enum(UserStatus).getKeys();

export default function CustomerCard({ customer }: { customer: Customer }) {
  const navigate = useNavigate();
  const [localData, setLocalData] = useState<Customer>(customer);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmSave, setConfirmSave] = useState<boolean>(false);
  const [editingVerifiedField, setEditingVerifiedField] = useState<'nationalId' | 'email' | null>();

  const onUpdate = (key: keyof Customer, newValue: any) => {
    if (key === 'address') {
      const address = { ...localData.address, ...newValue };
      setLocalData({ ...localData, address });
    } else if (key === 'nationalId' && localData.isIdVerified) {
      // show a confirmation popup
      setEditingVerifiedField('nationalId');
      setModalOpen(true);
    } else if (key === 'email' && localData.isEmailVerified) {
      // show a confirmation popup
      setEditingVerifiedField('nationalId');
      setModalOpen(true);
    } else {
      setLocalData({ ...localData, [key]: newValue });
    }
  };
  const onAcceptModifyVerifiedField = () => {
    setModalOpen(false);
    if (editingVerifiedField === 'email') {
      onUpdate('isEmailVerified', false);
    } else if (editingVerifiedField === 'nationalId') {
      onUpdate('isIdVerified', false);
    }
    setEditingVerifiedField(null);
  };

  const onClickSave = () => {
    setConfirmSave(true);
    setModalOpen(true);
  };
  const onConfirmSave = () => {
    setModalOpen(false);
    navigate('/customers');
  };
  const renderModal = () => {
    let title = '';
    let body = '';
    let primaryButtonAction = null;
    if (editingVerifiedField) {
      title = text.ErrorUpdatingVerifiedField;
      body =
        editingVerifiedField === 'email' ? text.errorEmailVerifiedBody : text.errorIdVerifiedBody;
      primaryButtonAction = onAcceptModifyVerifiedField;
    } else if (confirmSave) {
      title = text.confirmTitle;
      body = text.confirmBody;
      primaryButtonAction = onConfirmSave;
    } else return null;
    return (
      <Modal
        title={title}
        body={body}
        open={modalOpen}
        onDismiss={() => setModalOpen(false)}
        primaryButtonText="Confirm"
        primaryButtonAction={primaryButtonAction}
        secondaryButtonText="cancel"
        secondaryButtonAction={() => setModalOpen(false)}
      />
    );
  };
  return (
    <Card sx={{ minWidth: 275 }}>
      {(editingVerifiedField || confirmSave) && renderModal()}
      <CardHeader
        avatar={<AccountCircleIcon fontSize="large" />}
        title={`${customer.firstName} ${customer.lastName}`}
        titleTypographyProps={{
          variant: 'h4'
        }}
      />
      <CardContent>
        <Box marginBottom={1}>
          <Typography component="h1" variant="h6">
            {text.CustomerInfo}
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              id="id"
              label="customer ID"
              fullWidth
              variant="standard"
              disabled
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
                <Checkbox
                  color="primary"
                  name="isIdVerified"
                  checked={localData.isIdVerified}
                  onChange={(event) => onUpdate('isIdVerified', event.target.checked)}
                />
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
                  checked={localData.isEmailVerified}
                  onChange={(event) => onUpdate('isEmailVerified', event.target.checked)}
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
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                value={localData.birthDate}
                onChange={(newValue) => {
                  onUpdate('birthDate', newValue);
                }}
                renderInput={(params) => <TextField {...params} variant="standard" fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
        <Box marginBottom={1}>
          <Typography component="h1" variant="h6">
            {text.address}
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              id="Street"
              label="Street"
              fullWidth
              autoComplete="countryCode"
              variant="standard"
              onChange={(event) => onUpdate('address', { street: event.target.value })}
              value={localData.address.street}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="city"
              label="City"
              fullWidth
              autoComplete="city"
              variant="standard"
              onChange={(event) => onUpdate('address', { city: event.target.value })}
              value={localData.address.city}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="postalCode"
              label="Postal Code"
              fullWidth
              autoComplete="postal-code"
              variant="standard"
              onChange={(event) => onUpdate('address', { postalCode: event.target.value })}
              value={localData.address.postalCode}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="countryCode"
              label="Country"
              fullWidth
              autoComplete="country"
              variant="standard"
              onChange={(event) => onUpdate('countryCode', event.target.value)}
              value={localData.countryCode}
            />
          </Grid>
        </Grid>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
          }}
          mt={4}>
          <Button variant="contained" onClick={onClickSave}>
            {generalText.save}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
