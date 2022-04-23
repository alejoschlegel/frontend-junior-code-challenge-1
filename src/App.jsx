import { useState, useEffect, Fragment } from 'react';
import "./App.css";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import Search from './components/Search';
import Pagination from './components/Pagination';
import Papa from 'papaparse';
import artikel from './Artikel.csv';

const App = () => {
  let headers = ['Hauptartikelnr', 'Artikelname', 'Hersteller', 'Beschreibung', 'Materialangaben', 'Geschlecht', 'Produktart', 'Ärmel', 'Bein', 'Kragen', 'Herstellung', 'Taschenart', 'Grammatur', 'Material', 'Ursprungsland', 'Bildname']
  const [dataBackup, setDataBackup] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(20);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentPosts = data.slice(indexOfFirstRow, indexOfLastRow);

  const [addShow, setAddShow] = useState(false);
  
  useEffect (() => {
    Papa.parse(artikel, {
      dynamicTyping: false,
      download: true,
      header: true,
      complete: function(results) {
        setData(results.data);
        setDataBackup(results.data);
        setLoading(false);
        headers = Object.keys(results.data[0]);
    },
      error: function(err) {
        setError(true);
      }
    });
  }, []);

  const DownloadNewCsv = () => {
    let csv = Papa.unparse(data);
    let blob = new Blob([csv], { type: "text/csv" });
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "Artikel.csv";
    a.click();
  };

  
  const [addFormData, setAddFormData] = useState({});
  const [editFormData, setEditFormData] = useState({});
  const [editEditId, setEditDatatId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    const newRow = headers.reduce((obj, header) => {
      obj[header] = addFormData[header];
      return obj;
    }, {});
    setData([...data, newRow]);
    setDataBackup([...dataBackup, newRow]);
    setAddShow(!addShow)
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const newData = [...data];

    const index = data.findIndex((e) => e.Hauptartikelnr === editEditId);
    if(index === -1) alert("Contact not found");

    newData[index] = editFormData;

    setData(newData);
    setDataBackup(newData);
    setEditDatatId(null);
  };

  const handleEditClick = (event, e) => {
    event.preventDefault();
    setEditDatatId(e.Hauptartikelnr);
    const formValues = headers.reduce((obj, header) => {
      obj[header] = e[header];
      return obj;
    }, {});

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditDatatId(null);
  };

  const handleDeleteClick = (id) => {
    if(window.confirm("Are you sure you want to delete this row?")) {
    const newData = [...data];

    const index = data.findIndex((e) => e.Hauptartikelnr === id);

    newData.splice(index, 1);

    setData(newData);
    setDataBackup(newData);
    }
  };
  
  return (
    <div className="app-container">
      <Search dataBackup = {dataBackup} setData = {setData} useState = {useState}> </Search>
      <div id="centralContainer">
        <form onSubmit={handleEditFormSubmit} className="table_form">
          <table>
            <thead>
              <tr id='listHead'>
                {headers.map((header) => {
                  return (
                    <th key={header}>
                      {header}
                    </th>
                  );
                })}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ?<tr><td colSpan="14">Loading...</td></tr> 
              :
              error ?<tr><td colSpan="14">Error!</td></tr> 
              :
              currentPosts.map((item, index) => {
                return (
                  <Fragment>
                    {editEditId === item.Hauptartikelnr ? (
                      <EditableRow
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                        headers={headers}
                      />
                    ) : (
                      <ReadOnlyRow
                        index={index}
                        item={item}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                        headers={headers}
                      />
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </form>

        <form onSubmit={handleAddFormSubmit} className={addShow ? "addShow" : "addHide"} >
          <div className="add_toolbar">
            <span className="material-icons-sharp" id="addClose" onClick={()=>setAddShow(!addShow)}>close</span>
            <button className="add_button" type='submit'>
              Add
              <span class="material-icons-sharp">add</span>
            </button>
          </div>
          <div className="addShow_container">
          {
            headers.map((header, index) => {
              return (
                <div className='card_addRow'>
                  <label>{header}</label>
                  <textarea
                    index={index}
                    type="text"
                    placeholder={header}
                    name={header}
                    value={editFormData[header]}
                    onChange={(e) => handleAddFormChange(e)}
                  ></textarea>
                </div>
              )
            })
          }
          </div>
        </form>
      </div>
      <div className="pages" >
        <div className='left_buttons'>
            <h2 id='addingButton' onClick={()=>setAddShow(!addShow)}>Add new row</h2>
            <h2 id='addingButton' onClick={()=>DownloadNewCsv()}>Download</h2>
        </div>
         <Pagination dataLength={data.length} currentPage={currentPage} setCurrentPage={setCurrentPage} rowsPerPage={rowsPerPage}/>
      </div>
    </div>
  );
};
export default App;