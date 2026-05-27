const OMDB_API_KEY = "e00cdd18";
const OMDB_BASE_URL = "https://www.omdbapi.com/";

// 10 фильмов по умолчанию
const getDefaultMovies = () => {
  return [
    {
      imdbID: "tt0111161",
      Title: "The Shawshank Redemption",
      Year: "1994",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2RlYy00NmEyLTk4ZjgtYjE5NzM3MzVmY2M4XkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      imdbID: "tt0068646",
      Title: "The Godfather",
      Year: "1972",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      imdbID: "tt0468569",
      Title: "The Dark Knight",
      Year: "2008",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    },
    {
      imdbID: "tt1375666",
      Title: "Inception",
      Year: "2010",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    },
    {
      imdbID: "tt0133093",
      Title: "The Matrix",
      Year: "1999",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      imdbID: "tt0120737",
      Title: "The Lord of the Rings: The Fellowship of the Ring",
      Year: "2001",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      imdbID: "tt0167260",
      Title: "The Lord of the Rings: The Return of the King",
      Year: "2003",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      imdbID: "tt0110912",
      Title: "Pulp Fiction",
      Year: "1994",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      imdbID: "tt0109830",
      Title: "Forrest Gump",
      Year: "1994",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      imdbID: "tt0816692",
      Title: "Interstellar",
      Year: "2014",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGc@._V1_SX300.jpg",
    },
  ];
};

// Получение начальных фильмов
export const getRandomMovies = () => {
  return Promise.resolve(getDefaultMovies());
};

// Поиск фильмов
export const searchMovies = (query) => {
  if (query.trim() === "") {
    return Promise.resolve({ Search: [] });
  }

  return fetch(
    `${OMDB_BASE_URL}?s=${encodeURIComponent(query)}&apikey=${OMDB_API_KEY}`
  )
    .then((response) => response.json())
    .catch((error) => {
      console.error("Ошибка поиска:", error);
      return { Search: [] };
    });
};

// Получение фильма по ID
export const getMovieById = (id) => {
  return fetch(`${OMDB_BASE_URL}?i=${id}&apikey=${OMDB_API_KEY}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Ошибка:", error);
      return null;
    });
};

// Сохранение папки
export const saveMovieList = (title, movies) => {
  const id = Date.now().toString();
  const listData = {
    id: id,
    title: title,
    movies: movies,
  };
  localStorage.setItem(`movie_list_${id}`, JSON.stringify(listData));
  return Promise.resolve(listData);
};

// Получение папки по ID
export const getListById = (id) => {
  const data = localStorage.getItem(`movie_list_${id}`);
  return Promise.resolve(data ? JSON.parse(data) : null);
};

// Получение всех папок
export const getAllLists = () => {
  const lists = [];

  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("movie_list_")) {
      const listData = JSON.parse(localStorage.getItem(key));
      lists.push(listData);
    }
  });

  return Promise.resolve(lists);
};

// Удаление папки
export const deleteListById = (id) => {
  localStorage.removeItem(`movie_list_${id}`);
  return Promise.resolve({ success: true });
};
