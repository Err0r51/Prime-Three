import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Flex,
} from '@chakra-ui/react'
import { supabase } from '../utils/supabase'
import type { Database } from '../types/supabase'
import type { match } from '@/types/match'
import WashingTable from '@/components/washingtable'
import AddWashingItem from '@/components/addwashingitem'
type washinglist = Database['public']['Tables']['washinglist']['Row']

export default function Overview() {
  // const [loading, setLoading] = useState<boolean>(true)
  const [profile, setProfile] = useState<any>(null)
  const router = useRouter()
  const [washinglist, setWashinglist] = useState<washinglist[]>([])
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

  const getWashinglist = useCallback(async () => {
    const { data, error } = await supabase.from('washinglist').select()
    if (!error && data) {
      // console.log({ data })
      setWashinglist(data)
    }
    else {
      setWashinglist([])
    }
  }, [])

  useEffect(() => {
    getWashinglist()
  }, [getWashinglist])

  const getMatchingItems = async () => {
    const { data, error } = await supabase.rpc('find_matching_washings', { user_id_input: '' })
    if (!error && data) {
      // console.log({ error })
      setMatchinglist(data)
      // console.log(matchinglist)
    }
    else {
      // eslint-disable-next-line no-console
      console.log({ error })
    }
  }

  useEffect(() => {
    // TODO: Make this nicer
    getMatchingItems()
    for (let i = 0; i < washinglist.length; i++) {
      const obj1 = washinglist[i]
      const obj2 = matchinglist.find(obj => obj.id === obj1.id)
      if (obj2)
        obj1.other_user_id = obj2.other_user_id
    }
    setWashinglist(washinglist)
    // eslint-disable-next-line no-console
    console.log(washinglist)
  }, [])

  if (!profile)
    return null

  return (
    <div>
      <WashingTable washinglist={washinglist} getWashinglist={getWashinglist} />
      <Flex justify="center" align="center" mt={10}>
        <AddWashingItem getWashinglist={getWashinglist} />
      </Flex>
    </div>
  )
}
