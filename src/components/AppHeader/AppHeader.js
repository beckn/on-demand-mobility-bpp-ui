import { Col, Container, Row } from "react-bootstrap";
import { AppRoutes } from "../../core/constant";
import "./AppHeader.scss";
const logout = () => {
  sessionStorage.clear();
  window.location.href = AppRoutes.admin;
};
const appHeader = (props) => (
  <header className="bg-dark header-round">
    <Container fluid>
      <Row>
        <Col className="position-relative">
          <div className="round-1"></div>
          <h2 className="text-white ps-lg-5 py-lg-2">Taxi Admin</h2>
        </Col>
        <Col className="d-flex align-items-center justify-content-end">
          <button className="btn btn-primary" onClick={() => logout()}>
            Logout
          </button>
        </Col>
      </Row>
    </Container>
  </header>
);

// todo: Unless you need to use lifecycle methods or local state,
// write your component in functional form as above and delete
// this section.
// class appHeader extends React.Component {
//   render() {
//     return <div>This is a component called appHeader.</div>;
//   }
// }

const appHeaderPropTypes = {
  // always use prop types!
};

appHeader.propTypes = appHeaderPropTypes;

export default appHeader;
