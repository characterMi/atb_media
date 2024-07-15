import { CheckCircle } from "@mui/icons-material"
import { Box, CardContent, CardMedia, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { demoProfilePicture } from "../utils/constants"
import SkeletonProfile from "./Skeleton/SkeletonProfile"

const ChannelCard = ({ channelDetail, marginTop }) => {
  let content;
  if (channelDetail) {
    content = (
      <Box
        sx={{
          boxShadow: "none",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: { xs: '100%', md: '300px' },
          height: "326px",
          margin: "auto",
          marginTop
        }}
      >
        <Link to={`/channel/${channelDetail?.id?.channelId}`}>
          <CardContent sx={{ display: "flex", flexDirection: "column", textAlign: "center", color: "#fff", alignItems: "center" }}>
            <CardMedia
              loading="lazy"
              image={channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture}
              alt={channelDetail?.snippet?.title}
              sx={{
                borderRadius: "50%",
                height: "180px",
                width: "180px",
                mb: 2,
                border: "1px solid #e3e3e3"
              }}
            />
            <Typography variant="h6">
              {channelDetail?.snippet?.title}
              <CheckCircle sx={{ fontSize: 14, color: "gray", ml: '5px' }} />
            </Typography>
            {channelDetail?.statistics?.subscriberCount && (
              <Typography>
                {parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString()} Subscribers
              </Typography>
            )}
          </CardContent>
        </Link>
      </Box>
    )
  } else {
    content = <SkeletonProfile />
  }
  return content
}

export default ChannelCard