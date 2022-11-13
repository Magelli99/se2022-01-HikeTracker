import 'leaflet/dist/leaflet.css';
import { useContext, useEffect, useState } from "react";
import {Container,Form, Button, Alert,} from "react-bootstrap";
import { useParams } from "react-router-dom";
import AuthContext from "../AuthContext";
import API from '../API';

function HikeDescription()
{
   const  params=useParams();
   const hikeId=params.hikeId;
    const handleSubmit = (e) => {
        //Inserire API, in input alla API idHike , inserisce nel db la description. 
        //per ora inserirei solo la descrizione testuale, dopo pensiamo a come e se salvare il file
        console.log(hikeId);
      }
    const [description,setDescription]=useState("");
    const [file,setFile]=useState();
    return (
        <Container>
             <Form.Group className="mb-3">
        <Form.Label>Insert description</Form.Label>
        <Form.Control type="text" placeholder="Hike description" onChange={(e) => setDescription(e.target.value)} value={description}/>
      </Form.Group>
        <Form onSubmit={handleSubmit}>
         <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Insert the file</Form.Label>
        <Form.Control type="file"  onChange={(e) => setFile(e.target.value)} />
      </Form.Group>
     
          <div className="d-grid"><Button type="submit" className="btn btn-success">Inserisci</Button></div>
        </Form>
        </Container>
      )
    };

export {HikeDescription}
