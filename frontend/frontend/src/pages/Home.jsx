import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/movies"
      );

      setMovies(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="bg-black min-h-screen text-white">

      {/* NAVBAR */}

      <div className="flex justify-between items-center p-6 border-b border-zinc-800">

        <h1 className="text-4xl font-bold text-purple-500">
          StreamX
        </h1>

        <div className="flex items-center gap-6">

          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-zinc-900 px-4 py-2 rounded-xl outline-none"
          />

          <button className="hover:text-purple-500 duration-300">
            Home
          </button>

          <button className="hover:text-purple-500 duration-300">
            Movies
          </button>

          <button className="hover:text-purple-500 duration-300">
            Series
          </button>

        <button
  onClick={() => {

    localStorage.removeItem("token");

    navigate("/");

  }}
  className="hover:text-red-500 duration-300"
>
  Logout
</button>
        </div>

      </div>

      {/* HERO SECTION */}

      <div className="p-10">

        <div className="bg-zinc-900 rounded-3xl p-10 mb-16">

          <h2 className="text-6xl font-bold mb-6">
            Watch Anywhere.
          </h2>

          <p className="text-zinc-400 text-xl mb-8">
            Unlimited Movies, TV Shows and More.
          </p>

          {movies.length > 0 && (
            <button
              onClick={() =>
                navigate("/watch", {
                  state: movies[0],
                })
              }
              className="mt-4 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-bold"
            >
              Watch Now
            </button>
          )}

        </div>

        {/* MOVIES SECTION */}

        <h2 className="text-4xl font-bold mb-10">
          Trending Movies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {movies
            .filter((movie) =>
              movie.title
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((movie, index) => (

              <div
                key={index}
                className="bg-zinc-900 rounded-2xl overflow-hidden hover:scale-105 duration-300"
              >

                <img
                  src={movie.thumbnail}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />

                <div className="p-5">

                  <h2 className="text-2xl font-bold">
                    {movie.title}
                  </h2>

                  <p className="text-zinc-400 mt-2">
                    {movie.genre}
                  </p>

                  <button
                    onClick={() =>
                      navigate("/watch", {
                        state: movie,
                      })
                    }
                    className="mt-4 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-bold"
                  >
                    Watch Now
                  </button>

                </div>

              </div>

            ))}

        </div>

      </div>

    </div>
  );
}

export default Home;