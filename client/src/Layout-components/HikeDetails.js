import 'leaflet/dist/leaflet.css';
import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../AuthContext";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet';
import API from '../API';

function HikeDetails(props) {
  const auth = useContext(AuthContext);

  const params = useParams();
  const [hike, setHike] = useState(undefined
    /*{
      Ascent: 2,
      City: "City1",
      Description: "a simple test description added with API and after modified",
      Difficulty: "T",
      ExpectedTime: 33,
      HikeId: "1",
      Length: 1.1,
      Province: "Province1",
      ReferencePoints: undefined,
      Title: "Hike1",
      end: "end1",
      start: "start1",
    }*/
  );
  const [gpxData, setGpxData] = useState(undefined);  // array of [p.lat, p.lon]
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadHike = async () => {    // NEED API TO GET HIKE GIVEN ID, NEED API TO GET PARSED GPX DATA
      const hikeObj = await API.getHike(params.hikeID);
      setHike(hikeObj);
      if (auth.login) {
        const gpxObj = await API.getPointsHike(params.hikeID);
        setGpxData(gpxObj);
        console.log(gpxObj);
      }
      setLoading(false);

    }
    try {
      loadHike();
    } catch (err) {
      //handling error
    }
  }, [params.hikeID, auth.login])

  return (
    <>
      {!loading &&
        <Container fluid className={'vh-100'}>
          <Row>
            <Col>Title: {hike.Title}</Col>
            <Col>Length: {hike.Length} km</Col>
            <Col>Expected Time: {hike.ExpectedTime} mm</Col>
            <Col>Ascent: {hike.Ascent} m</Col>
            <Col>Difficulty: {hike.Difficulty}</Col>
          </Row>
          <Row>
            <Col>City: {hike.City}</Col>
            <Col>Province: {hike.Province}</Col>
            <Col>Start: {hike.start}</Col>
            <Col>End: {hike.end}</Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>Description: {hike.Description}</Col>
            {auth.user.role === 'l' &&
              <Col>
                <Button /*onClick={() => navigate()}*/>Modify</Button>
              </Col>
            }
          </Row>
          <p></p>
          <hr />
          <p></p>
          {auth.login &&
            <Row>
              <Col xs={1}></Col>
              <Col>

                <MapContainer center={[45.936, 7.626]} zoom={20} scrollWheelZoom={false} style={{ height: '90vh', width: '90wh' }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Polyline
                    pathOptions={{ fillColor: 'red', color: 'blue' }}
                    positions={gpxData}
                  />
                </MapContainer>

              </Col>
              <Col xs={1}></Col>

            </Row>
          }
          {!auth.login &&
            <Row>
              <Col>You should be logged to see the map</Col>
            </Row>}


        </Container>
      }
    </>
  );
}

export default HikeDetails;