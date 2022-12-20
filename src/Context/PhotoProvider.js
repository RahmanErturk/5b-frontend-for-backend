import React from "react";
import { createContext, useState, useEffect } from "react";

import { Popover } from "react-bootstrap";

export const photoAppContext = createContext();

export default function PhotoProvider({ children }) {
  const [photos, setPhotos] = useState([]);
  const [album, setAlbum] = useState({});
  const [albumPhotos, setAlbumPhotos] = useState([]);
  const [allAlbums, setAllAlbums] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4001/albums`)
      .then((response) => response.json())
      .then((data) => setAllAlbums(data));
  }, []);

  const getAllPhotos = () => {
    // fetch("/api/photos") und beim package.json => proxy: "http://http://localhost:4001, am Ende npm run build "
    fetch("http://localhost:4001/photos")
      .then((res) => res.json())
      .then((data) => setPhotos(data));
  };

  useEffect(getAllPhotos, []);

  const getAlbumPhotos = () => {
    fetch(`http://localhost:4001/photos`)
      .then((response) => response.json())
      .then((data) => {
        setAlbumPhotos(
          data.filter((d) =>
            album.photos
              ? album.photos.includes(d.id)
              : console.log("album.photos can not find")
          )
        );
      });
  };

  const removePhoto = (id, getData) => {
    fetch(`http://localhost:4001/photos/${id}`, {
      method: "DELETE",
    }).then((res) =>
      res.status === 202 ? getData() : console.error(res.status)
    );
  };

  const addToAlbum = (id, idOfPhoto) => {
    const index = allAlbums.findIndex((a) => a.id === id);
    console.log(index);

    if (allAlbums[index].photos.includes(+idOfPhoto))
      return alert(`${allAlbums[index].name} already has the picture.`);

    fetch(`http://localhost:4001/albums/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        photos: [...allAlbums[index].photos, +idOfPhoto],
      }),
    }).then((res) =>
      res.status === 202 ? location.reload() : console.error(res.status)
    );
  };

  const popover = (idOfPhoto) => {
    return (
      <Popover id="popover-basic">
        <Popover.Header as="h3">Albums</Popover.Header>
        <Popover.Body>
          {allAlbums.map((alb, i) => {
            return (
              <p
                className="popover-item"
                key={i}
                onClick={() => addToAlbum(alb.id, idOfPhoto)}
              >
                {alb.name}
              </p>
            );
          })}
        </Popover.Body>
      </Popover>
    );
  };

  return (
    <photoAppContext.Provider
      value={{
        getAllPhotos,
        getAlbumPhotos,
        photos,
        setPhotos,
        removePhoto,
        album,
        setAlbum,
        albumPhotos,
        setAlbumPhotos,
        allAlbums,
        popover,
      }}
    >
      {children}
    </photoAppContext.Provider>
  );
}
