import React from 'react';
import { useSelector } from 'react-redux';
import { useDeleteUserMutation } from '../../api/auth'; // Adjust the import path as needed

const DeleteAccountButton = () => {
    const userId = useSelector((state) => state.user.credentials.user.id);
    const [deleteUserMutation] = useDeleteUserMutation();

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete your account?')) {
            try {
                // Call the deleteUserMutation function provided by useDeleteUserMutation
                await deleteUserMutation(userId);
                // Redirect the user to the login page after successful deletion
                window.location.href = '/login';
            } catch (error) {
                console.error('Error deleting user:', error);
                // Handle error state
            }
        }
    };

    return (
        <button onClick={handleDelete}>Delete Account</button>
    );
};

export default DeleteAccountButton;






