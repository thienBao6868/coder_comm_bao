import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    IconButton,
    Typography,
  } from "@mui/material";
  // import { Close } from "@material-ui/icons";
  import CloseIcon from "@mui/icons-material/Close";
  
  function ConfirmDeletePost({ handlePostDelete, setIsPostDelete, postId }) {
    return (
      <Dialog open={true} maxWidth="sm" fullWidth>
        <DialogTitle>Confirm to delete</DialogTitle>
        <Box position="absolute" top={0} right={0}>
          <IconButton>
            <CloseIcon onClick={() => setIsPostDelete(false)} />
          </IconButton>
        </Box>
        <DialogContent>
          <Typography>{`Are you sure you want to delete the post?`}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="warning"
            variant="contained"
            onClick={() => setIsPostDelete(false)}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => handlePostDelete(postId)}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  export default ConfirmDeletePost;