import React from "react";
import useAuth from "../../hook/useAuth";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Card, InputAdornment, Stack } from "@mui/material";
import { FTextField, FormProvider } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { updateUserProfile } from "./userSlice";

const SOCIAL_LINKS = [
  {
    value: "linkedinLink",
    icon: <LinkedInIcon />,
  },
  {
    value: "instagramLink",
    icon: <InstagramIcon />,
  },
  {
    value: "facebookLink",
    icon: <FacebookIcon />,
  },
  {
    value: "twitterLink",
    icon: <TwitterIcon />,
  },
];

function AccountSocialLinks() {
  const { user } = useAuth();
  const userId = user._id;
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user.isLoading);
  const defaultValues = {
    linkedinLink: user?.linkedinLink || "",
    facebookLink: user?.facebookLink || "",
    instagramLink: user?.instagramLink || "",
    twitterLink: user?.twitterLink || "",
  };
  const methods = useForm({ defaultValues });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async (data) => {
     dispatch(updateUserProfile({ userId, ...data }));
  };
  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          {SOCIAL_LINKS.map((link) => (
            <FTextField
              key={link.value}
              name={link.value}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{link.icon}</InputAdornment>
                ),
              }}
            />
          ))}
          <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting || isLoading}
        >
          Save Changes
        </LoadingButton>
        </Stack>
        
      </FormProvider>
    </Card>
  );
}

export default AccountSocialLinks;
