import React from 'react';
import ReactMarkdown from 'react-markdown';
import "./Plugin.css"
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';


const Plugin = ({ pluginData,content }) => {
 return (
  <div className='PluginContainer'>
         <ReactMarkdown
             className='ReactMarkdownStyles'
    remarkPlugins={[remarkGfm, remarkBreaks]}
    rehypePlugins={[rehypeRaw]}
    children={content}
   />
  </div>
 );
};

export default Plugin;
