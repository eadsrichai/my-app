import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import {Spinner} from 'react-bootstrap'
import ProductPage from "./ProductPage";
import { useSelector} from 'react-redux'

const HomePage = () => {
  // const { isLoading, error, data,isFetching } = useQuery("getData", () =>
  //   fetch(
  //     "https://api.codingthailand.com/api/news?page=1&per_page=3"
  //   ).then((res) => res.json())
  // );
  const profileRedux = useSelector((state) => state.authReducer.profile)

  const query = useQuery("getData", () =>{
    const controller = new AbortController()
    const signal = controller.signal
    const promise = fetch(
      "https://api.codingthailand.com/api/news?page=1&per_page=3",{
        method: 'get',
        signal: signal
      }
    ).then((res) => res.json())

    //cancel request
    promise.cancel = () => controller.abort()

    return promise
  })
const { isLoading, error, data,isFetching } = query

  if (isLoading === true) {
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
    <div className="container">
      <main role="main">
        <div className="jumbotron">
          <h1 className="display-3">ยินดีต้อนรับทุกคน</h1>
            <p>
              
            </p>
            <p>
              <Link to='/product' role="button" className='btn btn-primary' >
                สินค้า
              </Link>
            </p>
         </div>

       <div className="row mx-auto">
         <div className="text-center">
          {isFetching ? 'กำลัง update....' : null}
         </div>
         {data.data.map((news, index) => {
           return (
            <div className="col-md-4" key={news.id}>
              <h2>{news.topic}</h2>
              <p>
                {news.detail}
              </p>
              <p>
                หมวดหมู่ {news.name}
              </p>
              </div>
           )
         }
         )}
         
       </div>
     
    </main>
    </div>
  );
};

export default HomePage;
