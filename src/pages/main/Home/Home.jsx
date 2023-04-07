import React from 'react'
import "./Home.css"
import Icons from "../../../libs/Icons";
import Messages from '../../../libs/Messages'
import Links from '../../../libs/Links'
import Hero from './Hero'

import { Tabs, TabList, TabPanels, Tab, TabPanel,Tooltip, Box, Flex, Text, Button, useColorModeValue, Center, Stack, Heading, Container  } from '@chakra-ui/react'

const Home = () => {
  return (

    <div className='HomeContainer'>
      <Hero/>
      <Box className='Features' bg={useColorModeValue('gray.50','gray.500')} py={"20px"}>
      {/* <div className='Features'> */}
        {Messages.Features.map((feature) => {
          return (
             <div className='Feature'>
                  <div className='Icon'><Icons.GetIconFromString nameIcon={feature.Icon} propsIcon={{size:50}}/></div>
                  <div className='Text'>{feature.Title}</div>
                  <div className='Description'>{feature.Description}</div>
                </div>
          )
        })}
      </Box>
      


      <Container minW={'100%'} bg={useColorModeValue('white','gray.500')} mt={"50px"}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 20 }}
        >
                  <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          Amazing {' '}
          <Text as={'span'} color={'orange.400'}>
            support
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
          Need some assistance? Join our official discord and ask away!
        </Text>
        <Stack spacing={6} direction={'row'}>
          <Button
              rounded={'full'}
              as={"a"}
              href={Links.Discord}
              rightIcon={<Icons.GetIconFromString nameIcon={"FiExternalLink"} />}
            px={6}
            colorScheme={'orange'}
            bg={'orange.400'}
            _hover={{ bg: 'orange.500' }}>
            Join Discord
          </Button>

        </Stack>
      </Stack>
    </Container>
      </div>
  )
}

export default Home