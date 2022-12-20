import { Link } from "react-router-dom";

export default function ({ photo }) {
  return (
    <div className="img-preview" style={{ marginBottom: "30px" }}>
      <Link to={"/photos/" + photo.id}>
        <img src={photo.url} />
      </Link>
    </div>
  );
}
