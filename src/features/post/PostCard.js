import {
  Avatar,
  Box,
  Card,
  CardHeader,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React, { useState } from "react";
import { fDate } from "../../utils/formatTime";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostReaction from "./PostReaction";
import CommentList from "../comment/CommentList";
import CommentForm from "../comment/CommentForm";
import { useDispatch } from "react-redux";
import { removePost } from "./postSlice";
import useAuth from "../../hook/useAuth";
import UpdatePost from "./UpdatePost";
import ConfirmDeletePost from "./ConfirmDeletePost";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  borderRadius: 2,
  // border: "2px solid #000",
  // boxShadow: 24,
  p: 4,
};

function PostCard({ post }) {
  // xem bai post cua ai ?
  const { user } = useAuth();
  const currentUserId = user._id;
  const targetUserId = post.author._id;

  // delete 
  const postId = post._id;

  // render menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // render Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // confirm delete
  const [isPostDelete, setIsPostDelete] = useState(false);

  // remove post
  const dispatch = useDispatch();

  const handlePostDelete = async (postId) => {
    setIsPostDelete(false)
     dispatch(removePost(postId));
  };
  const handleEditPost = () =>{
    handleOpen();
    handleCloseMenu();
  }

  // render menu
  const renderMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
    >
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <MenuItem sx={{ mx: 1 }} onClick={() => {
          setIsPostDelete(true);
          handleCloseMenu()
        }}>
          Delete 
        </MenuItem>
        <MenuItem sx={{ mx: 1 }} onClick={handleEditPost} >
          Edit Post
        </MenuItem>
      </Box>
    </Menu>
  );

  return (
    <>
      <Card>
        <CardHeader
          disableTypography
          avatar={
            <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
          }
          title={
            <Link
              variant="subtitle2"
              color="text.primary"
              component={RouterLink}
              sx={{ fontWeight: 600 }}
              to={`/user/${post.author._id}`}
            >
              {post?.author?.name}
            </Link>
          }
          subheader={
            <Typography
              variant="caption"
              sx={{ display: "block", color: "text.secondary" }}
            >
              {fDate(post.createdAt)}
            </Typography>
          }
          action={
            currentUserId === targetUserId ? (
              <IconButton onClick={handleOpenMenu}>
                <MoreVertIcon sx={{ fontSize: 30 }} />
              </IconButton>
            ) : (
              <></>
            )
          }
        />
        {renderMenu}

        <Stack spacing={2} sx={{ p: 3 }}>
          <Typography>{post.content}</Typography>

          {post.image && (
            <Box
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                height: 300,
                "& img": { objectFit: "cover", width: 1, height: 1 },
              }}
            >
              <img src={post.image} alt="post" />
            </Box>
          )}
          <PostReaction post={post} />
          <CommentList postId={post._id} />
          <CommentForm postId={post._id} />
        </Stack>
      </Card>
      {isPostDelete && (<ConfirmDeletePost handlePostDelete={handlePostDelete} setIsPostDelete={setIsPostDelete} postId={postId}/>)}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UpdatePost post={post} handleClose={handleClose}/>
        </Box>
      </Modal>
    </>
  );
}

export default PostCard;
