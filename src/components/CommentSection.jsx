import { CancelRounded } from "@mui/icons-material"
import { Box, Button, TextField, Typography } from "@mui/material"
import { Link } from "react-router-dom"


const CommentSection = ({ comments, id, setCommentSection, commentSection }) => {
  return (
    <>
      <Box
        sx={{
          background: "#1e1e1e",
          color: "#fff",
          borderRadius: { xs: "0", md: "10px" },
          transition: "all 400ms ease",
          opacity: { xs: commentSection ? 1 : 0, md: 1 },
          mx: { xs: 0, md: 2 },
          top: commentSection ? 0 : '100%',
          position: { xs: "absolute", md: "unset" },
          px: { xs: 1, sm: 3 },
          py: { xs: 2, sm: 3 }
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5">
            Comments
          </Typography>
          <CancelRounded
            onClick={() => setCommentSection(false)}
            sx={{
              cursor: "pointer",
              display: { xs: "block", md: "none" }
            }}
          />
        </Box>
        <Box
          sx={{
            borderTop: "1px solid #fff"
          }}
          mt={2}
        >
          <Box py={2} sx={{ borderBottom: "1px solid gray", flexDirection: { xs: "column", sm: "row" } }} display="flex" justifyContent="space-between">
            <TextField sx={{ width: { xs: "100%", sm: "80%" } }} label="Add a comment..." color="error" variant="standard" />
            <Link target="_blank" to={`https://www.youtube.com/watch?v=${id}`} style={{ color: "#fff" }}>
              <Button color="error" variant="contained" sx={{ mt: { xs: 2, sm: 0 } }}>
                Comment
              </Button>
            </Link>
          </Box>
          {comments?.length && comments.map((comment, index) => (
            <Box sx={{ borderBottom: index === comments.length - 1 ? "none" : "1px solid gray", width: '100%' }} display="flex" justifyContent="start" key={index} alignItems="start" py={2}>
              <Box
                component="img"
                src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
                alt={comment.snippet.topLevelComment.snippet.authorDisplayName}
                sx={{ width: { xs: "32px", md: "40px", lg: "48px" }, height: { xs: "32px", md: "40px", lg: "48px" }, borderRadius: "50%" }}
                loading="lazy"
              />
              <Box display="flex" flexDirection="column" justifyContent="center" alignItems="start" ml={1}>
                <Typography sx={{ fontSize: { xs: "16px", md: "18px", lg: "20px" } }}>
                  {comment.snippet.topLevelComment.snippet.authorDisplayName}
                </Typography>
                <Typography sx={{ fontSize: { xs: "12px", md: "14px", lg: "16px" } }}>
                  {comment.snippet.topLevelComment.snippet.textDisplay}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box >
    </>
  )
}

export default CommentSection