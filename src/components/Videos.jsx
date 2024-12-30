import { Box, Stack } from "@mui/material";
import ChannelCard from "./ChannelCard";
import Error from "./Error";
import SkeletonVideos from "./Skeleton/SkeletonVideos";
import VideoCard from "./VideoCard";

const Videos = ({ videos, direction, loading_direction }) => {
    let content;
    if (!videos) content = <Error />;

    if (videos?.length === 0) content = <SkeletonVideos direction={loading_direction ? "column" : "row"} />;

    if (videos?.length > 0) {
        content = (
            <Stack flexDirection={{ xs: "row", md: direction || "row" }} flexWrap="wrap" justifyContent="center" alignItems="center">
                {videos.map((item, index) => (
                    <Box key={index}>
                        {item.id.videoId && <VideoCard video={item} />}
                        {item.id.channelId && <ChannelCard channelDetail={item} />}
                    </Box>
                ))}
            </Stack>
        )
    }

    return content;
}

export default Videos