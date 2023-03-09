import {
  Box,
  Button,
  Flex,
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
import type { Database } from '../types/supabase'
import { supabase } from '../utils/supabase'
type washinglist = Database['public']['Tables']['washinglist']['Insert']

export default function AddWashingItem(props: { getWashinglist: () => void }) {
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
    // setLoading(true)
    const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', timeZone: 'America/Los_Angeles' } as const
    const currentDate: Date = new Date(Date.now())
    const requiredDate = Urgency()

    function Urgency() {
      let newDate: Date = new Date()
      switch (urgency) {
        case 'Urgent':
          newDate = addTime(currentDate, 6)
          return newDate
        case 'Soon':
          newDate = addTime(currentDate, 24)
          return newDate
        case 'Coming up':
          newDate = addTime(currentDate, 48)
          return newDate
      }
    }

    function addTime(date: Date, hours: number) {
      const newDate = new Date(date)
      newDate.setTime(date.getTime() + (hours * 60 * 60 * 1000))
      return newDate
    }

    const washingItem: washinglist = {
      restricted: genderRestriction,
      urgency: new Intl.DateTimeFormat('en-US', dateOptions).format(requiredDate).toString(),
      wash_type: washingtype,
      created_at: new Intl.DateTimeFormat('en-US', dateOptions).format(currentDate).toString(),
    }
    const { error } = await supabase.from('washinglist').insert(washingItem)
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
    else {
      setLoading(false)
      props.getWashinglist()
      onClose()
    }
  }

  return (
    <>
      <Button size={'lg'} fontSize={'sm'}
        fontWeight={600}
        color={'white'}
        bg={'blue.400'} onClick={onOpen}><Icon as={BsPlusCircleDotted} marginRight={2} boxSize={4} />New</Button>

      <Modal isOpen={isOpen} onClose={onClose} size='lg'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new Washing Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction='column' pt={2} justifyContent={'flex-end'}>
              <FormControl isRequired >
                <Box mb="5">
                  <FormLabel fontSize={'lg'} htmlFor='gender-restricted' mb='0'>
                    Please select your washing type
                  </FormLabel>
                  <Select placeholder='Type' value={washingtype} onChange={ev => setwashingtype(ev.target.value)} isRequired>
                    <option value='White'>White</option>
                    <option value='Underwear'>Underwear</option>
                    <option value='Multi Colored-wash'>Multi Colored</option>
                    <option value='Sheets & Towels'>Sheets & Towels</option>
                  </Select>
                </Box>
                <Box mb="5">
                  <FormLabel fontSize={'lg'} htmlFor='gender-restricted' mb='0'>
                    How urgent is this?
                  </FormLabel>
                  <RadioGroup onChange={setUrgency} value={urgency}>
                    <Stack direction='row'>
                      <Radio value='Urgent'>Urgent</Radio>
                      <Radio value='Soon'>Soon</Radio>
                      <Radio value='Coming up'>Coming up</Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
                <FormLabel fontSize={'lg'} htmlFor='gender-restricted' mb='0'>
                  Do you want to to wash with the boys?
                </FormLabel>
                <Switch id='gender-restricted' onChange={handleToggle} />  {genderRestriction ? 'No' : 'Yes'}
              </FormControl>

            </Flex>
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
