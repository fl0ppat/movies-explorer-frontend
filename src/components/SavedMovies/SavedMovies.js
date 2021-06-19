import { withRouter } from "react-router";
import Search from "../Search/Search";
import MoviesList from "../MoviesList/MoviesList";

const testData = [
  {
    cover:
      "https://images.unsplash.com/photo-1623265041991-b7faf5bd163c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    title: "Доминирующий рыжий",
    like: true,
    duration: 22,
  },

  {
    cover:
      "https://images.unsplash.com/photo-1623265041991-b7faf5bd163c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    title: "Доминирующий рыжий",
    like: true,
    duration: 104,
  },

  {
    cover:
      "https://images.unsplash.com/photo-1623265041991-b7faf5bd163c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    title: "Доминирующий рыжий",
    like: true,
    duration: 2234,
  },
];

function SavedMovies() {
  return (
    <>
      <Search />
      <MoviesList movies={testData} mode='delete' />
    </>
  );
}
export default withRouter(SavedMovies);
