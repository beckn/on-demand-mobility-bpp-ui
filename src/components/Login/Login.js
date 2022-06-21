import React from "react";
// import PropTypes from "prop-types";
// import styles from "./Login.scss";
import { toast } from "react-toastify";
import { Col, Container, Row } from "react-bootstrap";
import { spinnerService } from "@simply007org/react-spinners";

const getToaster = () => {
  toast.info("asdfasdf");
  spinnerService.show('mySpinner')
};

const Login = (props) => (
  <section className="border">
    <Container>
      <Row>
        <Col xxl="5" className="d-flex align-items-center">
          Login Page HTMLs come here
          <button className="btn btn-primary m-lg-3" onClick={getToaster}>
            toast Example
          </button>
        </Col>
      </Row>
    </Container>
  </section>
);

// todo: Unless you need to use lifecycle methods or local state,
// write your component in functional form as above and delete
// this section.
// class Landing extends React.Component {
//   render() {
//     return <div>This is a component called Landing.</div>;
//   }
// }

// const LandingPropTypes = {
//   // always use prop types!
// };

// Login.propTypes = LandingPropTypes;

export default Login;
