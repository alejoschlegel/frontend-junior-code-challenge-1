import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  headers
}) => {
  console.log("editFormData", editFormData);
  return (
    <tr className="editableRow">
      {
        headers.map((header, index) => {
          return (
            header === "Beschreibung" ? 
            <td className="BeschreibungCell" id={index}>
              <textarea
                index={index}
                type="text"
                placeholder={header}
                id="BeschreibungEdit"
                name="Beschreibung"
                value={editFormData[header]}
                onChange={handleEditFormChange}
              ></textarea>
            </td> :
            <td className="editableCell" id={index}>
              <textarea
                index={index}
                type="text"
                placeholder={header}
                name={header}
                value={editFormData[header]}
                onChange={handleEditFormChange}
              ></textarea>
            </td>
          )
        })
      }
      <td className="actionsEditRow">
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};
export default EditableRow;
