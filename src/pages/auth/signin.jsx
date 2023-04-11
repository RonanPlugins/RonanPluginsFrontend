
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import Links from '../../libs/Links';
import React, { useContext } from "react";
import { useFormik } from "formik";
import api from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
        navigate(paramValue ? paramValue : "/");
        toast.success("You're now logged in!", { toastId: "logged_in" })
      }
    } catch (err) {
      actions.resetForm();
      toast.error("Incorrect username or password!", { toastId: "password_wrong" });
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
    <form onSubmit={handleSubmit} id='login'>

      <Flex
        align={'center'}
        justify={'center'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} w={"500px"}>
          <Stack align={'center'}>
            <Image src='/assets/logo.webp' width={"100px"} />
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text color="blue.500" as={"a"} href={Links.SignUp}>Create an account</Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email" isInvalid={errors.username && touched.username}>
                <FormLabel>Username</FormLabel>
                <Input id="username" type="username" onChange={handleChange} value={values.username} onBlur={handleBlur} autoComplete='username'/>
                <FormErrorMessage>{errors.username}</FormErrorMessage>
              </FormControl>
              <FormControl id="password" isInvalid={errors.password && touched.password}>
                <FormLabel>Password</FormLabel>
                <Input id="password" type="password" onChange={handleChange} value={values.password} onBlur={handleBlur} autoComplete='current-password'/>
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                </Stack>
                <Button
                  bg={'blue.400'}
                  disabled={isSubmitting}
                  type="submit"
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>

  );
}

export default Login;
