import * as React from 'react'
import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Icon,
  Input,
  Stack,
} from '@chakra-ui/react'
import { CgSmartHomeWashMachine } from 'react-icons/cg'
import { supabase } from '../utils/supabase'

export default function SignIn() {
  const [email, setEmail] = useState<string>('')
  const [submitted, setSubmitted] = useState<boolean>(false)
  const isError = email === ''

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (await signIn())
      setSubmitted(true)
  }

  async function signIn() {
    if (!email) {
      setSubmitted(false)
      return false
    }
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_HOST}`,
      },
    })
    if (error) {
      // eslint-disable-next-line no-console
      console.log('error', error)
      return false
    }
    return true
  }

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
    <Stack spacing="8">
      <Stack spacing="8">
        <HStack spacing="1" justify="center">
        <Icon as={CgSmartHomeWashMachine} boxSize={10} />
        <Heading color={'blue.500'} size={{ base: 'xs', md: 'lg' }}> Berkeley Washing </Heading>
        </HStack>
      </Stack>
      <Box
        py={{ base: '0', sm: '8' }}
        px={{ base: '4', sm: '10' }}
        bg={{ base: 'transparent', sm: 'bg-surface' }}
        boxShadow={{ base: 'none', sm: 'md' }}
        borderRadius={{ base: 'none', sm: 'xl' }}
      >
        <Stack spacing="8">
        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
          <Heading size={{ base: 'xs', md: 'md' }}>Log in to your account</Heading>
        </Stack> { submitted
          ? (<Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'xs', md: 'xs' }}>Please check your mail for a Link</Heading>
          </Stack>) :
        <form onSubmit={event => handleSubmit(event)}>
          <Stack spacing="10">
            <FormControl isRequired isInvalid={isError}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" type="email" placeholder='sportsmasters@berkeley.edu'
               onChange={event => setEmail(event.currentTarget.value)} /> { !isError ? (<FormErrorMessage>Email is required.</FormErrorMessage>) : null }
            </FormControl>
            <Button colorScheme={'blue'} _hover={{
              bg: 'blue.600',
            }} type='submit'>Sign in</Button>
          </Stack>
          </form>
          }
        </Stack>
      </Box>
    </Stack>
  </Container>
  )
}
