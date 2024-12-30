import { Box } from "@mui/material";
import { lazy } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

const Feed = lazy(() => import("./components/Feed"));
const VideoDetail = lazy(() => import("./components/VideoDetail"));
const ChannelDetail = lazy(() => import("./components/ChannelDetail"));
const SearchFeed = lazy(() => import("./components/SearchFeed"));

function App() {
  return (
    <HashRouter>
      <Box sx={{ backgroundColor: "#000" }} className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/channel/:id" element={<ChannelDetail />} />
          <Route path="/search/:searchTerm" element={<SearchFeed />} />
        </Routes>
      </Box>
    </HashRouter>
  );
}

export default App;
