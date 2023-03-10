import React, { useRef} from 'react';
import { Button, ButtonGroup, Textarea,  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import Plugin from '../../Plugins/Plugin';
import './EditPluginPage.css'
const EditPluginPage = ({ pluginData }) => {
  let [value, setValue] = React.useState(pluginData.ProductMarkdown);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

 let handleInputChange = (e) => {
  let inputValue = e.target.value;
  setValue(inputValue);
 };
 return (
   <>
     <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to discard your changes?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='red' ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
     <div className='topContainer topBar '>
       <ButtonGroup>
         
     <Button colorScheme='red' onClick={onOpen}>Discard Changes</Button>
       <Button colorScheme='green' >Save</Button>
       </ButtonGroup>
       
     </div>
   <div className='EditPluginPagecontainer'>
   <div className='textSide'>
    <Textarea
     onChange={handleInputChange}
     height={'100vh'}
     resize="none"
     backgroundColor={'white'}
     color={'black'}
     value={value}
     />
   </div>
   <div className='previewSide'>
    <Plugin pluginData={pluginData} content={value} />
   </div>
  </div>
     </>
 );
};

export default EditPluginPage;
