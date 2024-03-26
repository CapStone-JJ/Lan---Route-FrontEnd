import SearchBar from "../Inputs/searchBar";
import PrimarySearchAppBar from "../Inputs/Header";

const MainSearch = () => {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
          <PrimarySearchAppBar />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', marginTop: '60px' }}>
          <SearchBar />
        </div>
      </div>
      );
    };

export default MainSearch;