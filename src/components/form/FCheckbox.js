import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const FCheckbox = ({ name, ...other }) => {
  const { control } = useFormContext();
  return (
    <FormControlLabel
      {...other}
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Checkbox {...field} checked={field.value} />}
        />
      }
    />
  );
};

export default FCheckbox;
