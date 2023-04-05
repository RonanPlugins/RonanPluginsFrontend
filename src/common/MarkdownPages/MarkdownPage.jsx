import React from 'react'
import "./MarkdownPage.css"
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeFormat from 'rehype-format'
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import { Flex, Stack, useColorModeValue } from '@chakra-ui/react';

const MarkdownPage = ({ content }) => {
  const testcontent = "# Hello"
  return (
          <Flex
        minH={'100%'}
        align={'center'}
        direction={"column"}
        justify={'center'}
      >
      
       <Stack
          spacing={4}
          w={'full'}
          maxW={'5xl'}
          bg={useColorModeValue('gray.50', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={10}
          mt={12}>
      <ReactMarkdown
              className='reactMarkdown'
              remarkPlugins={[remarkGfm, remarkBreaks]}
              rehypePlugins={[rehypeRaw,rehypeFormat]}
              children={content}
              />
          </Stack>
              </Flex>
  )
}

export default MarkdownPage