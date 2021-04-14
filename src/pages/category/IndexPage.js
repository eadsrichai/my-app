import React from "react";
import axios from "axios";
import { Button, Spinner,  Table } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { BsPencil, BsTrash} from 'react-icons/bs'

const IndexPage = () => {
  const [category, setCategory] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const cancelToken = React.useRef(null);

  const history = useHistory()

  const getData = async () => {
    try {
      setLoading(true);

      const rasp = await axios.get(
        `https://api.codingthailand.com/api/category`,
        { cancelToken: cancelToken.current.token }
      );

     // console.log(rasp.data.data);
      setCategory(rasp.data)
      //setTotal(rasp.data.meta.pagination.total)

    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    cancelToken.current = axios.CancelToken.source();

    getData();
    return () => {
      console.log("Exit product map");
      cancelToken.current.cancel();
    };
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
        <p>{JSON.stringify(error)}</p>
      </div>
    );
  }

  return (
    <div className="container">
        <div className="row mt-4">
          <div className="col-md-12">
        <Button className="mb-3" variant="success" onClick={() => history.push('/category/create')}
            >เพิ่มข้อมูล</Button>

      <h1>หมวดหมู่ข่าว</h1>
      <Table  striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>หมวดหมู่ข่าว</th>
            <th>เครื่องมือ</th>
          </tr>
        </thead>
        <tbody>
          {category.map((c, index) => {
            return (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>


                <Button className="ml-2" variant="outline-info" size='sm'
                    onClick={() => history.push('/category/edit/'+ c.id)}
                    
                >
                    <BsPencil/>
                </Button>



                <Button className="ml-2" variant="outline-denger" size='sm'
                    onClick={ async () => {
                        const isConfirm = window.confirm('Confirm delete data'+ c.name + '?')
                        if (isConfirm === true){
                            const resp = await axios.delete('https://api.codingthailand.com/api/category/'+ c.id)
                            alert(resp.data.message)
                            history.go(0)

                        }
                    }}
                >
                    <BsTrash/>
                </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
    </div>
    </div>
  );
};

export default IndexPage;
