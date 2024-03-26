import FriendsPage from "../Friends/FriendsPage";
import Sidebar from "../Inputs/sidebar";
import PrimarySearchAppBar from "../Inputs/Header";

const MainFriends = () => {
    return (
      <div>
      <div>
      <PrimarySearchAppBar />
        </div>
      <div style={{ display: 'flex', textAlign: 'center' }}>
          <FriendsPage />
        </div>
      </div>
      );
    };

export default MainFriends;