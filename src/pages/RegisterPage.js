import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Alert,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Stack,
} from "@mui/material";
import { FTextField, FormProvider } from "../components/form/index";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import useAuth from "../hook/useAuth";
const RegisterSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid Email").required("Email is required"),
    password: yup.string().required("Password is required"),
    passwordconfirm: yup
      .string()
      .required("Please comfirm your password")
      .oneOf([yup.ref("password")], "Password not macth"), // logic confirm password
  })
  .required();
const defauleValues = {
  name: "",
  email: "",
  password: "",
  passwordconfirm: "",
};

function RegisterPage() {
  const auth = useAuth();
  const methods = useForm({
    defauleValues,
    resolver: yupResolver(RegisterSchema),
  });
  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = methods;
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const navigate = useNavigate();
  
  const onSubmit = async (data) => {
    const { name, email, password } = data;
    
    try {
      await auth.register({ name, email, password }, () => {
        navigate("/", { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
          <Alert severity="info">
            I have an account{" "}
            <Link component={RouterLink} to={"/login"}>
              Sign in
            </Link>{" "}
          </Alert>
          <FTextField name="name" label="Full name" />
          <FTextField name="email" label="Email Address" />
          <FTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FTextField
            name="passwordconfirm"
            label="Password Confirmation"
            type={showPasswordConfirm ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            fullWidth
          >
            Register
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default RegisterPage;
