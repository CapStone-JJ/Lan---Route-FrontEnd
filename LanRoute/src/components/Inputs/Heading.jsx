import React from 'react';
import { ListItem, ListItemIcon, Typography } from '@mui/material';

const Heading = ({ name, icon }) => {
  return (
    <ListItem disableGutters>
      {/* Logo displayed as a ListItemIcon */}
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      {/* Name displayed as Typography */}
      <Typography variant="h5">
        <h1>Ouroute</h1>
      </Typography>
    </ListItem>
  );
};

export default Heading;
