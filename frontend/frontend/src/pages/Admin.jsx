import { useState } from "react";
import axios from "axios";

function Admin() {

  const [movie, setMovie] = useState({
    title: "",
    genre: "",
    thumbnail: "",
  });

  const [videoFile, setVideoFile] = useState(null);

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {

    try {

      console.log(videoFile);

      const formData = new FormData();

      formData.append("title", movie.title);
      formData.append("genre", movie.genre);
      formData.append("thumbnail", movie.thumbnail);
      formData.append("video", videoFile);

      const response = await axios.post(
        "http://localhost:5000/api/movies",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      alert("Movie Uploaded");

    } catch (error) {

      console.log(error);
      console.log(error.response);

      alert("Upload Failed");
    }
  };

  return (
    <div className="bg-black min-h-screen flex justify-center items-center">

      <div className="bg-zinc-900 p-10 rounded-2xl w-[500px]">

        <h1 className="text-4xl font-bold text-purple-500 mb-8 text-center">
          Admin Upload
        </h1>

        <div className="flex flex-col gap-5">

          <input
            type="text"
            name="title"
            value={movie.title}
            onChange={handleChange}
            placeholder="Movie Title"
            className="p-4 rounded-lg bg-black text-white outline-none"
          />

          <input
            type="text"
            name="genre"
            value={movie.genre}
            onChange={handleChange}
            placeholder="Genre"
            className="p-4 rounded-lg bg-black text-white outline-none"
          />

          <input
            type="text"
            name="thumbnail"
            value={movie.thumbnail}
            onChange={handleChange}
            placeholder="Thumbnail URL"
            className="p-4 rounded-lg bg-black text-white outline-none"
          />

          <input
            type="file"
            accept="video/mp4"
            onChange={(e) => {
              console.log(e.target.files[0]);
              setVideoFile(e.target.files[0]);
            }}
            className="p-4 rounded-lg bg-black text-white"
          />

          <button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700 p-4 rounded-lg text-white font-bold"
          >
            Upload Movie
          </button>

        </div>

      </div>

    </div>
  );
}

export default Admin;