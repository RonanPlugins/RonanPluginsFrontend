import React from 'react';
import ReactMarkdown from 'react-markdown';

import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';

import styled from 'styled-components';

export const PluginContainer = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 align-content: center;
 text-align: center;
`;
export const ReactMarkdownStyles = styled(ReactMarkdown)`
 display: flex;
 align-items: center;
 justify-content: center;
 /* border: 3px solid #2d2d2d; */
 img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
 }

 iframe {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  aspect-ratio: 16/9;
  height: auto;
 }
`;
const Plugin = ({ pluginData,content }) => {
 return (
  <PluginContainer>
   {/* Plugin Name = {pluginData.ProductName} */}
   <ReactMarkdownStyles
    remarkPlugins={[remarkGfm, remarkBreaks]}
    rehypePlugins={[rehypeRaw]}
    children={content}
   />
  </PluginContainer>
 );
};

export default Plugin;
