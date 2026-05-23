import { useLocation, useNavigate } from "react-router-dom";

function Watch() {

  const location = useLocation();
  const navigate = useNavigate();

  const movie = location.state;

  if (!movie) {
    return (
      <div className="bg-black min-h-screen text-white flex justify-center items-center flex-col gap-5">

        <h1 className="text-4xl font-bold">
          Movie Not Found
        </h1>

        <button
          onClick={() => navigate("/home")}
          className="bg-purple-600 px-6 py-3 rounded-xl"
        >
          Go Back
        </button>

      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white p-10">

      <h1 className="text-5xl font-bold text-purple-500 mb-8">
        {movie.title}
      </h1>

      <video
        controls
        autoPlay
        className="w-full rounded-2xl"
      >
        <source
          src={`http://localhost:5000/uploads/${movie.video}`}
          type="video/mp4"
        />
      </video>

      <p className="text-zinc-400 mt-6 text-xl">
        Genre: {movie.genre}
      </p>

    </div>
  );
}

export default Watch;