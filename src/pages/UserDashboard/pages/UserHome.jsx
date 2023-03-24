import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../../setup/app-context-manager/UserContext';
import "./UserHome.css"
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  FormErrorMessage,
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
const UserHome = () => {
  const { user } = useContext(UserContext);
  const [newUser, setNewUser]= useState(user)
  return (
    <Flex
      minH={'100%'}
      align={'center'}
      justify={'center'}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src="https://imgur.com/IGYWsdz.png"/>
            </Center>
            <Center w="full">
              <Button w={"90%"}>Change Icon</Button>
            </Center> 
          </Stack>
        </FormControl>
        <FormControl id="Name" >
          <FormLabel>Name</FormLabel>
          <Input
            onChange={(e) => {
              setNewUser(existingValues => ({
                ...existingValues,
                name: e.target.value
              }))
            }}
            placeholder="Name"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            />
        </FormControl>
        <FormControl id="userName" >
          <FormLabel>User name</FormLabel>
          <Input
            onChange={(e) => {
              setNewUser(existingValues => ({
                ...existingValues,
                username: e.target.value
              }))
            }}
            placeholder="UserName"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl id="email" >
          <FormLabel>Email address</FormLabel>
          <Input
            onChange={(e) => {
              setNewUser(existingValues => ({
                ...existingValues,
                email: e.target.value
              }))
            }}
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              console.log(newUser)
            }}
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default UserHome