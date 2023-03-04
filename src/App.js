import React, { useEffect, useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://iata-and-icao-codes.p.rapidapi.com/airlines?api_key=e19036bdddmshec8b9d620c9b4b6p1dfc44jsn5e42aada67de", {
          "method": "GET",
          "headers": {
            "X-RapidAPI-Key": "e19036bdddmshec8b9d620c9b4b6p1dfc44jsn5e42aada67de",
            "X-RapidAPI-Host": "iata-and-icao-codes.p.rapidapi.com",
            "RapidAPI-Project": "5cf1da516aca1a303720e78e"
          }
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageCount = Math.ceil(data.length / pageSize);
  const pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = data.slice(startIndex, endIndex);

  return (
    <div>
      <nav></nav>
      <table className='centered'>
        <thead>
          <tr>
            <th>Airline Code</th>
            <th>Airline Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map(item => (
            <tr key={item.iata_code}>
              <td>{item.iata_code}</td>
              <td>{item.name}</td>
              <td>{item.icao_code}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="pagination">
        {pages.map(page => (
          <li key={page} className={page === currentPage ? 'active' : ''}>
            <a href="#!" onClick={() => handlePageChange(page)}>{page}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
