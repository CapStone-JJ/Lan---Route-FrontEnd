import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HouseIcon from '@mui/icons-material/House';
import ExploreIcon from '@mui/icons-material/Explore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ChatIcon from '@mui/icons-material/Chat';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SwapCallsIcon from '@mui/icons-material/SwapCalls';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Drawer variant="permanent" sx={{ width: 275 }}>
      <List>
        <ListItem disablePadding sx={{ p: 1 }}>
          <ListItemIcon>
            <SwapCallsIcon color="primary" />
            <ListItemText primary="Ouroute" />
          </ListItemIcon>
        </ListItem>
        <ListItem button sx={{ borderRadius: '30px', my: 1 }}>
          <ListItemIcon>
            <HouseIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button sx={{ borderRadius: '30px', my: 1 }}>
          <ListItemIcon>
            <ExploreIcon />
          </ListItemIcon>
          <ListItemText primary="Routes" />
        </ListItem>
        <ListItem button sx={{ borderRadius: '30px', my: 1 }}>
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem>
        <ListItem button sx={{ borderRadius: '30px', my: 1 }}>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Messages" />
        </ListItem>
        <ListItem button sx={{ borderRadius: '30px', my: 1 }}>
          <ListItemIcon>
            <BookmarkIcon />
          </ListItemIcon>
          <ListItemText primary="Bookmarks" />
        </ListItem>
        <ListItem button sx={{ borderRadius: '30px', my: 1 }}>
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary="Lists" />
        </ListItem>
        <ListItem button sx={{ borderRadius: '30px', my: 1 }}>
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Moments" />
        </ListItem>
        <ListItem button sx={{ borderRadius: '30px', my: 1 }}>
          <ListItemIcon>
            <MoreHorizIcon />
          </ListItemIcon>
          <ListItemText primary="More" />
        </ListItem>
      </List>
      <Divider />
      <Tooltip title="Profile">
        <Link to="/profilePage">
        <IconButton sx={{ ml: 'auto', mt: 2 }}>
          <Avatar alt="User Avatar" src="/path_to_avatar.jpg" />
        </IconButton>
        </Link>
      </Tooltip>
    </Drawer>
  );
};

export default Sidebar;



