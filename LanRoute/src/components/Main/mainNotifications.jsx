import Notifications from "../Notifications";
import Sidebar from "../Inputs/sidebar";

const MainNotifications = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Sidebar />
          <Notifications />
        </div>
      );
    };

export default MainNotifications;