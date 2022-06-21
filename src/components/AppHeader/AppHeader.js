import { Col, Container, Row } from "react-bootstrap";

const appHeader = (props) => (
  <header className="border">
    <Container>
      <Row>
        <Col>This is a component called appHeader.</Col>
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
