
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
    InputGroup,
    InputRightElement,
    Link,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import Links from '../../libs/Links';
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import api from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signupSchema } from "../../common/Auth/AuthSchema.jsx";
import UserContext from "../../setup/app-context-manager/UserContext.jsx";
import Icons from '../../libs/Icons';


const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { setUser } = useContext(UserContext)

    const onSubmit = async (values, actions) => {
        try {
            const signup = await api.signup({
                firstName: values.firstName,
                lastName: values.lastName,
                username: values.username,
                email: values.email,
                password: values.password,
            });
            if (signup.status === 200) {
                navigate("/login");
                toast.success("Account Created! Please login.", { toastId: "accountcreated" });
            }
        } catch (err) {
            let toastMsg = "Invalid Username or Password";
            if (err.response.status === 409) {
                toastMsg = "Username or email already in use!";
            }
            toast.error(toastMsg, { toastId: "signuperror" });
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
            username: "",
            email: "",
            password: "",
        },
        validationSchema: signupSchema,
        onSubmit,
    });


    return (
        <form onSubmit={handleSubmit}>

            <Flex
                align={'center'}
                justify={'center'}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} w={"500px"}>
                    <Stack align={'center'}>
                        <Image src='/assets/logo.webp' width={"100px"} />
                        <Heading fontSize={'4xl'}>Create your account</Heading>
                        <Text color="blue.500" as={"a"} href={Links.Login}>Have an account?</Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>

                            <FormControl id="username" isInvalid={errors.username && touched.username}>
                                <FormLabel>Username</FormLabel>
                                <Input id="username" type="username" onChange={handleChange} value={values.username} onBlur={handleBlur} />
                                <FormErrorMessage>{errors.username}</FormErrorMessage>
                            </FormControl>

                            <FormControl id="email" isInvalid={errors.email && touched.email}>
                                <FormLabel>Email</FormLabel>
                                <Input id="email" type="email" onChange={handleChange} value={values.email} onBlur={handleBlur} />
                                <FormErrorMessage>{errors.email}</FormErrorMessage>
                            </FormControl>

                            <FormControl id="password" isInvalid={errors.password && touched.password}>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input id='password' onChange={handleChange} value={values.password} onBlur={handleBlur} type={showPassword ? 'text' : 'password'} />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowPassword((showPassword) => !showPassword)
                                            }>
                                            {showPassword ? <Icons.GetIconFromString nameIcon={"GrFormView"} /> : <Icons.GetIconFromString nameIcon={"GrFormViewHide"} />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
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

export default SignUp;
