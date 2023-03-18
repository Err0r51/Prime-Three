import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Flex } from '@chakra-ui/react'
import { useUser } from '@supabase/auth-helpers-react'
import { supabase } from '../utils/supabase'
import type { match } from '@/types/match'
import Navbar from '@/components/navbar'
import WashingTable from '@/components/washingtable'
import AddWashingItem from '@/components/addwashingitem'

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
        console.log(session)
    }
    fetchProfile()
  }, [user])

  const getMatchingItems = useCallback(async () => {
    if (!user)
      return
    const { data, error } = await supabase.rpc('find_matching_washings', { user_id_input: user!.id })
    if (!error && data) {
      setMatchinglist(data)
    }
    else {
      // eslint-disable-next-line no-console
      console.log({ error })
    }
  }, [user])

  useEffect(() => {
    getMatchingItems()
  }, [user])

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
