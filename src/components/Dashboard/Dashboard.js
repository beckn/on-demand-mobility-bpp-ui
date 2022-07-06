import { useEffect } from "react";
// import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";
import "./Dashboard.scss";

export const Dashboard = () => {
  useEffect(() => {
    init();
  }, []);

  const init = () => {
    document.title = `taxi BPP DashBoard`;
  };

  return (
    <section>
      <Container fluid className="vh-100">
        <Row className="vh-100">
          <Col xxl="2" className="position-relative bg-dark left-section rounded-0">
            <div className="round-1"></div>
            <div className="round-2"></div>
          </Col>
          <Col xxl="9" className="d-flex align-items-center">
            dashboard will come here!
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Dashboard;
