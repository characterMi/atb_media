import { CheckCircle } from "@mui/icons-material"
import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { demoChannelTitle, demoVideoTitle, demoVideoUrl } from "../utils/constants"

const VideoCard = ({ video: { id: { videoId }, snippet } }) => {
  return (
    <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
      <Card
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        sx={{
          width: { xs: 'calc(100vw - 50px)', sm: '300px' },
          boxShadow: "none",
          borderRadius: "0",
          mt: "15px",
          ml: { xs: "0", sm: "15px" }
        }}
      >
        <CardMedia
          alt={snippet?.title}
          image={snippet?.thumbnails?.high?.url}
          loading="lazy"
          sx={{ width: { xs: '100%', sm: "100%" }, aspectRatio: "16/9" }}
        />
        <CardContent sx={{ backgroundColor: "#1e1e1e", height: "106px" }}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="#fff"
            dangerouslySetInnerHTML={{
              __html: snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)
            }}
          />
          <Typography variant="subtitle2" fontWeight="bold" color="gray">
            {snippet?.channelTitle.slice(0, 60) || demoChannelTitle.slice(0, 60)}
            <CheckCircle sx={{ fontSize: 12, color: "gray", ml: '5px' }} />
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

export default VideoCard