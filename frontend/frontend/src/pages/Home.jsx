import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {

    try {

      const res = await axios.get(
        "https://13.206.238.19:5000/api/movies"
      );

      setMovies(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {

    return (

      <div className="bg-black min-h-screen flex justify-center items-center">

        <h1 className="text-4xl font-bold text-purple-500 animate-pulse">
          Loading StreamX...
        </h1>

      </div>

    );
  }

  return (

    <div className="bg-black min-h-screen text-white">

      {/* NAVBAR */}

      <div className="flex justify-between items-center p-6 border-b border-zinc-800 sticky top-0 bg-black z-50">

        <h1 className="text-4xl font-bold text-purple-500 cursor-pointer">
          StreamX
        </h1>

        <div className="flex items-center gap-6">

          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-zinc-900 px-4 py-2 rounded-xl outline-none border border-zinc-700 focus:border-purple-500"
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

        {movies.length > 0 && (

          <div
            className="rounded-3xl p-10 mb-16 bg-cover bg-center h-[550px] flex flex-col justify-end shadow-2xl"
            style={{
              backgroundImage: `
                linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.2)),
                url(${movies[0].thumbnail})
              `,
            }}
          >

            <h2 className="text-7xl font-extrabold mb-4 drop-shadow-lg">
              {movies[0].title}
            </h2>

            <p className="text-zinc-300 text-lg max-w-3xl mb-6 leading-8">
              {movies[0].description}
            </p>

            <div className="flex gap-4">

              <button
                onClick={() =>
                  navigate("/watch", {
                    state: movies[0],
                  })
                }
                className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-xl font-bold text-lg duration-300"
              >
                ▶ Watch Now
              </button>

              <button
                className="bg-zinc-800 hover:bg-zinc-700 px-8 py-4 rounded-xl font-bold text-lg duration-300"
              >
                + My List
              </button>

            </div>

          </div>

        )}

        {/* CONTINUE WATCHING */}

        {movies.length > 0 && (

          <div className="mb-16">

            <h2 className="text-4xl font-bold mb-8">
              Continue Watching
            </h2>

            <div
              className="bg-zinc-900 rounded-3xl overflow-hidden flex flex-col md:flex-row hover:scale-[1.01] duration-300 cursor-pointer border border-zinc-800"
              onClick={() =>
                navigate("/watch", {
                  state: movies[0],
                })
              }
            >

              <img
                src={movies[0].thumbnail}
                alt={movies[0].title}
                className="w-full md:w-[400px] h-[250px] object-cover"
              />

              <div className="p-8 flex flex-col justify-center w-full">

                <h2 className="text-4xl font-bold mb-4">
                  {movies[0].title}
                </h2>

                <p className="text-zinc-400 text-lg mb-6">
                  Resume where you left off and continue streaming instantly.
                </p>

                <div className="w-full bg-zinc-700 h-3 rounded-full overflow-hidden">

                  <div className="bg-purple-600 h-3 w-[45%]"></div>

                </div>

                <p className="text-zinc-500 mt-3">
                  45% completed
                </p>

              </div>

            </div>

          </div>

        )}

        {/* MOVIES SECTION */}

        <div className="flex justify-between items-center mb-10">

          <h2 className="text-4xl font-bold">
            Trending Movies
          </h2>

          <p className="text-zinc-400">
            {movies.length} Movies Available
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {movies
            .filter((movie) =>
              movie.title
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((movie, index) => (

              <div
                key={index}
                className="bg-zinc-900 rounded-2xl overflow-hidden hover:scale-105 hover:shadow-purple-500/20 hover:shadow-2xl duration-300 border border-zinc-800"
              >

                <img
                  src={movie.thumbnail}
                  alt={movie.title}
                  className="w-full h-72 object-cover"
                />

                <div className="p-5">

                  <div className="flex justify-between items-center">

                    <h2 className="text-2xl font-bold">
                      {movie.title}
                    </h2>

                    <span className="bg-purple-600 px-3 py-1 rounded-full text-sm">
                      HD
                    </span>

                  </div>

                  <p className="text-purple-400 mt-3 font-semibold">
                    {movie.genre}
                  </p>

                  <p className="text-zinc-400 mt-3 text-sm leading-6 line-clamp-3">
                    {movie.description}
                  </p>

                  <button
                    onClick={() =>
                      navigate("/watch", {
                        state: movie,
                      })
                    }
                    className="mt-5 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-bold w-full duration-300"
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