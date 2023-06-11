import { Box, Card, Stack, alpha } from "@mui/material";
import React, { useCallback, useRef } from "react";
import { FTextField, FUploadImage, FormProvider } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { createPost, updatePost } from "./postSlice";
import { useDispatch } from "react-redux";

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

function UpdatePost({ post, handleClose }) {
  const postId = post._id;
  const defaultValues = {
    content: post.content,
    image: post.image,
  };
  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  // const fileInput = useRef();

  const onSubmit = (data) => {
    dispatch(updatePost({postId,...data}))
    handleClose()
   
  };
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );
  // const handleFile = (e) => {
  //   const file = fileInput.current.files[0]
  //   if(file){
  //     setValue("image",file)
  //   }
  // }
  return (
    <Card sx={{ p: 3 }}>
      <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
        <Stack spacing={2}>
          <FTextField
            name="content"
            multiline
            fullWidth
            rows={4}
            placeholder="Share what you are thinking here..."
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
          />
          {/* <FTextField name="image" placeholder="Share image" /> */}
          {/* <input type="file" ref={fileInput} onChange={handleFile} /> */}

          <FUploadImage
            name="image"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting}
            >
              Save
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default UpdatePost;
