import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./Auth.css"
import { toast } from "react-toastify";
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
    <div className="AuthPage">
      {/* <ToastContainer /> */}
      <div className="AuthContainer">
        <img className="Logo" src="/assets/logo.webp" alt="Logo" />
        <p className="AuthContent">Hey, you are new here!</p>

        <form onSubmit={handleSubmit}>

          {/* {errors.firstName && touched.firstName && (
            <p className="FormError">{errors.firstName}</p>
          )}
          <input
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            id="firstName"
            type="name"
            placeholder="First Name"
            className={errors.firstName && touched.firstName ? "input-error" : "FormInput"}
          />
          {errors.lastName && touched.lastName && (
            <p className="FormError">{errors.lastName}</p>
          )}
          <input
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            id="lastName"
            type="name"
            placeholder="Last Name"
            className={errors.lastName && touched.lastName ? "input-error" : "FormInput"}
          /> */}

          {errors.username && touched.username && (
            <p className="FormError">{errors.username}</p>
          )}
          <input
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            id="username"
            type="name"
            placeholder="Username"
            className={errors.username && touched.username ? "input-error" : "FormInput"}
          />
          {errors.email && touched.email && (
            <p className="FormError">{errors.email}</p>
          )}
          <input
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            id="email"
            type="email"
            placeholder="Email"
            className={errors.email && touched.email ? "input-error" : "FormInput"}
          />

          {errors.password && touched.password && (
            <p className="FormError">{errors.password}</p>
          )}
          <input
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            id="password"
            type="password"
            placeholder="Password"
            className={errors.password && touched.password ? "input-error" : "FormInput"}
          />

          {errors.confirm_password && touched.confirm_password && (
            <p className="FormError">{errors.confirm_password}</p>
          )}
          <input
            value={values.confirm_password}
            onChange={handleChange}
            onBlur={handleBlur}
            id="confirm_password"
            type="password"
            placeholder="Confirm Password"
            className={
              errors.confirm_password && touched.confirm_password
                ? "input-error"
                : "FormInput"
            }
          />

          <button className="AuthButton" disabled={isSubmitting} type="submit">
            Sign up
          </button>
        </form>
      </div>
      <div className="AdditionalButtons">
        <div>
          Already have an account?{" "}
          <p className="BlueText"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
