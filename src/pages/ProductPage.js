import React from "react";
import { Table, Image, Badge, Spinner } from "react-bootstrap";
import axios from "axios";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { BsEyeFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

//redux
import {addToCart} from '../redux/actions/cartAction'
import {useDispatch, useSelector} from 'react-redux'

const ProductPage = () => {
  const [product, setProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const cancelToken = React.useRef(null);

  //redux
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cartReducer.cart)
  const total = useSelector(state => state.cartReducer.total)

  console.log(total)
  console.log(cart)

  const getData = async () => {
    try {
      setLoading(true);

      const rasp = await axios.get("https://api.codingthailand.com/api/course",
      { cancelToken: cancelToken.current.token });

      //console.log(rasp.data.data);
      setProduct(rasp.data.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    cancelToken.current = axios.CancelToken.source()

    getData();
    return () => {
      console.log("Exit product map");
      cancelToken.current.cancel()
    }
  }, []);

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
  const addCart = (p) => {
    //console.log(p)
    const product = {
      id: p.id,
      name: p.title,
      price: p.view,  //สมมุติขึ้นมา
      qty: 1
    }
    //call action
    dispatch(addToCart(product, cart))
  }
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>สินค้า</h1>
            {
              total > 0 && <h4> ซื้อแล้ว {total} ชิ้น</h4>
            }
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>id</th>
                  <th>ชื่อคอร์ด</th>
                  <th>รายละเอียด</th>
                  <th>วันที่สร้าง</th>
                  <th>วิว</th>
                  <th>รูปภาพ</th>
                  <th>เครื่องมือ</th>
                </tr>
              </thead>
              <tbody>
                {product.map((p, index) => {
                  return (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.title}</td>
                      <td>{p.detail}</td>
                      <td>
                        {format(new Date(p.date), "dd MMM yyy", { local: th })}
                      </td>
                      <td>{<Badge variant="success">{p.view}</Badge>}</td>
                      <td>
                        {
                          <Image
                            src={p.picture}
                            thumbnail
                            alt={p.title}
                            width={100}
                          />
                        }
                      </td>
                      <td>
                          <Link to={`/Detail/${p.id}/title/${p.title}`}>
                            <BsEyeFill/>
                           </Link>
                      </td>
                      <td>
                        <button onClick={() => addCart(p)}
                          className="btn btn-outline-success ml-2">
                          หยิบใส่ตะกร้า
                        </button>
                       
                      </td>
                       <td>
                        
                       
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
