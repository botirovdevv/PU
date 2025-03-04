import Home from "../pages/Home";
import MorePhotos from "../pages/images/MorePhotos";
import Photos from "../pages/images/Photos";
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
    },

    {
        path: "/photos",
        element: <Photos/>
    },

    {
        path: "/more",
        element: <MorePhotos/>
    }
]