import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import "./Hero.css"
import Links from '../../../libs/Links';
import Messages from '../../../libs/Messages';

export default function Hero() {
  return (
    <Stack minH={'50vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={4} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text fontWeight={"100"}>
              {Messages.BrandName}
            </Text>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}>
              Where creativity meets
            </Text>
            <br />{' '}
            <Text color={'blue.400'} as={'span'}>
             functionality
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            {Messages.HomeSubText}
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                      <Button
                          as={"a"}
                          href={Links.Plans}
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              View Plans
            </Button>
            <Button rounded={'full'} as={"a"} href={Links.Login}>Login</Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          width={"700px"}
                  className='heroImage'
          alt={'Hero Image'}
          src={
            '/assets/homethingy.png'
          }
        />
      </Flex>
    </Stack>
  );
}