import React, {useRef, useState} from 'react';
import { Button, ButtonGroup, Textarea,  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
const data = require("../../main/exampleDatabase.json")
import Plugin from '../../Plugins/Plugin';
import './EditPluginPage.css'
import { toast } from 'react-toastify';
const EditPluginPage = ({ pluginData }) => {
  let [value, setValue] = useState(pluginData.ProductMarkdown);
  const [changed, setChanged] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  let handleInputChange = (e) => {
  let inputValue = e.target.value;
    setValue(inputValue);
    setChanged(true)
  };
  
  const onSave = (e) => {
    toast.success("Saved your changes!")
    console.log("Saving text here.")
    // TODO: Make API call here
  }
  const resetChanges = (e) => {
    setValue(pluginData.ProductMarkdown)
    onClose()
  }

  window.onbeforeunload = function(e) {
  if( !changed ) {
    return;
  }
  return dialogText;
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
           <Button colorScheme='red' ml={3} onClick={resetChanges}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
     <div className='topContainer topBar '>
       <ButtonGroup>
         
     <Button colorScheme='red'  onClick={onOpen}>Discard Changes</Button>
       <Button colorScheme='green' onClick={onSave} >Save</Button>
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
