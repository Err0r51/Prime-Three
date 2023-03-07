import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Flex,
} from '@chakra-ui/react'
import { supabase } from '../utils/supabase'
import type { match } from '@/types/match'
// import { Database } from '@/types/supabase'
import WashingTable from '@/components/washingtable'
import AddWashingItem from '@/components/addwashingitem'
// type washinglist = Database['public']['Functions']['washinglist']['Insert']

export default function Overview() {
  const [profile, setProfile] = useState<any>(null)
  const router = useRouter()
  const [matchinglist, setMatchinglist] = useState<match[]>([])

  useEffect(() => {
    async function fetchProfile() {
      const session = await supabase.auth.getUser()
      if (!session.data.user)
        void router.push('/sign-in')
      else
        setProfile(session)
        // console.log(profile.data.user.id)
    }
    fetchProfile()
  }, [])

  const getMatchingItems = useCallback(async () => {
    // TODO: Get user id from table
    const session = await supabase.auth.getUser()
    const userId = session.data.user?.id
    const { data, error } = await supabase.rpc<never, never>('find_matching_washings', { user_id_input: userId })
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
      <WashingTable washinglist={matchinglist} getWashinglist={getMatchingItems} />
      <Flex justify="center" align="center" mt={10}>
        <AddWashingItem getWashinglist={getMatchingItems} />
      </Flex>
    </div>
  )
}
