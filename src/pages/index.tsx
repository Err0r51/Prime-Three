import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Flex } from '@chakra-ui/react'
import { useUser } from '@supabase/auth-helpers-react'
import { supabase } from '../utils/supabase'
import type { match } from '@/types/match'
import type { Database } from '@/types/supabase'
import Navbar from '@/components/navbar'
import WashingTable from '@/components/washingtable'
import AddWashingItem from '@/components/addwashingitem'
type washinglist = Database['public']['Functions']['find_matching_washings']

export default function Overview() {
  const [profile, setProfile] = useState<any>(null)
  const router = useRouter()
  const user = useUser()
  const [matchinglist, setMatchinglist] = useState<match[]>([])

  useEffect(() => {
    async function fetchProfile() {
      const session = await supabase.auth.getUser()
      if (!session.data.user)
        void router.push('/sign-in')
      else
        setProfile(session)
    }
    fetchProfile()
  }, [])

  const getMatchingItems = useCallback(async () => {
    // @ts-expect-error still figuring out this one
    const { data, error } = await supabase.rpc<washinglist, never>('find_matching_washings', { user_id_input: user!.id })
    if (!error && data) {
      setMatchinglist(data)
    }
    else {
      // eslint-disable-next-line no-console
      console.log({ error })
    }
  }, [])

  useEffect(() => {
    getMatchingItems()
  }, [])

  if (!profile)
    return null

  return (
    <div>
      <Navbar />
      <WashingTable washinglist={matchinglist} getWashinglist={getMatchingItems} />
      <Flex justify="center" align="center" mt={10}>
        <AddWashingItem getWashinglist={getMatchingItems} />
      </Flex>
    </div>
  )
}
