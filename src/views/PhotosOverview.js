import { useEffect, useContext } from "react";

import { Container, Row, Col, Button } from "react-bootstrap";
import PhotoPreview from "../compontents/PhotoPreview";

import { photoAppContext } from "../Context/PhotoProvider";

export default function () {
  const { getAllPhotos, photos, removePhoto } = useContext(photoAppContext);

  useEffect(getAllPhotos, []);

  return (
    <Container>
      <h2 className="album-title">Alle Fotos</h2>
      <Row>
        {photos.map((p, i) => (
          <Col key={i}>
            <PhotoPreview photo={p} />
            <Button
              className="mt-1 mb-4"
              style={{ display: "block" }}
              onClick={() => removePhoto(p.id, getAllPhotos)}
            >
              Remove
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
