import React, { useState, useEffect } from 'react';
import { useEditUserMutation } from '../../api/auth';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import DeleteAccountButton from '../Inputs/deleteButton';
import Avatar from '../Inputs/avatar';
import PropTypes from 'prop-types';



const SettingsComponent = ({ userData, refetchProfile }) => {
  console.log(userData)
  const [editUser] = useEditUserMutation();
  const [formData, setFormData] = useState({
    username: userData?.username || '',
    email: userData?.email || '',
    bio: userData?.bio || '',
    location: userData?.location || '',
    password: '',
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editUser({
        id: userData.id,
        body: {
          username: formData.username,
          email: formData.email,
          bio: formData.bio,
          location: formData.location,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
      });
      refetchProfile();
      // Handle submission success
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle error state
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Avatar mod={true} src={userData.image} userData={userData} />
        <Box component="div" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
        <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            multiline
            fullWidth
          />
          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Password"
            name="password"
            type="password" // Set input type to password
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
          />
        </Box>
        <Button type="submit">Save Changes</Button> {/* Move inside the form and change type to "submit" */}
      </form>
      <DeleteAccountButton />
    </div>
  );
};

SettingsComponent.propTypes = {
  userData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    bio: PropTypes.string,
    location: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    mod: PropTypes.bool,
    refetch: PropTypes.func.isRequired
  }).isRequired,
    refetchProfile: PropTypes.func.isRequired,
};

export default SettingsComponent;




