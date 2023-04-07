import {
  Box,
  chakra,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import React from 'react';
import Footer from '../../../../libs/Footer';
import Icons from '../../../../libs/Icons';
import Messages from '../../../../libs/Messages';

const SocialButton = ({
  children,
  label,
  href,
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

export default function LargeFooter() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
          spacing={8}>
          <Stack spacing={6}>
            <Box display={"flex"} alignItems={"center"}>
              <Image src={Footer.LogoPath} width='45px' />
              <Text ml={ 4} fontSize={"lg"}>{Messages.BrandName}</Text>
            </Box>
            <Text fontSize={'sm'}>{ Footer.CopyrightText}</Text>
            <Stack direction={'row'} spacing={6}>
              {Footer.Socials.map((social) => {
                return (
                  <SocialButton label={social.label} href={social.link}>
                    <Icons.GetIconFromString nameIcon={social.icon} />
                  </SocialButton>
                )
              })}
            </Stack>
          </Stack>
          {Footer.Links.map((link) => {
            return (
              <Stack align={'flex-start'}>
                <ListHeader>{link.Header}</ListHeader>                
                {link.Links.map((button) => {
                  return (
                    <Link href={button.href}>{button.name}</Link>
                  )
                })}

              </Stack>
                )
              })}
        </SimpleGrid>
      </Container>
    </Box>
  );
}