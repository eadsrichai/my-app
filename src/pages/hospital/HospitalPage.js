import React from "react";
import Pagination from "react-js-pagination";
import axios from "axios";
import { Button, Spinner, CardDeck, Table } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";

const HospitalPage = () => {
  const [hospital, setHospital] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const cancelToken = React.useRef(null);

  //pagination
    const [page, setPage] = React.useState(1)
    const pageSize = 5;
    const [total, setTotal] = React.useState(0)
    const handlePageChange = (pageNumber) =>{
        setPage(pageNumber)
    }


  const getData = async (page) => {
    try {
      setLoading(true);

      const rasp = await axios.get(
        `https://api.codingthailand.com/api/hospital2?page=${page}&page_size=${pageSize}`,
        { cancelToken: cancelToken.current.token }
      );

     // console.log(rasp.data.data);
      setHospital(rasp.data.data)
      setTotal(rasp.data.meta.pagination.total)

    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    cancelToken.current = axios.CancelToken.source();

    getData(page);
    return () => {
      console.log("Exit product map");
      cancelToken.current.cancel();
    };
  }, [page]);

  if (loading === true) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center text-danger fs-1 mt-5">
        <p>เกิดข้อผิดพลาด </p>
        <p>{error.response.data.message}</p>
      </div>
    );
  }

  return (
    <div className="fs-2">
      <h1>สถานพยาบาล</h1>
      <Table  striped bordered hover size="sm">
        <thead>
          <tr>
            <th>id</th>
            <th>code</th>
            <th>สถานพยาบาล</th>
          </tr>
        </thead>
        <tbody>
          {hospital.map((h, index) => {
            return (
              <tr key={h.id}>
                <td>{h.id}</td>
                <td>{h.code}</td>
                <td>{h.h_name}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination
          activePage={page}
          itemsCountPerPage={pageSize}
          totalItemsCount={total}
          pageRangeDisplayed={15}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
          prevPageText="ก่อนหน้า"
          nextPageText="ต่อไป"
          firstPageText="หน้าแรก"
          lastPageText="หน้าสุดท้าย"
        />
    </div>
  );
};

export default HospitalPage;
