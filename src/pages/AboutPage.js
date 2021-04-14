import React from "react";
import axios from "axios";

function AboutPage() {
  const [version, setVersion] = React.useState("");
  const getData = async () => {
    const resp = await axios.get("https://api.codingthailand.com/api/version");
    console.log(resp.data.data.version);
    setVersion(resp.data.data.version);
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>เกี่ยวกับเรา</h1>
          {version && <p>Backend API Version : {version}</p>}
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
