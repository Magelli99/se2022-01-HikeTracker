import 'bootstrap/dist/css/bootstrap.min.css';
import '../Login.css'
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginComponent(props) {

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
          <>
            <Row>
              <Col></Col>
              <Col xs={10}><h2>Login</h2></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col></Col>
              <Col xs={10}><LoginForm login={props.login} /></Col>
              <Col></Col>
            </Row>
          </>
      </div>
    </div>
  );
}

function LoginForm(props) {
  const [email, setEmail] = useState('b@polito.it');
  const [password, setPassword] = useState('password');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const credentials = { email: email, password };
    await props.login(credentials);
    navigate('/');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='email' className="mb-3">
        <Form.Label className='label'>Email</Form.Label>
        <Form.Control className="form-control" type='email' value={email} onChange={ev => setEmail(ev.target.value)} required={true} />
      </Form.Group>

      <Form.Group controlId='password' className="mb-3">
        <Form.Label className='label'>Password</Form.Label>
        <Form.Control className="form-control" type='password' value={password} onChange={ev => setPassword(ev.target.value)} required={true} minLength={4} />
      </Form.Group>

      <div className="d-grid"><Button type="submit" variant='success'>Login</Button></div>
    </Form>
  )
};

export { LoginForm, LoginComponent };
