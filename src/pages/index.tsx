import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Flex,
} from '@chakra-ui/react'
import { supabase } from '../utils/supabase'
import type { Database } from '../types/supabase'
import WashingTable from '@/components/washingtable'
import AddWashingItem from '@/components/addwashingitem'
type washinglist = Database['public']['Tables']['washinglist']['Row']

export default function Overview() {
  // const [loading, setLoading] = useState<boolean>(true)
  const [profile, setProfile] = useState<any>(null)
  const router = useRouter()
  const [washinglist, setWashinglist] = useState<washinglist[]>([])

  useEffect(() => {
    void fetchProfile()
  }, [])

  async function fetchProfile() {
    const session = await supabase.auth.getUser()
    if (!session.data.user)
      void router.push('/sign-in')
    else
      setProfile(session)
  }

  const getWashinglist = useCallback(async () => {
    const { data, error } = await supabase.from('washinglist').select()
    if (!error && data)
      setWashinglist(data)
    else
      setWashinglist([])
  }, [])

  useEffect(() => {
    getWashinglist()
  }, [getWashinglist])

  const getMatchingItems = async () => {
    const { data, error } = await supabase.rpc('get_washinglist', { user_id_input: '' })
    if (error)
      console.log({ error })
    else
      console.log({ data })
  }

  useEffect(() => {
    // TODO: Trigger this function when a new item is added
    getMatchingItems()
  }, [])

  if (!profile)
    return null

  return (
    <div>
      <WashingTable washinglist={washinglist} getWashinglist={getWashinglist} />
      <Flex justify="center" align="center" mt={10}>
        <AddWashingItem getWashinglist={getWashinglist}/>
      </Flex>
    </div>
  )
}
