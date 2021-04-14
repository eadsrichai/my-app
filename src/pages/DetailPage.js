import React from "react";
import { Button, Spinner, CardDeck, Card } from "react-bootstrap";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const DetailPage = () => {
  const { id, title } = useParams()
  
  const history = useHistory();

  const [detail, setDetail] = React.useState([]);

  const [loading, setLoading] = React.useState(false);

  const [error, setError] = React.useState(null);

  const cancelToken = React.useRef(null);

  const getData = async (id) => {
    try {
      setLoading(true);

      const rasp = await axios.get(
        "https://api.codingthailand.com/api/course/"+id,
        { cancelToken: cancelToken.current.token }
      );

      console.log(rasp.data.data);
      setDetail(rasp.data.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    cancelToken.current = axios.CancelToken.source();

    getData(id);
    return () => {
      console.log("Exit product map");
      cancelToken.current.cancel();
    };
  }, [id]);

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
    <div>
      <h1>{id}</h1>
      <div className="container">
        <div>
          <Button variant = "secondary" onClick={() => {
            history.goBack()
          }}>ย้อนกลับ</Button>
        </div>
        <div className="row">
        
          {
            detail.length > 0 ? (
              <CardDeck>
                {
                  detail.map((d, index) => {
                    return <div className="col-md-4" key={d.ch_id}>
                      <Card className="mb-4 shadow-sm">
                        <Card.Body>
                          <Card.Title>{d.ch_title}</Card.Title>
                          <Card.Text>{d.ch_dateadd}</Card.Text>
                        </Card.Body>
                      </Card>
                    </div>;
                  })
                }
              </CardDeck>

            ) : (
              <div className="mx-auto">NOOOOO</div>
            )

          }
        </div>
      </div>
    </div>
  );
};

export default DetailPage
