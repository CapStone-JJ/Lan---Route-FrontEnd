import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExploreIcon from "@mui/icons-material/Explore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import WidgetsIcon from '@mui/icons-material/Widgets';
import ChatIcon from "@mui/icons-material/Chat";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SwapCallsIcon from "@mui/icons-material/SwapCalls";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "./logoutButton";
import { useUserProfileQuery } from "../../api/auth";


const Sidebar = () => {
  const username = useSelector((state) => state.user.credentials.user.username);
  const { data } = useUserProfileQuery(username);
  
  return (
    <Drawer variant="permanent" sx={{ width: 275 }}>
      <List>
        <ListItem disablePadding sx={{ p: 1 }}>
          <ListItemIcon>
            <SwapCallsIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Ouroute" />
        </ListItem>
        <Link to="/feed">
          <ListItem button sx={{ borderRadius: "30px", my: 1 }}>
            <ListItemIcon>
              <ExploreIcon />
            </ListItemIcon>
            <ListItemText primary="Routes" />
          </ListItem>
        </Link>
        <Link to="/notifications">
          <ListItem button sx={{ borderRadius: "30px", my: 1 }}>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>
        </Link>
        <Link to="/friends">
          <ListItem button sx={{ borderRadius: "30px", my: 1 }}>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Friends" />
          </ListItem>
        </Link>
        <Link to="/searchBar">
          <ListItem button sx={{ borderRadius: "30px", my: 1 }}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItem>
        </Link>
        <Link to="/playlists">
        <ListItem button sx={{ borderRadius: "30px", my: 1 }}>
          <ListItemIcon>
            <WidgetsIcon />
          </ListItemIcon>
          <ListItemText primary="Playlists" />
        </ListItem>
        </Link>
      </List>
      <Divider />
      <Tooltip title="Profile">
        <Link to={`/profile/${username}`}>
          <IconButton sx={{ ml: "auto", mt: 2 }}>
          {data && data.image && (
        <Avatar alt={`${username} Avatar`} src={data.image} />
          )}
          </IconButton>
        </Link>
      </Tooltip>
      <LogoutButton />
    </Drawer>
  );
};

export default Sidebar;

