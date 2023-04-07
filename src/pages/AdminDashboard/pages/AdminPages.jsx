import React, { useEffect, useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Stack,
  useColorModeValue,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  FormControl,
  Divider,
  FormLabel,
  FormHelperText,
  Input,
  Flex,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react'

import "./AdminPages.css"

import api from '../../../api'
import { useContext } from 'react'
import UserContext from '../../../setup/app-context-manager/UserContext'
import EditPage from './EditPage/EditPage'
import { Field, Form, Formik, useFormik } from 'formik'
import MDEditor from '@uiw/react-md-editor'
import { toast } from 'react-toastify'
function EditPageModal({ isOpen, onOpen, onClose, page }) {
  if(!page) return onClose
  const [newContent, setNewContent] = useState(page.markdown);
  let handleInputChange = (e) => {
    setNewContent(e);
  };

  window.onbeforeunload = function (e) {
    if (!changed) {
      return;
    }
    return dialogText;
  };

  const onSubmit = async (values, actions) => {    
    api.editPage({ name: page.name, markdown: values.markdown }).then((res) => {
      if (res.status === 201) {
        onClose()
        setNewContent(null)
        actions.setSubmitting(false);
        toast.success("Page has been successfully changed", { toastId: "page_edited" })
      } else if (res.status === 403) {
        onClose()
        toast.error("You're lacking permissions to edit this page.",{toastId: "page_edited_noperm"})
      } else {
        onClose()
        toast.error("An error occurred while saving the page.",{toastId: "page_edited_error"})
      }
    })


  };


  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    isSubmitting,
    setFieldValue,
  } = useFormik({
     enableReinitialize: true,
    initialValues: {
      name: page?.name,
      route: page?.route,
      markdown: page?.markdown
    },
    onSubmit,
  });


  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
        <form onSubmit={handleSubmit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Page</ModalHeader>
            <ModalBody>
              <Flex direction={"row"}>
                <FormControl isDisabled className="Field">
                  <FormLabel>Page Name</FormLabel>
                  <Input
                    value={values.name}
                    placeholder="Name"

                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='name' />
                </FormControl>

                <FormControl isDisabled className="Field">
                  <FormLabel>Page Route</FormLabel>
                  <InputGroup>
                    <InputLeftAddon children="https://ronanplugins.com" />
                    <Input
                      value={values.route}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Route"
                      id='route' />
                  </InputGroup>
                </FormControl>
              </Flex>
              <Divider />
              <div className="EditPageContainer" data-color-mode="light">
                <MDEditor
                  id='markdown'
                  color="white"
                  className="MDEditor"
                  height={"70vh"}
                  value={values.markdown}
                  onChange={(e) => {
                    setFieldValue('markdown',e)
                  }}
                  // onBlur={handleBlur}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="green" mr={3} isLoading={isSubmitting} type="submit">
                Save Page
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}



const AdminPages = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { pages, setPages } = useContext(UserContext)
  const [editPage, setEditPage] = useState(null)
  return (
    <div>
      <EditPageModal isOpen={isOpen} onClose={onClose} page={editPage} />

      <Stack
        spacing={4}
        maxW={'full'}
        bg={useColorModeValue('gray.50', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={10}
        mt={12}>

        {/* <TableContainer> */}
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Slug</Th>
              <Th>Edit</Th>
            </Tr>
          </Thead>
          <Tbody>

            {pages.map((page) => {
              return (
                <Tr>
                  <Td>{page.name}</Td>
                  <Td>{page.route}</Td>
                  <Td><Button onClick={(e) => {
                    setEditPage(page)
                    onOpen()
                  }}>Edit Page</Button></Td>
                </Tr>
              )
            })}

          </Tbody>

        </Table>
        {/* </TableContainer> */}
      </Stack>
    </div>
  )
}

export default AdminPages