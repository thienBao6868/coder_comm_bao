import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriendRequests } from "./friendSlice";
import { Box, Card, Container, Grid, Pagination, Stack,  Typography } from "@mui/material";
import UserCard from "./UserCard";
import SearchInput from "../../components/SearchInput";



const FriendRequest = () => {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const { userById, currentPageUsers, totalUsers,totalPages } = useSelector(state => state.friend);
  const users = currentPageUsers.map((user) => userById[user]);
  const handleSubmit = (searchQuery) =>{
    setFilterName(searchQuery)
  }
  useEffect(  () => {
  dispatch(getFriendRequests({ filterName, page }));
  }, [dispatch, filterName, page]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Friend Requests
      </Typography>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
            <SearchInput handleSubmit={handleSubmit} />
            <Box sx={{ flexGrow: 1 }} />
            <Typography
              variant="subtitle"
              sx={{ color: "text.secondary", ml: 1 }}
            >
              {totalUsers > 1
                ? `${totalUsers} requests found`
                : totalUsers === 1
                ? `${totalUsers} request found`
                : "No request found"}
            </Typography>

            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, page) => setPage(page)}
            />
          </Stack>
        </Stack>

        <Grid container spacing={3} my={1}>
          {users.map((user) => (
            <Grid key={user._id} item xs={12} md={4}>
              <UserCard profile={user} />
            </Grid>
          ))}
        </Grid>
      </Card>
    </Container>
  );
};

export default FriendRequest;
