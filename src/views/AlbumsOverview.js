import { useContext } from "react";
import { photoAppContext } from "../Context/PhotoProvider";
import { Container, Row, Col } from "react-bootstrap";
import AlbumIcon from "../compontents/AlbumIcon";

export default function () {
  const { allAlbums } = useContext(photoAppContext);

  return (
    <Container>
      <Row>
        {allAlbums.map((a, i) => (
          <Col key={i}>
            <AlbumIcon album={a} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
