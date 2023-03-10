import React, { useContext } from "react";
import { useFormik } from "formik";
import api from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Auth.css"
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
    <div className="AuthPage">
      {/* <ToastContainer /> */}
      <div className="AuthContainer">
        <img className="Logo" src="https://upload.wikimedia.org/wikipedia/en/thumb/9/96/Meme_Man_on_transparent_background.webp/316px-Meme_Man_on_transparent_background.webp.png" alt="Logo" />
        <p className="AuthContent">Hey, welcome back!</p>

        <form onSubmit={handleSubmit}>
          {errors.username && touched.username && (
            <p className="FormError">{errors.username}</p>
          )}
          <input
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            id="username"
            type="name"
            placeholder="Username/Email"
            className={errors.username && touched.username ? "input-error" : "FormInput"}
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
          <button className="AuthButton" disabled={isSubmitting} type="submit">Sign in</button>
        </form>
      </div>
      <div className="AdditionalButtons">
        <div>
          Don not have an account?{" "}
          <p className="BlueText"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
