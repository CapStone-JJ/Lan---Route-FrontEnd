import FriendsPage from "../Friends/FriendsPage";
import Sidebar from "../Inputs/sidebar";

const MainFriends = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Sidebar />
          <FriendsPage />
        </div>
      );
    };

export default MainFriends;