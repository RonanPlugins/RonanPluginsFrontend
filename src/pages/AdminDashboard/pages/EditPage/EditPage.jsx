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
import MDEditor from '@uiw/react-md-editor';
import './EditPage.css'
import { toast } from 'react-toastify';
const EditPage = ({ content,onSaveMain }) => {
  let [value, setValue] = useState(content);
  const [changed, setChanged] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  let handleInputChange = (e) => {
    setValue(e);
    setChanged(true)
  };
  
  const onSave = (e) => {
    onSaveMain(value)
    toast.success("Saved your changes!")
    // TODO: Make API call here
  }
  const resetChanges = (e) => {
    setValue(content)
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
   <div className='EditPageContainer'>
       <MDEditor
         className='MDEditor'
         height={"80vh"}
        value={value}
        onChange={handleInputChange}
      />
  </div>
     <div className='topContainer topBar '>
       <ButtonGroup>
         
     <Button colorScheme='red'  onClick={onOpen}>Discard Changes</Button>
       <Button colorScheme='green' onClick={onSave} >Save</Button>
       </ButtonGroup>
       
     </div>
     </>
 );
};

export default EditPage;
