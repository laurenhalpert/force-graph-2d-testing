import React from "react";

function Search({ searchTerm, setter }) {
  function handleChange(e) {
    setter(e.target.value);
  }

  return (
    <header>
      <label htmlFor="searchBar">Search: </label>
      <input
        id="searchBar"
        name="searchBar"
        type="text"
        onChange={handleChange}
        value={searchTerm}
      ></input>
    </header>
  );
}

export default Search;
