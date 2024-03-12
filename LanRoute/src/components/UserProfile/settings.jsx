import React, { useState } from 'react';
import { useGetUserQuery, useEditUserMutation, useDeleteUserMutation } from '../../api/auth';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useSelector } from "react-redux";
import DeleteAccountButton from '../Inputs/deleteButton';



const SettingsComponent = () => {
  const { data, loading, error } = useGetUserQuery();
  const [editUser] = useEditUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  console.log(data)

  const [formData, setFormData] = useState(() => {
    if (data) {
      return {
        username: data.username || '',
        email: data.email || '',
        bio: data.bio || '',
        location: data.location || '',
        password: '',
      };
    } else {
      return {
        username: '',
        email: '',
        bio: '',
        location: '',
        password: '',
      };
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log("Password:", value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await editUser({
            id: data.id,
            body: {
                username: formData.username,
                email: formData.email,
                bio: formData.bio,
                location: formData.location,
                password: formData.password,
            },
        });
    } catch (error) {
        console.error('Error updating user:', error);
        // Handle error state
    }
};


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user data: {error.message}</p>;

    return (
        <div>
          <h2>Settings</h2>
          <form onSubmit={handleSubmit}> {/* Change div to form */}
            <Box component="div" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
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
            <button type="submit">Save Changes</button> {/* Move inside the form and change type to "submit" */}
          </form>
          <DeleteAccountButton />
        </div>
      );
      
};

export default SettingsComponent;

