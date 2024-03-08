import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { useEditUserMutation } from '../../api/auth';
import { Avatar as MuiAvatar, CircularProgress } from '@mui/material';

const Avatar = ({ mod }) => {
  const { image } = useSelector((state) => state.user.credentials.user); // Get user's image from Redux store
  const [editUser, { isLoading }] = useEditUserMutation();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const handleImageUpload = async (event) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      const base64Image = await convertBase64(file);
      await editUser({ image: base64Image });
      setUploading(false);
      alert('Profile image updated successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading profile image. Please try again.');
      setUploading(false);
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <>
      <MuiAvatar alt="Profile Image" src={image} />
      {uploading && <CircularProgress />}
      {mod && (
        <>
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
          <Button onClick={() => fileInputRef.current.click()} variant="contained" color="primary">
            Change Profile Image
          </Button>
        </>
      )}
    </>
  );
};

export default Avatar;

