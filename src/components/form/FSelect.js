import { TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const FSelect = ({ name, children, ...other }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          select
          SelectProps={{ native: true }}
          error={error?.message}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
};

export default FSelect;
