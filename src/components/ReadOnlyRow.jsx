import React from "react";

const ReadOnlyRow = ({ item, handleEditClick, handleDeleteClick, headers }) => {
  return (
    <tr className="readRow">
      {
        headers.map((header, index) => {
          return (
            header === "Beschreibung" ? 
            <td key={index} className="descriptionReadRow"> <p>{item.Beschreibung}</p> </td> :
            <td key={index} className={header}>{item[header]}</td>
          );
        })
      }
      <td className="actionsRow">
        <button type="button" onClick={(event) => handleEditClick(event, item)} id="edit" >
        edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(item.Hauptartikelnr)} id="delete">
        delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;