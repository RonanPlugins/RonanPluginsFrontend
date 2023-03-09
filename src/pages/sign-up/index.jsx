import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { toast } from "react-toastify";
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
import { signupSchema } from "../../common/Auth/AuthSchema.jsx";

const SignUp = () => {
  const navigate = useNavigate();
const onSubmit = async (values, actions) => {
  try {
    const signup = await api.signup({
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      email: values.email,
      password: values.password,
    });
    if (signup.status == 200) {
      navigate("/login");
      toast.success("Account Created! Please login.",{toastId: "accountcreated"});
    }
  } catch (err) {
    let toastMsg = "Invalid Username or Password";
    if (err.response.status == 409) {
      toastMsg = "Username or email already in use!";
    }
    toast.error(toastMsg,{toastId: "signuperror"});
    //console.error(err);
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
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: signupSchema,
    onSubmit,
  });

  return (
    <AuthPage>
      {/* <ToastContainer /> */}
      <AuthContainer>
        <Logo src="https://upload.wikimedia.org/wikipedia/en/thumb/9/96/Meme_Man_on_transparent_background.webp/316px-Meme_Man_on_transparent_background.webp.png" alt="Logo" />
        <AuthContent>Hey, you are new here!</AuthContent>

        <form onSubmit={handleSubmit}>

          {errors.firstName && touched.firstName && (
            <FormError>{errors.firstName}</FormError>
          )}
          <FormInput
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            id="firstName"
            type="name"
            placeholder="First Name"
            className={errors.firstName && touched.firstName ? "input-error" : ""}
          />
          {errors.lastName && touched.lastName && (
            <FormError>{errors.lastName}</FormError>
          )}
          <FormInput
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            id="lastName"
            type="name"
            placeholder="Last Name"
            className={errors.lastName && touched.lastName ? "input-error" : ""}
          />

          {errors.username && touched.username && (
            <FormError>{errors.username}</FormError>
          )}
          <FormInput
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            id="username"
            type="name"
            placeholder="Username"
            className={errors.username && touched.username ? "input-error" : ""}
          />
          {errors.email && touched.email && (
            <FormError>{errors.email}</FormError>
          )}
          <FormInput
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            id="email"
            type="email"
            placeholder="Email"
            className={errors.email && touched.email ? "input-error" : ""}
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

          {errors.confirm_password && touched.confirm_password && (
            <FormError>{errors.confirm_password}</FormError>
          )}
          <FormInput
            value={values.confirm_password}
            onChange={handleChange}
            onBlur={handleBlur}
            id="confirm_password"
            type="password"
            placeholder="Confirm Password"
            className={
              errors.confirm_password && touched.confirm_password
                ? "input-error"
                : ""
            }
          />

          <AuthButton disabled={isSubmitting} type="submit">
            Sign up
          </AuthButton>
        </form>
      </AuthContainer>
      <AdditionalButtons>
        <div>
          Already have an account?{" "}
          <BlueText
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </BlueText>
        </div>
      </AdditionalButtons>
    </AuthPage>
  );
};

export default SignUp;
