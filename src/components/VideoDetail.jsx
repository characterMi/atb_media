import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Typography, Box, Stack, Button } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { CommentSection, Videos } from "./";
import { fetchFromAPI } from '../utils/fetchAPI';
import SkeletonVideo from './Skeleton/SkeletonVideo';

const VideoDetail = () => {
  const [comments, setComments] = useState([])
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null)
  const [commentSection, setCommentSection] = useState(false)
  const { id } = useParams()
  useEffect(() => {
    setVideoDetail(null)
    setVideos([])
    setComments([])
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data?.items[0]))
      .catch(() => setVideos(null));
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data?.items));
    fetchFromAPI(`commentThreads?part=snippet&videoId=${id}`)
      .then((data) => setComments(data?.items))
      .catch(() => setComments(null));
  }, [id]);
  let content;
  if (!videoDetail?.snippet) {
    content = <SkeletonVideo />
  } else {
    const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail
    content = (
      <Box flex={1} mb={1}>
        <Box sx={{
          width: "100%",
          position: "relative"
        }} display="flex" flexDirection="column">
          <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
          <Typography sx={{ fontSize: { xs: "18px", sm: "24px" } }} fontWeight="bold" p={2}>
            {title}
          </Typography>
          <Stack direction="row" gap="10px" alignItems="center" px={2}>
            <Typography sx={{ fontSize: { xs: "12px", sm: "16px" }, opacity: 0.7 }}>
              {parseInt(viewCount).toLocaleString()} Views
            </Typography>
            <Typography sx={{ fontSize: { xs: "12px", sm: "16px" }, opacity: 0.7 }}>
              {parseInt(likeCount).toLocaleString()} Likes
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" py={1} px={2} mb={3}>
            <Link onClick={() => setCommentSection(false)} to={`/channel/${channelId}`}>
              <Typography color="#fff" sx={{ fontSize: { xs: "12px", md: "14px", lg: "16px" } }}>
                {channelTitle}
                <CheckCircle sx={{ fontSize: "12px", color: "gray", ml: '5px' }} />
              </Typography>
            </Link>
            <Link to={`https://www.youtube.com/channel/${channelId}`} target="_blank">
              <Button color='error'>
                Subscribe
              </Button>
            </Link>
          </Stack>
          <Box
            p={2}
            my={1}
            mx={2}
            alignItems="start"
            flexDirection="column"
            sx={{
              borderRadius: "15px",
              background: "#1e1e1e",
              cursor: "pointer",
              display: { xs: "flex", md: "none" }
            }}
            onClick={() => setCommentSection(true)}
          >
            <Typography variant="h6" display="flex" justifyContent="flex-end" alignItems="center">
              Comments <span style={{ opacity: 0.7, marginLeft: "5px" }}>{comments.length}</span>
            </Typography>
            <Box display="flex" justifyContent="start" alignItems="center" mt={1}>
              <img
                src={comments[0]?.snippet.topLevelComment.snippet.authorProfileImageUrl}
                alt={comments[0]?.snippet.topLevelComment.snippet.authorDisplayName}
                style={{ width: "28px", height: "28px", borderRadius: "50%" }}
                loading="lazy"
              />
              <Typography variant="body2" ml={1}>
                {`${comments[0]?.snippet.topLevelComment.snippet.textDisplay.slice(0, 50)}...`}
              </Typography>
            </Box>
          </Box>
          <CommentSection commentSection={commentSection} setCommentSection={setCommentSection} comments={comments} id={id} />
        </Box>
      </Box>
    )
  }
  return (
    <Box minHeight="95vh" color="#fff">
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="center">
        {content}
        <Box sx={{ display: { xs: commentSection ? 'none' : 'block', md: "block" } }} px={2} py={{ md: 1, xs: 5 }} onClick={() => setCommentSection(false)} justifyContent="center" alignItems="center">
          <Videos videos={videos} direction="column" loading_direction />
        </Box>
      </Stack>
    </Box>
  )
}

export default VideoDetail