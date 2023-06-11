import { createSlice } from "@reduxjs/toolkit";
import { apiService } from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  userById: {},
  currentPageUsers: [],
  totalPages: 1,
};

const slice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    isLoading(state, action) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { users, totalPages, count } = action.payload;
      users.map((user) => (state.userById[user._id] = user));
      state.currentPageUsers = users.map((user) => user._id);
      state.totalPages = totalPages;
      state.totalUsers = count;
    },
    getFriendListSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { users, count } = action.payload;
      users.map((user) => (state.userById[user._id] = user));
      state.currentPageUsers = users.map((user) => user._id);
      state.totalUsers = count;
    },
    getFriendRequestsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { users, count } = action.payload;
      users.map((user) => (state.userById[user._id] = user));
      state.currentPageUsers = users.map((user) => user._id);
      state.totalUsers = count;
     
    },
    sendFriendRequestSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { targetUserId, ...friendship } = action.payload;
      state.userById[targetUserId].friendship = friendship;

     
    },
    acceptRequestSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { targetUserId, ...friendship } = action.payload;
      state.userById[targetUserId].friendship = friendship;
    },
    declinedRequestSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { targetUserId, ...friendship } = action.payload;
      state.userById[targetUserId].friendship = friendship;
    },
    cancelRequestSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { targetUserId } = action.payload;
      state.userById[targetUserId].friendship = null;
      
    },
    removeFriendSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { targetUserId } = action.payload;
      state.userById[targetUserId].friendship = null;
    },
    getRequestsFriendSuccess (state,action) {
      state.isLoading = false;
      state.error = null;
      const { users, totalPages, count } = action.payload;
      users.map((user) => (state.userById[user._id] = user));
      state.currentPageUsers = users.map((user) => user._id);
      state.totalPages = totalPages;
      state.totalUsers = count;
    }
  },
});

export const getUsers =
  ({ filterName, page, limit = 10 }) =>
  async (dispatch) => {
    dispatch(slice.actions.isLoading());
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const response = await apiService.get(`/users`, {
        params,
      });

      dispatch(slice.actions.getUsersSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError());
      toast.error(error.message);
    }
  };
export const getFriendList =
  ({ filterName, page, limit = 10 }) =>
  async (dispatch) => {
    dispatch(slice.actions.isLoading());
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const response = await apiService.get(`/friends`, {
        params,
      });

      dispatch(slice.actions.getFriendListSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError());
      toast.error(error.message);
    }
  };
  export const getFriendRequests =
  ({ filterName, page, limit = 10 }) =>
  async (dispatch) => {
    dispatch(slice.actions.isLoading());
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const response = await apiService.get(`/friends/requests/incoming`, {
        params,
      });
      dispatch(slice.actions.getFriendRequestsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError());
      toast.error(error.message);
    }
  };
export const sendFriendRequest = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.isLoading());
  try {
    const response = await apiService.post(`/friends/requests`, {
      to: targetUserId,
    });

    dispatch(
      slice.actions.sendFriendRequestSuccess({
        targetUserId,
        ...response.data.data,
      })
    );
    toast.success("Request sent");
  } catch (error) {
    dispatch(slice.actions.hasError());
    toast.error(error.message);
  }
};
export const acceptRequest = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.isLoading());
  try {
    const response = await apiService.put(`/friends/requests/${targetUserId}`, {
      status: "accepted",
    });
    dispatch(
      slice.actions.acceptRequestSuccess({
        targetUserId,
        ...response.data.data,
      })
    );
    toast.success("Request accepted");
  } catch (error) {
    dispatch(slice.actions.hasError());
    toast.error(error.message);
  }
};
export const declinedRequest = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.isLoading());
  try {
    const response = await apiService.put(`/friends/requests/${targetUserId}`, {
      status: "declined",
    });
    dispatch(
      slice.actions.declinedRequestSuccess({
        targetUserId,
        ...response.data.data,
      })
    );
    toast.success("Request declined");
  } catch (error) {
    dispatch(slice.actions.hasError());
    toast.error(error.message);
  }
};
export const cancelRequest = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.isLoading());
  try {
    const response = await apiService.delete(
      `/friends/requests/${targetUserId}`
    );
    dispatch(
      slice.actions.cancelRequestSuccess({
        targetUserId,
        ...response.data.data,
      })
    );
    toast.success("Cancel Request");
  } catch (error) {
    dispatch(slice.actions.hasError());
    toast.error(error.message);
  }
};
export const removeFriend = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.isLoading());
  try {
    const response = await apiService.delete(`/friends/${targetUserId}`);
    dispatch(
      slice.actions.removeFriendSuccess({ targetUserId, ...response.data.data })
    );
    toast.success("Unfriend Success");
  } catch (error) {
    dispatch(slice.actions.hasError());
    toast.error(error.message);
  }
};

export const getRequestsFriend =
  ({ filterName, page, limit = 10 }) =>
  async (dispatch) => {
    dispatch(slice.actions.isLoading());
    try {
      console.log(filterName,page,limit,"fix get user")
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const response = await apiService.get(`/friends/requests/outgoing`, {
        params,
      });
      console.log(response.data.data)
      dispatch(slice.actions.getRequestsFriendSuccess(response.data.data));
    

    } catch (error) {
      dispatch(slice.actions.hasError());
      toast.error(error.message);
    }
  };

export default slice.reducer;
