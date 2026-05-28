const OMDB_API_KEY = "e00cdd18";
const OMDB_BASE_URL = "https://www.omdbapi.com/";

// 10 фильмов по умолчанию
const getDefaultMovies = () => {
  return [
    {
    imdbID: "tt2250912",
    Title: "Spider-Man: Homecoming",
    Year: "2017",
    Poster:
        "https://m.media-amazon.com/images/M/MV5BNTk4ODQ1MzgzNl5BMl5BanBnXkFtZTgwMTMyMzM4MTI@._V1_SX300.jpg",
},
      {
      imdbID: "tt0468569",
      Title: "The Dark Knight",
      Year: "2008",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    },
    {
     imdbID: "tt0371746",
     Title: "Iron Man",
     Year: "2008",
     Poster: 
     "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg",
},
    {
      imdbID: "tt1375666",
      Title: "Inception",
      Year: "2010",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    },
    {
     imdbID: "tt1201607",
     Title: "Harry Potter and the Deathly Hallows: Part 2",
     Year: "2011",
     Poster:
   "https://m.media-amazon.com/images/M/MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
    },
    {
       imdbID: "tt2294629",
      Title: "Frozen",
      Year: "2013",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_SX300.jpg",
    },
    {
       imdbID: "tt7286456",
        Title: "Joker",
        Year: "2019",
        Poster:
        "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg"
    },
   {
    imdbID: "tt1392170",
    Title: "The Hunger Games",
    Year: "2012",
     Poster: 
     "https://m.media-amazon.com/images/M/MV5BMjA4NDg3NzYxMF5BMl5BanBnXkFtZTcwNTgyNzkyNw@@._V1_SX300.jpg",
},
    
  {
    imdbID: "tt1291150",
    Title: "Teenage Mutant Ninja Turtles",
    Year: "2014",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZDNiZDk0M2ItNWM4Zi00YjQ0LWJjOGItMDFlMmQ2NTcwZTcxXkEyXkFqcGc@._V1_SX300.jpg",
  },

{
  imdbID: "tt1386697",
  Title: "Suicide Squad",
  Year: "2016",
  Poster: "https://m.media-amazon.com/images/M/MV5BMjM1OTMxNzUyM15BMl5BanBnXkFtZTgwNjYzMTIzOTE@._V1_SX300.jpg",
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
  const id = Date.now().toString();// Создаем ID: "1735123456789"
  const listData = {
    id: id,
    title: title,
    movies: movies, //"tt2250912", "tt0468569", ...
  };
  localStorage.setItem(`movie_list_${id}`, JSON.stringify(listData));
  return Promise.resolve(listData);
};
//Первый аргумент название ячейки "movie_list_1716900000000".

//Второй аргумент данные.LocalStorage понимает только текст,
//  мы превращаем наш JavaScript-объект в строку 
// с помощью JSON.stringify(listData).

// Получение папки по ID
export const getListById = (id) => {
  const data = localStorage.getItem(`movie_list_${id}`);
   // ⭐ Превращаем строку обратно в объект
  // Если данных нет, возвращаем null
  return Promise.resolve(data ? JSON.parse(data) : null);
};

// Получение всех папок
// Получение всех папок (через map)
export const getAllLists = () => {
  // Получаем все ключи из localStorage, которые начинаются с "movie_list_"
  const movieListKeys = Object.keys(localStorage).filter(key => 
    key.startsWith("movie_list_")
  );
  
  // Преобразуем каждый ключ в данные списка с помощью map
  const lists = movieListKeys.map((key) => {
    return JSON.parse(localStorage.getItem(key));
  });

  return Promise.resolve(lists);
};

// Удаление папки
export const deleteListById = (id) => {
  localStorage.removeItem(`movie_list_${id}`);
  return Promise.resolve({ success: true });
};
