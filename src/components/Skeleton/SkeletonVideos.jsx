import { Box } from "@mui/material"
import Skeleton from "./Skeleton"

const SkeletonVideos = ({ direction }) => {
  return (
    <Box gap={2} display="flex" sx={{ flexWrap: "wrap", flexDirection: { xs: "row", md: direction || "row" } }} justifyContent="center" alignItems="center">
      {[...Array(10).keys()].map((i) => (
        <div className="skeleton-videos" key={i}>
          <Skeleton classes='video' />
          <Skeleton classes='title width-100 mt' />
          <Skeleton classes='text width-50 ml' />
        </div>
      ))}
    </Box>
  )
}

export default SkeletonVideos