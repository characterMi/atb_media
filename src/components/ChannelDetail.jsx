import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChannelCard from "./ChannelCard";
import Videos from "./Videos";

import { fetchFromAPI } from "../utils/fetchAPI";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([])
  const { id } = useParams();
  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]));

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => setVideos(data?.items));
  }, [id])
  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background: 'linear-gradient(90deg, rgba(56,7,7,1) 0%, rgba(230,17,17,1) 50%, rgba(255,149,0,1) 100%)',
            zIndex: '10',
            height: '300px'
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-120px" />
      </Box>
      <Box display="flex" p="2" mt="50px">
        <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail