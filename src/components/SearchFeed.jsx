import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFromAPI } from "../utils/fetchAPI";
import Videos from "./Videos";

const SearchFeed = () => {
  const [videos, setVideos] = useState([])
  const { searchTerm } = useParams()
  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setVideos(data?.items))
  }, [searchTerm])

  return (
    <Box p={2} sx={{ overflow: "auto", height: "90vh", flex: 2 }}>
      <Typography variant="h1" fontWeight="bold" fontSize="2.25rem" mb={2} sx={{ color: "#fff" }}>
        Search Results for : <span style={{ color: "#f31503" }}>{searchTerm}</span> Videos
      </Typography>
      <Videos videos={videos} />
    </Box>
  )
}

export default SearchFeed