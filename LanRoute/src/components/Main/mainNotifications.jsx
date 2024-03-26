import Notifications from "../Notifications";
import PrimarySearchAppBar from "../Inputs/Header";

const MainNotifications = () => {
    return (
      <div>
      <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
          <PrimarySearchAppBar />
      </div>
      <div style={{ display: "flex", textAlign: 'center', }}>
          <Notifications />
        </div>
        </div>
      );
    };

export default MainNotifications;