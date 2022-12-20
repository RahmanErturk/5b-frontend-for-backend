import { useContext } from "react";

import { Container, Row, Col, Button, OverlayTrigger } from "react-bootstrap";
import PhotoPreview from "../compontents/PhotoPreview";

import { photoAppContext } from "../Context/PhotoProvider";

export default function () {
  const { getAllPhotos, photos, removePhoto, popover } =
    useContext(photoAppContext);

  return (
    <Container>
      <h2 className="album-title">Alle Fotos</h2>
      <Row>
        {photos.map((p) => (
          <Col key={p.id}>
            <PhotoPreview className="photos" photo={p} />
            <Button
              className="mb-4"
              onClick={() => removePhoto(p.id, getAllPhotos)}
            >
              Remove
            </Button>
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={popover(p.id)}
            >
              <Button className="mb-4 mx-3" variant="success">
                Add to Album
              </Button>
            </OverlayTrigger>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
