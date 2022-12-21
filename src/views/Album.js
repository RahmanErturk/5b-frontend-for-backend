import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import AlbumPhotoPreview from "../compontents/AlbumPhotoPreview";

import { photoAppContext } from "../Context/PhotoProvider";

import LikeBtn from "@mui/icons-material/FavoriteBorder";
import FilledLikeBtn from "@mui/icons-material/Favorite";

export default function () {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const { getAlbumPhotos, album, setAlbum, albumPhotos } =
    useContext(photoAppContext);

  useEffect(() => {
    fetch(`http://localhost:4001/albums/${albumId}`)
      .then((res) => res.json())
      .then((data) => setAlbum(data));
  }, [albumId]);

  useEffect(getAlbumPhotos, [album]);

  const removeFromAlbum = (id) => {
    const index = album.photos.findIndex((a) => a === id);

    const updatedAlbumPhotos = album.photos.splice(index, 1);

    fetch(`http://localhost:4001/albums/${album.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        photos: [...album.photos],
      }),
    }).then((res) =>
      res.status === 202 ? getAlbumPhotos() : console.error(res.status)
    );
  };
  console.log(albumPhotos);

  const mappedAlbumPhotos = albumPhotos.map((p, i) => (
    <Col key={i} className="mb-5">
      <AlbumPhotoPreview albumId={album.id} photo={p} />
      <Button className="mt-1" onClick={() => removeFromAlbum(p.id)}>
        Remove from {album.name}
      </Button>
      {p.isLiked ? (
        <FilledLikeBtn
          className="mx-5 like-btn"
          onClick={() => likePhoto(+photoId)}
        />
      ) : (
        <LikeBtn className="mx-5" onClick={() => likePhoto(+photoId)} />
      )}
    </Col>
  ));

  console.log(album);
  return (
    <Container>
      <h2 className="album-title">{album.name}</h2>
      <Row>
        {album.photos.length === 0 ? (
          <div>
            <h5 className="mt-5">
              There isn't any photo in this album. Do you want to add some
              photos? :)
            </h5>
            <Button className="mt-2" onClick={() => navigate("/photos")}>
              Add Photos
            </Button>
          </div>
        ) : (
          mappedAlbumPhotos
        )}

        {/* <PhotoPreview photo={{id:1}} /> */}
      </Row>
    </Container>
  );
}
