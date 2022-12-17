import { Link } from "react-router-dom";

import { useContext } from "react";
import { photoAppContext } from "../Context/PhotoProvider";

export default function ({ photo }) {
  return (
    <div className="img-preview" style={{ marginBottom: "50px" }}>
      <Link to={"/photos/" + photo.id}>
        <img src={photo.url} />
      </Link>
    </div>
  );
}
