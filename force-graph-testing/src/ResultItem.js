import React from "react";

function ResultItem({ result, searchTerm, category, onSelect }) {
  function handleClick(e) {
    console.log(e.target.innerText);
    onSelect();
  }
  //   make an a child linking to that specific result's baby graph
  console.log(category);
  console.log(result);
  return (
    <tr className="resultItem">
      {category === "user" ? (
        <td onClick={handleClick}>{result.firstName}</td>
      ) : (
        <td onClick={handleClick}>{result}</td>
      )}
    </tr>
  );
}

export default ResultItem;
