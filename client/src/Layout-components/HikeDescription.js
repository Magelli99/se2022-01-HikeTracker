import 'leaflet/dist/leaflet.css';
import { useContext, useEffect, useState } from "react";
import {Container} from "react-bootstrap";
import { useParams } from "react-router-dom";
import AuthContext from "../AuthContext";
import API from '../API';

function HikeDescriptions(props)
{
    const [description,setDescription]=useState("");
    return (
        <Container>
        <Form onSubmit={handleSubmit}>
         <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Insert description</Form.Label>
        <Form.Control type="text" placeholder="Hike description" onChange={(e) => setDescription(e.target.value)} value={description}/>
      </Form.Group>
          <div className="d-grid"><Button type="submit" className="btn btn-success">Inserisci</Button></div>
        </Form>
        </Container>
      )
    };

export {HikeDescriptions}
