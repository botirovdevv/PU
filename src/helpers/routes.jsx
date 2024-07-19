import Home from "../pages/Home";
import SearchResults from "../pages/search/SearchResults";

export const routes = [
    {
        path: "/",
        element: <Home/>
    },

    {
        path: "/search-results",
        element: <SearchResults/>
    }
]