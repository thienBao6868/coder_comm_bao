import React, { useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import useAuth from "../hook/useAuth";
import Profile from "../features/user/Profile";
import FriendList from "../features/friend/FriendList";
import FriendRequest from "../features/friend/FriendRequest";
import AddFriend from "../features/friend/AddFriend";
import { Box, Card, Container, Tab, Tabs } from "@mui/material";
import ProfileCover from "../features/user/ProfileCover";
import { styled } from "@mui/material/styles";
import UserSentRequests from "../features/friend/UserSentRequest";

const TabsWapperStyle = styled("div")(({ theme }) => ({
  zInndex: 9,
  bottom: 0,
  width: "100%",
  display: "flex",
  position: "absolute",
  backgroundColor: "#fff",
  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-end",
    paddingRight: theme.spacing(3),
  },
  
}));

function HomePage() {
  const {user} = useAuth();
  console.log(user,"current user")
  const [currentTab, setCurrentTab] = useState("profile");
  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };
  const PROFILE_TABS = [
    {
      value: "profile",
      icon: <AccountBoxIcon />,
      component: <Profile profile={user} />,
    },
    {
      value: "friends",
      icon: <PeopleAltIcon />,
      component: <FriendList />,
    },
    {
      value: "requests",
      icon: <ContactMailIcon />,
      component: <FriendRequest />,
    },
    {
      value: "requests_sent",
      icon: <ContactMailIcon sx={{ fontSize: 24 }} />,
      component: <UserSentRequests />,
    },
    {
      value: "add_friends",
      icon: <PersonAddIcon />,
      component: <AddFriend />,
    },
  ];
  return (
    <Container>
      <Card
        sx={{
          mb: 3,
          height: 280,
          position: "relative",
        }}
      >
        <ProfileCover profile={user} />
        <TabsWapperStyle>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={(e, value) => handleChangeTab(value)}
          >
            {PROFILE_TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={tab.value}
              />
            ))}
          </Tabs>
        </TabsWapperStyle>
      </Card>
      {PROFILE_TABS.map((tab) => {
        const isMatch = tab.value === currentTab;
        return isMatch && <Box key={tab.value}>{tab.component}</Box>;
        // if (tab.value === currentTab) {
        //   return <Box>{tab.component}</Box>;
        // }
      })}
    </Container>
  );
}

export default HomePage;
