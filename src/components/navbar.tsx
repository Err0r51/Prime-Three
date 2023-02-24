import type { ReactNode } from 'react'
import {
  Box,
  Button,
  Flex,
  Icon,
  Link,
  Menu,
  Stack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { CgSmartHomeWashMachine } from 'react-icons/cg'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabase'
import type { User } from '../types/user'

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
)

export default function Navbartwo({ userobj }: { userobj: User }) {
  const { colorMode, toggleColorMode } = useColorMode()
  const router = useRouter()
  const username = userobj.email

  async function signOut() {
    await supabase.auth.signOut()
    void router.push('/sign-in')
  }

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Icon as={CgSmartHomeWashMachine} boxSize={8} />
        <p>Welcome back, { userobj ? username : 'mysterious stranger' } </p>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <Button
                  as={'a'}
                  display={{ base: 'inline-flex', md: 'inline-flex' }}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'blue.400'}
                  href={'#'}
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
