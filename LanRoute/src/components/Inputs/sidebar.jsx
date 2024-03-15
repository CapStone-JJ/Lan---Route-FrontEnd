import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExploreIcon from '@mui/icons-material/Explore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@material-ui/icons/Search';
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
import { useSelector } from 'react-redux';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import LogoutButton from './logoutButton';

const Sidebar = () => {
  const username = useSelector((state) => state.user.credentials.user.username);
  const avatarUrl = useSelector((state) => state.user.avatarUrl)
  return (
    <Drawer variant="permanent" sx={{ width: 275 }}>
      <List>
        <ListItem disablePadding sx={{ p: 1 }}>
          <ListItemIcon>
            <SwapCallsIcon color="primary" />
            <ListItemText primary="Ouroute" />
          </ListItemIcon>
        </ListItem>
        <Link to="/mainFeed">
        <ListItem button sx={{ borderRadius: '30px', my: 1 }}>
          <ListItemIcon>
            <ExploreIcon />
          </ListItemIcon>
          <ListItemText primary="Routes" />
        </ListItem>
        </Link>
        <ListItem button sx={{ borderRadius: '30px', my: 1 }}>
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem>
        <Link to="/themePage">
        <ListItem button sx={{ borderRadius: '30px', my: 1 }}>
          <ListItemIcon>
            <SettingsSuggestIcon />
          </ListItemIcon>
          <ListItemText primary="Theme Settings" />
        </ListItem>
        </Link>
        <Link to="/searchBar">
        <ListItem button sx={{ borderRadius: '30px', my: 1 }}>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItem>
        </Link>
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
        <Link to={`/profile/${username}`}>
        <IconButton sx={{ ml: 'auto', mt: 2 }}>
          <Avatar alt={`profile/${username} Avatar`} src={avatarUrl} />
        </IconButton>
        </Link>
      </Tooltip>
      <LogoutButton />
    </Drawer>
  );
};

export default Sidebar;

