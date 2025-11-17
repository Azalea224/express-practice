export type Movie = {
  id: number;
  title: string;
  year: number;
  genre: string;
  mainActors: string[];
};

export const movies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    genre: "Science Fiction",
    mainActors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
  },
  {
    id: 2,
    title: "The Godfather",
    year: 1972,
    genre: "Crime",
    mainActors: ["Marlon Brando", "Al Pacino", "James Caan"],
  },
  {
    id: 3,
    title: "The Shawshank Redemption",
    year: 1994,
    genre: "Drama",
    mainActors: ["Tim Robbins", "Morgan Freeman", "William Sadler"],
  },
  {
    id: 4,
    title: "Pulp Fiction",
    year: 1994,
    genre: "Crime",
    mainActors: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
  },
  {
    id: 5,
    title: "The Dark Knight",
    year: 2008,
    genre: "Action",
    mainActors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
  },
];
export default movies;
