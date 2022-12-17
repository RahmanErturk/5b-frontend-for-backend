import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { photoAppContext } from "../Context/PhotoProvider";

import { Container, Button } from "react-bootstrap";

export default function () {
  const { photoId } = useParams();
  const navigate = useNavigate();

  const { getAllPhotos } = useContext(photoAppContext);

  const [photo, setPhoto] = useState({});

  /**
   * Um unsere React App (View) mit unserem Backend (Controller und "Model") zu verbinden,
   * machen wir lediglich ein fetch an unseren localhost. Da fetch das Wort "localhost" mag,
   * benutzen wir die dazugehörige IP Adresse.
   *
   * Frontend und Backend befinden sich im selben Hafen (localhost) und haben zwei
   * Stegnummern (3000 und 4000) über die sie erreichbar sind.
   *
   * In einem real world example wäre das optimale Setup, dass sich unser FE und das BE in
   * zwei Docker Container befinden und über festgelegte Wege miteinander kommunizieren.
   * Leider sprengt Docker den Rahmen von diese, Kurs. Ich kann euch aber empfehlen, euch das
   * selbstständig anzuschauen.
   *
   * Den fetch machen wir in Abhängigkeit von unserem Parameter, heißt immer wenn sich der
   * Parameter ändert rufen wir neu die Daten ab
   */

  useEffect(() => {
    fetch(`http://localhost:4001/photos/${photoId}`)
      .then((response) => response.json())
      .then((data) => setPhoto(data));
  }, [photoId]);

  const removePhoto = () => {
    fetch(`http://localhost:4001/photos/${photoId}`, {
      method: "DELETE",
    }).then((res) => {
      res.status === 202 ? getAllPhotos() : console.error(res.status);

      navigate("/photos");
    });
  };

  return (
    <Container>
      <img src={photo.url} />
      <Button onClick={removePhoto}>Remove</Button>
    </Container>
  );
}
