import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchFromAPI } from "../utils/fetchAPI";
import Sidebar from "./Sidebar";
import Videos from "./Videos";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState('New')
  const [videos, setVideos] = useState([])
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    if (category) return setSelectedCategory(category);

    setSelectedCategory("New")
  }, [category])


  useEffect(() => {
    setVideos([])
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => setVideos(data?.items))
      .catch(() => setVideos(null))
  }, [selectedCategory])

  return (
    <Stack
      sx={{ flexDirection: { xs: 'column', md: "row" } }}
    >
      <Box
        sx={{ height: { xs: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { xs: 0, md: 2 } }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography className="copyright" variant='body2' sx={{ mt: 1.5, color: "#fff" }}>
          Copyright {new Date().getFullYear()} ATB Media
        </Typography>
      </Box>
      <Box p={2} sx={{ overflow: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h5" fontWeight="bold" mb={2} sx={{ color: "#fff" }}>
          {selectedCategory} <span style={{ color: "#f31503" }}>Videos</span>
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Stack>
  )
}

export default Feed