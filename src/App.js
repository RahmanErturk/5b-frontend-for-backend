import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./compontents/Navbar";
import Main from "./views/Main";
import Photo from "./views/Photo";
import Album from "./views/Album";
import AlbumsOverview from "./views/AlbumsOverview";
import PhotosOverview from "./views/PhotosOverview";
import PhotoProvider from "./Context/PhotoProvider";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <PhotoProvider>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/photos/:photoId" element={<Photo />} />
            <Route path="/photos" element={<PhotosOverview />} />
            <Route path="/albums/:albumId" element={<Album />} />
            <Route path="/albums/" element={<AlbumsOverview />} />
          </Routes>
        </PhotoProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
