import { createSlice } from "@reduxjs/toolkit";
import { apiService } from "../../app/apiService";
import { POST_PER_PAGE } from "../../app/config";
import { cloudinaryUpload } from "../../utils/cloudinaryUpload";
import { toast } from "react-toastify";



const initialState = {
  isLoading: false,
  error: null,
  postById: {},
  currentPostPage: [],
};

const slice = createSlice({
  name: "post",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newPost = action.payload;
      if (state.currentPostPage.length % POST_PER_PAGE === 0) {
        state.currentPostPage.pop();
      }
      state.postById[newPost._id] = newPost;
      state.currentPostPage.unshift(newPost._id);
    },
    getPostListSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { posts, count } = action.payload;
      posts.forEach((post) => {
        state.postById[post._id] = post;
        if (!state.currentPostPage.includes(post._id)) {
          state.currentPostPage.push(post._id);
        }
      });
      state.totalPosts = count;
    },
    sendPostReactionSuccesss(state, action) {
      state.isLoading = false;
      state.error = null;
      const { postId, reactions } = action.payload;
      state.postById[postId].reactions = reactions;
    },
    resetPost (state,action){
      state.postById = {};
      state.currentPostPage = [];
    },
    removePostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const {postId} = action.payload
      state.currentPostPage =  state.currentPostPage.filter((post) => post !== postId )
    },
    updatePostSuccess(state, action){
      state.isLoading = false;
      state.error = null;
      const {postId,content,image}= action.payload
      state.postById[postId].content = content ;
      state.postById[postId].image= image ;

    }
    
  },
});

export const createPost =
  ({ content, image }) =>
  
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
   
      const imageUrl = await cloudinaryUpload(image);
     
      const response = await apiService.post("/posts", {
        content,
        image:imageUrl,
      });
      dispatch(slice.actions.createPostSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export const getPostList =
  ({ userId, page, limit = POST_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(
        `/posts/user/${userId}?page=${page}&limit=${limit}`
      );
      if(page ===1 ) dispatch(slice.actions.resetPost())
      dispatch(slice.actions.getPostListSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const sendPostReaction =
  ({ postId, emoji }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/reactions", {
        targetType: "Post",
        targetId: postId,
        emoji: emoji,
      });
      dispatch(slice.actions.sendPostReactionSuccesss({ postId, reactions:response.data.data }));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
  export const removePost =
  (postId) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.delete(`/posts/${postId}`)
      console.log(response.data,"fix")
      dispatch(slice.actions.removePostSuccess({postId, ...response.data.data}))
      toast.success("remove success")
     
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error("remove fail")
    }
  };
  export const updatePost =
  ({ postId, content, image }) =>
  
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
   
      const imageUrl = await cloudinaryUpload(image);
      const response = await apiService.put(`/posts/${postId}`, {
        content,
        image:imageUrl,
      });
      
      dispatch(slice.actions.updatePostSuccess({postId,...response.data.data}));
      toast.success("Edit post success")
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error("Edit post fail")
    }
  };


export default slice.reducer;
