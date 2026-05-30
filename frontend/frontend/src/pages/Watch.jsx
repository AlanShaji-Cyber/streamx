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
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl"
        >
          Go Back
        </button>

      </div>

    );
  }

  return (

    <div className="bg-black min-h-screen text-white">

      <div className="p-4 md:p-8">

        {/* BACK BUTTON */}

        <button
          onClick={() => navigate("/home")}
          className="mb-6 bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-xl duration-300 font-semibold"
        >
          ← Back
        </button>

        <div className="max-w-[1700px] mx-auto">

          {/* MOVIE TITLE */}

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
            {movie.title}
          </h1>

          {/* VIDEO PLAYER */}

          <div className="w-full rounded-3xl overflow-hidden shadow-2xl bg-black">

            <video
              controls
              autoPlay
              className="w-full h-[90vh] bg-black"
            >

              <source
                src={`http://13.207.185.193:5001/uploads/${movie.video_url}`}
                type="video/mp4"
              />

            </video>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Watch;