import { createSlice } from "@reduxjs/toolkit";
import { apiService } from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  updatedProfile: null,
  selectedUser: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    isLoading(state, action) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedUser = action.payload;
    },
    updateUserProfileSuccess(state,action) {
      state.isLoading = false;
      state.error = null;
      state.updatedProfile = action.payload
    }

  },
});
export const getUser =
  ({ userId }) =>
  async (dispatch) => {
    dispatch(slice.actions.isLoading());
    try {
      const response = await apiService.get(`/users/${userId}`);
      dispatch(slice.actions.getUserSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError());
      toast.error(error.message);
    }
  };
export const updateUserProfile =
  ({ userId,name, avatarUrl, coverUrl, aboutMe, city, country, company, jobTitle, facebookLink, instagramLink, linkedinLink, twitterLink}) =>
  async (dispatch) => {
    dispatch(slice.actions.isLoading());
    try {
      const data ={
        name,
        coverUrl,
        aboutMe,
        city,
        country,
        company,
        jobTitle,
        facebookLink,
        instagramLink,
        linkedinLink,
        twitterLink,
      }
      const response = await apiService.put(`/users/${userId}`,data)
      dispatch(slice.actions.updateUserProfileSuccess(response.data.data))
      toast.success("Updated Profile success")
     
    } catch (error) {
      dispatch(slice.actions.hasError());
      toast.error(error.message);
    }

  };

export default slice.reducer;
