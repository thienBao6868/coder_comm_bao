import React from "react";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import useAuth from "../../hook/useAuth";
import { useDispatch } from "react-redux";
import { removeComment } from "./commentSlice";

function CommentCard({ comment,postId }) {

  const { user } = useAuth();
  const currentUserId = user._id;
  const targetUserId = comment.author._id;

// render menu
const [anchorEl, setAnchorEl] = React.useState(null);
const handleOpenMenu = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleCloseMenu = () => {
  setAnchorEl(null);
};

// handle remove comment
const dispatch = useDispatch();

const handleRemoveComment  = async (commentId) => {
 dispatch(removeComment({commentId, postId}))
}

const renderMenu = (
  <Menu
    id="menu-appbar"
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    keepMounted
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    open={Boolean(anchorEl)}
    onClose={handleCloseMenu}
  >
    <Box sx={{ my: 1, px: 1.5 }}>
      <MenuItem sx={{ mx: 1,fontSize: "small" }} onClick={()=> handleRemoveComment(comment._id)} >
        Remove comment
      </MenuItem>
      <MenuItem sx={{ mx: 1,fontSize: "small"}}>
        Edit comment
      </MenuItem>
    </Box>
  </Menu>
);


  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
            {currentUserId === targetUserId ? (
              <IconButton onClick={handleOpenMenu}>
                <MoreHorizIcon sx={{ fontSize: 15 }} />
              </IconButton>
            ) : (
              <></>
            )}
          </Typography>
          {renderMenu}
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(comment.createdAt)}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;
