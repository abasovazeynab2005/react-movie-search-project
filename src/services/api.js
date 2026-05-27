const OMDB_API_KEY = "e00cdd18";
const OMDB_BASE_URL = "https://www.omdbapi.com/";

// 10 фильмов по умолчанию
const getDefaultMovies = () => {
  return [
    {
      imdbID: "tt0120338", 
      Title: "Titanic",
      Year: "1997", 
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGc@._V1_SX300.jpg",
    },
      {
      imdbID: "tt0468569",
      Title: "The Dark Knight",
      Year: "2008",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    },
    {
      imdbID: "tt0499549",
      Title: "Avatar",
      Year: "2009",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3ZjE0MzQ5XkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      imdbID: "tt1375666",
      Title: "Inception",
      Year: "2010",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    },
    {
      imdbID: "tt0241527",
      Title: "Harry Potter and the Sorcerer's Stone",
      Year: "2001",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNjQ3NWNlNmQtMTE5ZS00MDdmLTlkZjUtZTBlM2UxMGFiMTU3XkEyXkFqcGc@._V1_SX300.jpg",
    },
    {
      imdbID: "tt2488496",
      Title: "Frozen",
      Year: "2013",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_SX300.jpg",
    },
    {
      imdbID: "tt4633694",
      Title: "Spider-Man: Into the Spider-Verse",
      Year: "2018",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjM4MzY5NzYyMV5BMl5BanBnXkFtZTgwNTMzNTY2NjM@._V1_SX300.jpg",
    },
      {
      imdbID: "tt2911666",
      Title: "John Wick",
      Year: "2014",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTU2NDA4MjE@._V1_SX300.jpg",
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
