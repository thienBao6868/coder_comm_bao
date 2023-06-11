import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRequestsFriend, getUsers } from "./friendSlice";
import { Box, Button, Card, Container, Stack, TablePagination, Typography } from "@mui/material";
import SearchInput from "../../components/SearchInput";
import UserTable from "./UserTable";

const AddFriend = () => {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setrowsPerPage] = useState(5);

  const { userById, currentPageUsers, totalPages, totalUsers } = useSelector(
    (state) => state.friend
  );
    const users = currentPageUsers.map((userId) => userById[userId])
  
  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };

  const handleChangePage = (event,newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setrowsPerPage(parseInt(event.target.value,10));
    setPage(0)
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers({ filterName, page: page + 1, limit: rowsPerPage }));
  }, [dispatch, filterName, page, rowsPerPage]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Add Friends
      </Typography>
      <Card sx={{ p: 3 }}>
        <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
          <SearchInput handleSubmit={handleSubmit} />
          <Typography
            variant="subtitle"
            sx={{ color: "text.secondary", ml: 1 }}
          >
            {totalUsers > 1
              ? `${totalUsers} users found`
              : totalUsers === 1
              ? `${totalUsers} user found`
              : "No user found"}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
         
          <TablePagination
              sx={{
                "& .MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon":
                  {
                    display: { xs: "none", md: "block" },
                  },
              }}
              component="div"
              count={totalUsers ? totalUsers : 0}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Stack>
        <UserTable users={users}/>
      </Card>
    </Container>
  );
};

export default AddFriend;
