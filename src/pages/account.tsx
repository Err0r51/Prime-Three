import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, Icon, Input, Stack, StackDivider, Switch, Text, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import type { Session } from '@supabase/auth-helpers-react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { BsPencilFill } from 'react-icons/bs'
import type { Database } from '../types/supabase'
type Profiles = Database['public']['Tables']['profiles']['Row']

export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const toast = useToast()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<Profiles['username']>(null)
  const [gender, setGender] = useState<Profiles['gender']>('male')
  const [changing, setChanging] = useState<boolean>(false)

  function isChanging() {
    setChanging(!changing)
  }

  useEffect(() => {
    getProfile()
  }, [session])

  function handleGenderChange() {
    if (gender === 'male')
      setGender('female')
    else
      setGender('male')
  }

  async function getProfile() {
    try {
      setLoading(true)
      if (!user)
        throw new Error('No user')

      const { data, error, status } = await supabase
        .from('profiles')
        .select('username, gender')
        .eq('id', user.id)
        .single()

      if (error && status !== 406)
        throw error

      if (data) {
        setUsername(data.username)
        setGender(data.gender)
      }
    }
    catch (error) {
      // eslint-disable-next-line no-alert
      alert('Error loading user data!')
      // eslint-disable-next-line no-console
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    username,
    gender,
  }: {
    username: Profiles['username']
    gender: Profiles['gender']
  }) {
    try {
      setLoading(true)
      if (!user)
        throw new Error('No user')

      const updates = {
        id: user.id,
        username,
        gender,
        updated_at: new Date().toISOString(),
      }

      const { error } = await supabase.from('profiles').upsert(updates)
      if (error)
        throw error
    }
    catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <Flex p="5" justify="center" align="content-center">

      <Card minWidth={'md'} >
        <CardHeader>
          <Heading size='md'>User Account</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Username
              </Heading>
              {changing ?
                <Input id="username" type="text" value={username || ''} onChange={e => setUsername(e.target.value)} />
                :
                <Flex alignItems={'center'} justifyContent={'space-between'}>
                  <Text pt='3' fontSize='sm'>
                    {username || 'No username set'}
                  </Text>
                  <Icon as={BsPencilFill} pt='1' onClick={isChanging} />
                </Flex>
              }
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Gender
              </Heading>
              <Flex alignItems={'center'} justifyContent={'space-between'}>
                <Switch pt={3} id='gender' onChange={handleGenderChange} />
                {gender}
              </Flex>
            </Box>
            <Button
              className="button primary block"
              onClick={() => {
                updateProfile({ username, gender })
                toast({ title: 'Profile updated', status: 'success', duration: 3000, isClosable: true })
              }}
              disabled={loading}
              color={'white'}
              bg={'blue.400'}
              _hover={{
                bg: 'blue.600',
              }}
            >
              {loading ? 'Loading ...' : 'Update'}
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </Flex>
  )
}
