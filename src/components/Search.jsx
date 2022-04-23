const Search = ({
    dataBackup,
    setData,
    useState,
}) => {
    let Search = (e) => {
        e.preventDefault();
        let search = searchInput;
        let newData = [...dataBackup].filter(function(item) {
          return Object.keys(item).some(function(key) {
            return String(item[key]).toLowerCase().includes(search);
          });
        });
        setData(newData);
        setSearchInput("");
      };
      const [searchInput, setSearchInput] = useState("");
      const handleSearchChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
      };
  return (
<div className="search_container">
        <h1>.CSV editer</h1>
        <div>
          <input type="text" placeholder="Search" id='searchInput' onChange={(e) => handleSearchChange(e)}/>
          <button id='search_button' type="submit" onClick={(e) => Search(e)}> <span class="material-icons-sharp">search</span> </button>
        </div>
      </div>
  );
};

export default Search;