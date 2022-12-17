import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import PhotoPreview from "../compontents/PhotoPreview";

import { photoAppContext } from "../Context/PhotoProvider";

export default function () {
  const { albumId } = useParams();
  const { removePhoto, getAlbumPhotos, album, setAlbum, albumPhotos } =
    useContext(photoAppContext);

  useEffect(() => {
    fetch(`http://localhost:4001/albums/${albumId}`)
      .then((res) => res.json())
      .then((data) => setAlbum(data));
  }, [albumId]);

  useEffect(getAlbumPhotos, [album]);

  return (
    <Container>
      <h2 className="album-title">{album.name}</h2>
      <Row>
        {albumPhotos.map((p, i) => (
          <Col key={i}>
            <PhotoPreview photo={p} />
            <Button
              className="mt-1 mb-4"
              style={{ display: "block" }}
              onClick={() => removePhoto(p.id, getAlbumPhotos)}
            >
              Remove
            </Button>
          </Col>
        ))}
        {/* <PhotoPreview photo={{id:1}} /> */}
      </Row>
    </Container>
  );
}
