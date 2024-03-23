import SearchBar from "../Inputs/searchBar";
import Sidebar from "../Inputs/sidebar";

const MainSearch = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
          <Sidebar />
          <SearchBar />
        </div>
      );
    };

export default MainSearch;