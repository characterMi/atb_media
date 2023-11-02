import { Stack, Box } from "@mui/material"
import { VideoCard, ChannelCard, Error } from "./";
import SkeletonVideos from "./Skeleton/SkeletonVideos"

const Videos = ({ videos, direction, loading_direction }) => {
    let content;
    if (!videos) {
        content = <Error />
    } else if (videos?.length <= 0) {
        content = <SkeletonVideos direction={loading_direction ? "column" : "row"} />
    } else if (videos?.length > 0) {
        content = (<Stack flexDirection={{ xs: "row", md: direction || "row" }} flexWrap="wrap" justifyContent="center" alignItems="center" gap={2}>
            {videos.map((item, index) => (
                <Box key={index}>
                    {item.id.videoId && <VideoCard video={item} />}
                    {item.id.channelId && <ChannelCard channelDetail={item} />}
                </Box>
            ))}
        </Stack>)
    }
    return content
}

export default Videos