import * as yup from "yup"


export const signupSchema = yup.object().shape({
    username: yup.string("Username is required!").required("Username is required!"),
    email: yup.string().email("Please enter a valid email!").required("Email is required!"),
    password: yup.string().min(7, "Minimum of 7 characters needed!").required("Password is required!"),
    confirm_password: yup.string().oneOf([yup.ref('password'),null],"Passwords must match!").required("Confirm password is required!")
})


export const loginSchema = yup.object().shape({
    username: yup.string("Username is required!").required("Username is required!"),
    password: yup.string("Password is required!").required("Password is required!"),
})