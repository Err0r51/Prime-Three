import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { BsPlusCircleDotted } from 'react-icons/bs'
import type { washinglist } from '../types/supabase'
import { supabase } from '../utils/supabase'

export default function AddWashingItem() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [urgency, setUrgency] = useState<string>('')
  const [washingtype, setwashingtype] = useState<string>('')
  const [genderRestriction, setGenderRestriction] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const isError = urgency === '' || washingtype === ''

  function handleToggle() {
    setGenderRestriction(!genderRestriction)
  }

  async function handleSubmit() {
    setLoading(true)
    const urgency = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(Date.now())
    const washingItem: washinglist = {
      restricted: genderRestriction,
      urgency,
      wash_type: washingtype,
    }
    const { error } = await supabase.from('washinglist').insert(washingItem)
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
      <Button fontSize={'sm'}
        fontWeight={600}
        color={'white'}
        bg={'blue.400'} onClick={onOpen}><Icon as={BsPlusCircleDotted} boxSize={4} />New</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new Washing Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired >
            <FormLabel htmlFor='gender-restricted' mb='0'>
                Please select your washing type
              </FormLabel>
              <Select placeholder='Type' value={washingtype} onChange={ev => setwashingtype(ev.target.value)} isRequired>
                <option value='White'>White</option>
                <option value='Underwear'>Underwear</option>
                <option value='Multi Colored-wash'>Multi Colored-wash</option>
                <option value='Sheets & Towels'>Sheets & Towels</option>
              </Select>
              <FormLabel htmlFor='gender-restricted' mb='0'>
                How urgent is this?
              </FormLabel>
              <RadioGroup onChange={setUrgency} value={urgency}>
                <Stack direction='row'>
                  <Radio value='Urgent'>Urgent</Radio>
                  <Radio value='Soon'>Soon</Radio>
                  <Radio value='Coming up'>Coming up</Radio>
                </Stack>
              </RadioGroup>
              <FormLabel htmlFor='gender-restricted' mb='0'>
                Do you want to not want to wash with boys?
              </FormLabel>
              <Switch id='gender-restricted' onChange={handleToggle} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='blue'
              isDisabled={isError}
              isLoading={loading}
              loadingText='Loading'
              spinnerPlacement='start'
              onClick={() => handleSubmit()}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
