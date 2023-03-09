import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Menu,
  Stack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { CgSmartHomeWashMachine } from 'react-icons/cg'
import { FaUserCircle } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { useUser } from '@supabase/auth-helpers-react'
import { supabase } from '../utils/supabase'
import type { Database } from '../types/supabase'
type Profiles = Database['public']['Tables']['profiles']['Row']

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const router = useRouter()
  const user = useUser()
  const [username, setUsername] = useState<Profiles['username']>(null)

  useEffect(() => {
    getProfile()
  }, [user])

  async function getProfile() {
    try {
      if (!user)
        throw new Error('No user')

      const { data, error, status } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single()

      if (error && status !== 406)
        throw error

      if (!data?.username)
        void router.push('/account')

      if (data)
        setUsername(data.username)
    }
    catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
    void router.push('/sign-in')
  }

  async function toHome() {
    void router.push('/')
  }

  async function toAccount() {
    void router.push('/account')
  }

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Flex alignItems={'center'} cursor="pointer" onClick={toHome} >
            <Icon as={CgSmartHomeWashMachine} boxSize={8} />
            <Heading size={'md'}>Berkeley Washing</Heading>
          </Flex> {username ? <p>Welcome {username} </p> : <p>Please setup your account</p>}
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={3}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Button onClick={toAccount}><FaUserCircle></FaUserCircle></Button>

              <Menu>
                <Button
                  as={'a'}
                  display={{ base: 'inline-flex', md: 'inline-flex' }}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'blue.400'}
                  _hover={{
                    bg: 'blue.600',
                  }} onClick={signOut}>
                  Sign Out
                </Button>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
