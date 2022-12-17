import React from "react";
import { createContext, useState } from "react";

export const photoAppContext = createContext();

export default function PhotoProvider({ children }) {
  const [photos, setPhotos] = useState([]);
  const [album, setAlbum] = useState({});
  const [albumPhotos, setAlbumPhotos] = useState([]);

  const getAllPhotos = () => {
    // fetch("/api/photos") und beim package.json => proxy: "http://http://localhost:4001, am Ende npm run build "
    fetch("http://localhost:4001/photos")
      .then((res) => res.json())
      .then((data) => setPhotos(data));
  };

  const getAlbumPhotos = () => {
    fetch(`http://localhost:4001/photos`)
      .then((response) => response.json())
      .then((data) =>
        setAlbumPhotos(data.filter((d) => album.photos.includes(d.id)))
      );
  };

  const removePhoto = (id, getData) => {
    fetch(`http://localhost:4001/photos/${id}`, {
      method: "DELETE",
    }).then((res) =>
      res.status === 202 ? getData() : console.error(res.status)
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
      }}
    >
      {children}
    </photoAppContext.Provider>
  );
}
