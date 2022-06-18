import React from "react";
import PropTypes from "prop-types";
// import styles from "./Login.scss";
import { Col, Container, Row } from "react-bootstrap";

const Login = (props) => (
  <>
    <Container>
      <Row>
        <Col xxl="5" className="d-flex align-items-center">
          Login Page HTMLS come here
        </Col>
      </Row>
    </Container>
  </>
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
