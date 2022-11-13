import AuthContext from '../AuthContext';
import { Col, Container, Row } from 'react-bootstrap';
import { useContext, useState, useEffect } from "react";
import HikeList from './HikeList';
import API from '../API';
import Sidebar from './Sidebar';


function MainLayout(props) {

  const [hikes, setHikes] = useState([]); //empty array of hikes
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const reloadHikes = async () => {
      const hikes_array = await API.getHikes();
      setHikes(hikes_array);
      setLoading(false);
    }
    try {
      reloadHikes();
    } catch (err) {
      // handling error
    }
  }, []);

  return (
    <>
      <Container fluid className={'vh-100'}>
        <p></p>
        {!loading &&
          <Row>
            <Col sm={9}>
              <HikeList hikes={hikes} />
            </Col>
            <Col sm={3}>
              <Sidebar setHikes={setHikes} />
            </Col>
          </Row>
        }
      </Container>
    </>
  );
}

export default MainLayout;