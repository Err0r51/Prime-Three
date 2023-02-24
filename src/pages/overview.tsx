import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabase'
import type { washinglist } from '../types/supabase'
import WashingTable from '@/components/washingtable'

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

  const getWashinglist = async () => {
    const { data, error } = await supabase.from('washinglist').select()
    if (!error && data)
      setWashinglist(data)
    else
      setWashinglist([])
  }

  useEffect(() => {
    getWashinglist()
  }, [])

  if (!profile)
    return null

  return (
    <div>
      <WashingTable washinglist={washinglist} />
    </div>
  )
}
