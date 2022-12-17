import { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import AlbumIcon from "../compontents/AlbumIcon";

export default function () {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4001/albums`)
      .then((response) => response.json())
      .then((data) => setAlbums(data));
  }, []);

  return (
    <Container>
      <Row>
        {albums.map((a, i) => (
          <Col key={i}>
            <AlbumIcon album={a} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
