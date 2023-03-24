import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
    ModalCloseButton,
    useDisclosure,
  Button,
} from '@chakra-ui/react'
import React from 'react'

const BetaPopup = () => {

  // TODO: Remove before prod
  const OPEN_ON_REFRESH = false

  const { isOpen, onOpen, onClose } = useDisclosure({defaultIsOpen: OPEN_ON_REFRESH})

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>⚠️ Page In Development ⚠️</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           This website is currently in development. Please understand their may be bugs and issues with this site. If you would like to contact us please do so at https://discord.com/invite/8Kt4wKm
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default BetaPopup