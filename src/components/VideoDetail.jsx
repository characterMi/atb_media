import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Typography, Box, Stack } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { Videos } from "./";
import { fetchFromAPI } from '../utils/fetchAPI';
import SkeletonVideo from './Skeleton/SkeletonVideo';

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null)
  const { id } = useParams()
  useEffect(() => {
    setVideos([])
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data?.items[0]))
      .catch(() => setVideos(null));
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data?.items));
  }, [id]);
  let content;
  if (!videoDetail?.snippet) {
    content = <SkeletonVideo />
  } else {
    const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail
    content = (
      <Box flex={1}>
        <Box sx={{
          width: "100%",
          position: "sticky",
          top: "86px"
        }}>
          <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
          <Typography color="#fff" sx={{ fontSize: { xs: "18px", sm: "24px" } }} fontWeight="bold" p={2}>
            {title}
          </Typography>
          <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff", }} py={1} px={2}>
            <Link to={`/channel/${channelId}`}>
              <Typography color="#fff" sx={{ fontSize: { xs: "14px", sm: "18px" } }}>
                {channelTitle}
                <CheckCircle sx={{ fontSize: "12px", color: "gray", ml: '5px' }} />
              </Typography>
            </Link>
            <Stack direction="row" gap="20px" alignItems="center">
              <Typography  sx={{ fontSize: { xs: "12px", sm: "16px" }, opacity: 0.7 }}>
                {parseInt(viewCount).toLocaleString()} Views
              </Typography>
              <Typography  sx={{ fontSize: { xs: "12px", sm: "16px" }, opacity: 0.7 }}>
                {parseInt(likeCount).toLocaleString()} Likes
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Box>
    )
  }
  return (
    <Box minHeight="95vh" >
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="center">
        {content}
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center">
          <Videos videos={videos} direction="column" loading_direction />
        </Box>
      </Stack>
    </Box>
  )
}

export default VideoDetail