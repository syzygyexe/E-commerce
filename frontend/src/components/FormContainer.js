import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Container>
      {/* Medium screens center */}
      <Row className='justify-content-md-center'>
        {/* Extra small 12 columns, medium 6 columns */}
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
