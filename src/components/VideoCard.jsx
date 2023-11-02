import { Link } from "react-router-dom"
import { Typography, Card, CardContent, CardMedia } from "@mui/material"
import { CheckCircle } from "@mui/icons-material"
import { demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from "../utils/constants"

const VideoCard = ({ video: { id: { videoId }, snippet } }) => {
  return (
    <Card onClick={() => window.scrollTo({top: 0, behavior: "smooth"})} sx={{ width: { xs: 'calc(100vw - 50px)', sm: '300px' }, boxShadow: "none", borderRadius: "0" }}>
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <CardMedia
          alt={snippet?.title}
          image={snippet?.thumbnails?.high?.url}
          loading="lazy"
          sx={{ width: {xs: '100%', sm: "100%"}, aspectRatio: "16/9" }}
        />
      </Link>
      <CardContent sx={{ backgroundColor: "#1e1e1e", height: "106px" }}>
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <Typography variant="subtitle1" fontWeight="bold" color="#fff">
            {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
          </Typography>
        </Link>
        <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
          <Typography variant="subtitle2" fontWeight="bold" color="gray">
            {snippet?.channelTitle.slice(0, 60) || demoChannelTitle.slice(0, 60)}
            <CheckCircle sx={{ fontSize: 12, color: "gray", ml: '5px' }} />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  )
}

export default VideoCard