import React, { useContext } from "react";
import { useFormik } from "formik";
import api from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  AdditionalButtons,
  AuthButton,
  AuthContainer,
  AuthContent,
  AuthPage,
  BlueText,
  FormError,
  FormInput,
  Logo,
} from "../Theme.jsx";
import { loginSchema } from "../../common/Auth/AuthSchema.jsx";
import UserContext from "../../setup/app-context-manager/UserContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext)

  const onSubmit = async (values, actions) => {
  try {
    const login = await api.login({
      username: values.username,
      password: values.password,
    });
    if (login.status === 200) {
      setUser(login.data)
      const params = new URLSearchParams(window.location.search);
      const paramValue = params.get("redirect");
      navigate(paramValue?paramValue:"/");
      toast.success("You're now logged in!",{toastId: "logged_in"})
    }
  } catch (err) {
    
    actions.resetForm();
    toast.error("Incorrect username or password!",{toastId: "password_wrong"});
  }
  actions.setSubmitting(false);
};

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <AuthPage>
      {/* <ToastContainer /> */}
      <AuthContainer>
        <Logo src="https://upload.wikimedia.org/wikipedia/en/thumb/9/96/Meme_Man_on_transparent_background.webp/316px-Meme_Man_on_transparent_background.webp.png" alt="Logo" />
        <AuthContent>Hey, welcome back!</AuthContent>

        <form onSubmit={handleSubmit}>
          {errors.username && touched.username && (
            <FormError>{errors.username}</FormError>
          )}
          <FormInput
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            id="username"
            type="name"
            placeholder="Username/Email"
            className={errors.username && touched.username ? "input-error" : ""}
          />
            {errors.password && touched.password && (
              <FormError>{errors.password}</FormError>
            )}
          <FormInput
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            id="password"
            type="password"
            placeholder="Password"
            className={errors.password && touched.password ? "input-error" : ""}
          />
          <AuthButton disabled={isSubmitting} type="submit">Sign in</AuthButton>
        </form>
      </AuthContainer>
      <AdditionalButtons>
        <div>
          Don not have an account?{" "}
          <BlueText
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </BlueText>
        </div>
      </AdditionalButtons>
    </AuthPage>
  );
};

export default Login;
