import Home from "../pages/Home";
import SearchResults from "../pages/search/SearchResults";
import Videos from "../pages/videos/Videos";

export const routes = [
    {
        path: "/",
        element: <Home/>
    },

    {
        path: "/search-results",
        element: <SearchResults/>
    },

    {
        path: "/videos",
        element: <Videos/>
    }
]