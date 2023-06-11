import { Box, Card, Stack, TablePagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchInput from '../../components/SearchInput'
import UserTable from './UserTable'
import { useDispatch, useSelector } from 'react-redux';
import { getRequestsFriend } from './friendSlice';

function UserSentRequests () {
    const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setrowsPerPage] = useState(5);

  const { userById, currentPageUsers, totalUsers} = useSelector(
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
 dispatch(getRequestsFriend({ filterName, page: page + 1, limit: rowsPerPage }))
},[dispatch,filterName,page,rowsPerPage])
  return (
    <Card sx={{ p: 3 }}>
        <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
          <SearchInput handleSubmit={handleSubmit} />
          
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
  )
}

export default UserSentRequests ;
