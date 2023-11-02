import { HashRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { Navbar, Feed, VideoDetail, ChannelDetail, SearchFeed } from "./components"

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
