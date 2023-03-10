import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Textarea } from '@chakra-ui/react';
import Plugin from '../../Plugins/Plugin';

const Container = styled.div`
 display: flex;
 flex-direction: row;
 gap: 30px;
 margin: 10px;
 @media (max-width: 800px) {
  flex-direction: column;
 }
`;
const TextSide = styled.div`
 flex: 1 1 0;
 height: 100vh;
`;
const PreviewSide = styled.div`
 flex: 1 1 0;
 border: 3px solid #2d2d2d;
 height: 100vh;
`;
const EditPluginPage = ({ pluginData }) => {
 let [value, setValue] = React.useState(pluginData.ProductMarkdown);

 // useEffect(() => {
 //   setValue(pluginData.ProductMarkdown)
 // })

 let handleInputChange = (e) => {
  let inputValue = e.target.value;
  setValue(inputValue);
 };
 return (
   <Container>
     <Button>Save</Button>
   <TextSide>
    <Textarea
     onChange={handleInputChange}
     height={'100vh'}
     resize="none"
     backgroundColor={'white'}
     color={'black'}
     value={value}
    />
   </TextSide>
   <PreviewSide>
    <Plugin pluginData={pluginData} content={value} />
   </PreviewSide>
  </Container>
 );
};

export default EditPluginPage;
