
import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { useState } from 'react'
import { supabase } from '@/utils/supabase'

export default function deleteItem(props: { id: string | null; washtype: string | null}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState<boolean>(false)

  async function handleDelete() {
    setLoading(true)
    console.log('delete', props.id)
    const { error } = await supabase.from('washinglist').delete().eq('id', props.id)
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
    else {
      setLoading(false)
      onClose()
    }
  }

  return (
    <>
      <Icon as={RiDeleteBin5Fill} onClick={onOpen}></Icon>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          Do you really want to remove this <b>{props.washtype}</b> slot?
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='red' isLoading={loading} onClick={() => handleDelete()}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
