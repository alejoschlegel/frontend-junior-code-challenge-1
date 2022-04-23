import { useState } from "react";
const Pagination = ({
    dataLength,
    currentPage,
    setCurrentPage,
    rowsPerPage,
}) => {
    const [maxPages, setMaxPages] = useState(5);
    const [minPages, setMinPages] = useState(0);

    const handleNextPage = () => {
        if(currentPage < dataLength/rowsPerPage ) {
          setCurrentPage(currentPage + 1);
        }
        if(currentPage + 1 > maxPages && maxPages < dataLength/rowsPerPage) {
          setMaxPages(maxPages + 5);
          setMinPages(minPages + 5);
        }
      };
      const handlePreviousPage = () => {
        if(currentPage > 1){
          setCurrentPage(currentPage - 1);
        }
        if(currentPage - 1 <= minPages && currentPage > 1) {
          setMaxPages(maxPages - 5);
          setMinPages(minPages - 5);
        }
      };
      const pages = [];
      for (let i = 1; i <= Math.ceil(dataLength / rowsPerPage); i++) {
        pages.push(i);
      }
      const renderPageNumbers = () => {
        return pages.map((index) => {
          if (index < maxPages + 1 && index > minPages) {
            return (
              <li className={'pageLi'+(currentPage=== index  ? " pageCurrentLi" : "")} key={index} onClick={() => setCurrentPage(index)}>
              {index}
              </li>
            );
          } else {
            return null;
          }
        });
      };
  return (
    <ul id='pagesUl'>
    <label className='prev' onClick={() => handlePreviousPage()}> Prev </label>
      {renderPageNumbers()}
    <label className='next' onClick={() => handleNextPage()}> Next </label>
    </ul>
  );
};

export default Pagination;